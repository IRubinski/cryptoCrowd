pragma solidity ^'0.4.17';

contract CampaignFactory {
    address[] public depoloyedCampaigns;
    
    function createCampaign(uint minimun) public {
        
        address newCampaign = new Campaign(minimun,msg.sender);
        depoloyedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return depoloyedCampaigns;
    }
}

contract Campaign {
    
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals; //adress voted for spesific request 
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approveCount;
    
    
    function Campaign(uint userMinContribution,address creator) public {
        manager = creator;
        minimumContribution = userMinContribution;
       
    }
    
    function contribute() payable public {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approveCount ++;
    }
    
    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount ++;
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(!request.complete);
        require(request.approvalCount > (approveCount / 2));
        
        request.recipient.transfer(request.value);
        request.complete = true;
        
        
    }

    function getSummary() public view returns(
        uint,uint,uint,uint,address
    ) {
        return (
            minimumContribution,
           this.balance,
            requests.length,
            approveCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}
