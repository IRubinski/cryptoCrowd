import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';
class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: ''
  };
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async e => {
    console.log('Submited');
    e.preventDefault();
    const campaign = await Campaign(this.props.address);
    const { description, value, recipient } = this.state;
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({
          from: accounts[0]
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { value, description, recipient } = this.state;
    return (
      <Layout>
        <h3>Create a request</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={description}
              onChange={e => this.setState({ description: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in ether</label>
            <Input
              value={value}
              onChange={e => this.setState({ value: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient address</label>
            <Input
              value={recipient}
              onChange={e => this.setState({ recipient: e.target.value })}
            />
          </Form.Field>
          <Button type="submit" primary>
            Create Request
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
