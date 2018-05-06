import React from 'react';
import { inject, observer } from 'mobx-react';
import { Container, StyledList } from './style';

function Cells({ cellItems }) {
  return cellItems.map(({ value }) => <li>{value}</li>);
}

@inject('leftTableStore') @observer
class LeftTable extends React.Component {
  render() {
    const { cellItems } = this.props.leftTableStore;
    return (
      <Container>
        <StyledList>
          <Cells cellItems={cellItems} />
        </StyledList>
      </Container>
    );
  }
}

export default LeftTable;
