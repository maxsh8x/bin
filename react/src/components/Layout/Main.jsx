import React from 'react';
import LeftTable from '../LeftTable/Main';
import RightTable from '../RightTable/Main';
import Container from './style';

const Layout = () => (
  <Container>
    <LeftTable />
    <RightTable />
  </Container>
);

export default Layout;
