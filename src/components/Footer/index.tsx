import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      copyright="Novel Admin by NZ"
      style={{
        background: 'none',
      }}
    />
  );
};

export default Footer;
