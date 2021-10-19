const express = require('express');
const router = express.Router();
const progress = require('progress')

let tasks = {}, timer = null;

function restart(wss) {
  for (let i = 0; i < 6; i++) {
    if (tasks[i]) continue;
    progress.print(`start: ${i}`)
    tasks[i] = {
      size: ((80 + Math.random() * 10).toFixed(0)) * 1024 * 1024,
      no: (i + 1).toString(),
      url: '',
      path: '',
      chunk: 0,
      createdAt: Date.now(),
      speed: 0,
      status: 'init'
    }
  }
  wss.clients.forEach(client => {
    const keys = Object.keys(tasks);
    keys.forEach(key => {
      client.send(JSON.stringify({ type: 'start', data: tasks[key] }))
    })
  })
}

function deal(wss) {
  if (!timer) {
    timer = setInterval(() => {
      wss.clients.forEach(client => {
        const keys = Object.keys(tasks);
        let arr = []
        if (keys.length === 0) {
          progress.clear()
        }
        keys.forEach(key => {
          const speed = (Math.random() * 10).toFixed(2) * 1024 * 1024
          tasks[key].chunk += speed;
          tasks[key].speed = speed;
          if (tasks[key].chunk > tasks[key].size) {
            logger.print(`competle: ${key}`)
            client.send(JSON.stringify({ type: 'end', data: tasks[key] }));
            return delete tasks[key]
          }
          arr.push(`${key}: ${tasks[key].chunk}/${tasks[key].size}`);
          progress.update(arr.join('================================================================================================================\n'));
          client.send(JSON.stringify({ type: 'progress', data: tasks[key] }))
        })
      })
    }, 1000)
  }
}

function pause() {
  if (timer) {
    clearInterval(timer);
  }
}


module.exports = function (app, wss) {
  router.post('/cmd/:type', async (req, res, next) => {
    if (req.params.type === 'restart') {
      restart(wss);
      deal(wss);
    }
    if (req.params.type === 'pause') {
      pause(wss);
    }
    res.json({ code: 0 })
  });
  return router;
};