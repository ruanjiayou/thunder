import configModel from './models/config';
import tasksModel from './models/task';
import event from './utils/event';

// 全局状态.
const config = configModel.create({});

const task = tasksModel.create({ tasks: [] })
event.on('start', data => {
  const item = task.tasks.find(t => t.no === data.no);
  if (!item) {
    task.add(data);
    task.sort();
  }
});
event.on('end', data => {
  const item = task.tasks.find(t => t.no === data.no);
  if (item) {
    task.remove(item.no)
  }
})
event.on('progress', data => {
  const item = task.tasks.find(t => t.no === data.no);
  if (item) {
    item.setData(data);
  }
})

export default {
  config,
  task,
};