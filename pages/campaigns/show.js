import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    // this is props from server
    const campaign = await Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    return {
      address: props.query.address,
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
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCard()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
