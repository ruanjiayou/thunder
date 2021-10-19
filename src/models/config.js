import { types } from 'mobx-state-tree';

const Model = types.model({
  retries: types.optional(types.number, 3),
  concurrent: types.optional(types.number, 6),
  finished: types.optional(types.number, 0),
  failed: types.optional(types.number, 0),
}).actions(self => {
  return {
    setRetries(n) {
      self.retries = n;
    },
    setConcurrent(n) {
      self.concurrent = n;
    },
    setFinished(n) {
      self.finished = n;
    },
    setFailed(n) {
      self.failed = n;
    }
  }
});

export default Model;