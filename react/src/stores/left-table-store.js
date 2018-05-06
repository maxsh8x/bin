import { toJS } from 'mobx';
import { types, getParent } from 'mobx-state-tree';

const Cell = types
  .model('Cell', {
    id: types.string,
    x: types.number,
    y: types.number,
    value: types.maybe(types.number),
    timerId: types.maybe(types.number),
  })
  .views(self => ({
    get store() {
      return getParent(self, 2);
    },
  }))
  .actions(self => ({
    afterCreate() {
      self.timerId = setTimeout(() => {
        self.store.removeCell(self.id);
      }, 5000);
    },
    setValue(value) {
      self.value = value;
      if (self.timerId !== null) {
        clearTimeout(self.timerId);
      }
      self.timerId = setTimeout(() => {
        self.store.removeCell(self.id);
      }, 5000);
    },
  }));

const LeftTableStore = types
  .model('LeftTableStore', {
    cells: types.optional(types.array(Cell), []),
  })
  .views(self => ({
    get cellItems() {
      return toJS(self.cells);
    },
  }))
  .actions(self => ({
    removeCell(cellId) {
      const cell = self.cells.find(cell => cell.id === cellId);
      self.cells.remove(cell);
    },
    upsertCell(x, y, value) {
      const targetCell = self.cells.find(cell => cell.x === x && cell.y === y);
      if (targetCell) {
        targetCell.setValue(value);
      } else {
        const NewCell = Cell.create({
          id: `${x}_${y}`,
          value,
          x,
          y,
        });
        self.cells.push(NewCell);
      }
    },
  }));

const leftTableStore = LeftTableStore.create({});

export default leftTableStore;
