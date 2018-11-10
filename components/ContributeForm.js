import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";

class ContributeForm extends Component {
  render() {
    return (
      <Form>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input label="ether" labelPosition="right" />
          <Button primary>Contribute!</Button>
        </Form.Field>
      </Form>
    );
  }
}

export default ContributeForm;
