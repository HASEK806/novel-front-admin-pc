import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'Novel Admin',
          title: 'Novel Admin',
          href: '',
          blankTarget: false,
        },
        {
          key: 'NZ1',
          title: <GithubOutlined />,
          href: '',
          blankTarget: false,
        },
        {
          key: 'NZ2',
          title: 'NZ',
          href: '',
          blankTarget: false,
        },
      ]}
    />
  );
};

export default Footer;
