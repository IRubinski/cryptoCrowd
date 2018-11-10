import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => (
  <Menu style={{ marginTop: '10px' }}>
    <Link route="/">
      <a className="item">CryptoCrowd</a>
    </Link>
    <Menu.Menu position="right">
      <Link route="/">
        <a className="item">Campaings</a>
      </Link>
      <Link route="/campaigns/new">
        <a className="item">+</a>
      </Link>
    </Menu.Menu>
  </Menu>
);
