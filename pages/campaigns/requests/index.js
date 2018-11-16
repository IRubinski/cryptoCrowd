import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address: address };
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
