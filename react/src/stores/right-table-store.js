import { toJS } from 'mobx';
import { types, getParent } from 'mobx-state-tree';
import { tableWidth, tableHeight } from '../constants';
import config from '../utils/config';
import leftTableStore from './left-table-store';


const Cell = types
  .model('Cell', {
    id: types.number,
    value: types.maybe(types.number),
    timerId: types.maybe(types.number),
    timedOut: types.optional(types.boolean, false),
    lastUpdate: types.optional(types.number, Date.now()),
  })
  .views(self => ({
    get row() {
      return getParent(self, 2);
    },
  }))
  .actions(self => ({
    setTimedOut(value) {
      self.timedOut = value;
    },
    setValue(value) {
      self.value = value;
      const now = Date.now();
      if ((now - self.lastUpdate) / 1000 < 5 && self.timerId !== null) {
        leftTableStore.upsertCell(self.row.id, self.id, value);
      }
      self.lastUpdate = now;
      self.setTimedOut(false);
      if (self.timerId !== null) {
        clearTimeout(self.timerId);
      }
      self.timerId = setTimeout(() => {
        self.setTimedOut(true);
      }, 5000);
    },
  }));

const Row = types
  .model('Row', {
    id: types.number,
    cells: types.optional(types.array(Cell), []),
  })
  .views(self => ({
    get collItems() {
      return toJS(self.colls);
    },
  }))
  .actions(self => ({
    findCell(cellNumber) {
      return self.cells[cellNumber];
    },
  }));

const RightTableStore = types
  .model('RightTableStore', {
    rows: types.optional(types.array(Row), []),
  })
  .views(self => ({
    get rowItems() {
      return toJS(self.rows);
    },
  }))
  .actions(self => ({
    afterCreate() {
      const socket = new WebSocket(config.websocketAddr);

      socket.onopen = () => {
        socket.send('START');
      };

      socket.onmessage = (event) => {
        const eventData = JSON.parse(event.data);
        if (tableWidth > eventData.x && tableHeight > eventData.y) {
          self
            .findRow(eventData.y)
            .findCell(eventData.x)
            .setValue(eventData.n);
        }
      };
    },
    findRow(rowNumber) {
      return self.rows[rowNumber];
    },
  }));

function genCells(count) {
  const cells = [];
  for (let id = 0; id < count; id += 1) {
    cells.push(Cell.create({ id }));
  }
  return cells;
}

function genRows(x, y) {
  const rows = [];
  for (let id = 0; id < y; id += 1) {
    const cells = genCells(x);
    rows.push(Row.create({
      id,
      cells,
    }));
  }
  return rows;
}

const rightTableStore = RightTableStore.create({
  rows: genRows(tableWidth, tableHeight),
});

export default rightTableStore;
