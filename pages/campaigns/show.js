import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    // this is props from server
    const campaign = await Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  renderCard() {
    const {
      manager,
      minimumContribution,
      requestCount,
      approversCount,
      balance
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of manager",
        description: "The manager created this campaign",
        style: { overflowWrap: "break-word" }
      },
      {
        header: minimumContribution,
        meta: "Minimum contribution(Wei)",
        description: "You most contribte at least much "
      },
      {
        header: requestCount,
        meta: "number of request",
        description: "a request tries to widthdraw money "
      },
      {
        header: approversCount,
        meta: "Number of approvers",
        description: "Number of pepole who already donated"
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign balacne(ether)",
        description: "Balance is how  much money this campaing has left"
      }
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Details </h3>
        {this.renderCard()}
        <ContributeForm />
      </Layout>
    );
  }
}

export default CampaignShow;
