import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    // return the length of the requests
    const requestCount = await campaign.methods.getRequestsCount().call();
    //Solidity cant yet return array of struct
    const requests = await Promise.all(
      Array(requestCount)
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    return { address, requests, requestCount };
  }
  render() {
    return (
      <Layout>
        <h3>Index of Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>New Request</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}
// A list of requests

export default RequestIndex;
