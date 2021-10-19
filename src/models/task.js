import { types } from 'mobx-state-tree';
import timeFormat from '../utils/timeFormat';

const task = types.model('task', {
  no: types.string,
  chunk: types.number,
  speed: types.number,
  size: types.number,
  status: types.enumeration('status', ['init', 'loading', 'finished']),
  url: types.string,
  path: types.string,
  createdAt: types.number,
}).views(self => ({
  get percent() {
    if (self.size === 0) {
      return 0;
    }
    if (self.chunk > self.size) {
      return 100;
    }
    return (100 * self.chunk / self.size).toFixed(2);
  },
  get spent() {
    return timeFormat(Date.now() - self.createdAt)
  }
})).actions(self => ({
  setData(data) {
    self.speed = data.speed || 0;
    self.chunk = data.chunk;
    self.size = data.size;
  }
}));
const Model = types.model({
  tasks: types.array(task),
}).actions(self => {
  return {
    add(data) {
      self.tasks.push(data);
    },
    remove(no) {
      const index = self.tasks.findIndex(item => item.no === no);
      if (index !== -1) {
        self.tasks.splice(index, 1)
      }
    },
    sort() {
      self.tasks.sort((a, b) => {
        return parseInt(a.no) - parseInt(b.no);
      })
    }
  }
});

export default Model;