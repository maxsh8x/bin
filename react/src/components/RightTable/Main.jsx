import React from 'react';
import { inject, observer } from 'mobx-react';
import { Container, StyledTable, StyledCell, CellValue } from './style';

function Cell({ value, timedOut }) {
  return (
    <StyledCell>
      <CellValue isNegative={value < 0} isFade={timedOut}>{value}</CellValue>
    </StyledCell>
  );
}

function Row({ colls }) {
  return <tr>{colls.map(({ id, ...props }) => <Cell key={id} {...props} />)}</tr>;
}

function Rows({ rowItems }) {
  return rowItems.map(row => <Row key={row.id} colls={row.cells} />);
}

@inject('rightTableStore') @observer
class RightTable extends React.Component {
  render() {
    const { rowItems } = this.props.rightTableStore;
    return (
      <Container>
        <StyledTable>
          <tbody>
            <Rows rowItems={rowItems} />
          </tbody>
        </StyledTable>
      </Container>
    );
  }
}

export default RightTable;
