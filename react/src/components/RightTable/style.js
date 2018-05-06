import styled, { css } from 'styled-components';

const Container = styled.div`
  margin-left: 120px;
  width: 3000px;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  table-layout: fixed;

  & td {
    border: 1px solid black;
    padding: 5px;
    width: 60px;
    height: 18px;    
  }
`;

const fadeOut = css`
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 2s, opacity 2s linear;
`;

const StyledCell = styled.td`
`;

const CellValue = styled.span`
  color: ${props => (props.isNegative ? 'red' : 'blue')};
  ${props => (props.isFade && fadeOut)}
`;

export { Container, StyledTable, StyledCell, CellValue };
