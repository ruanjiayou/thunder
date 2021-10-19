import event from './event'

let ws = new WebSocket('ws://localhost:3000/thunder?token=123');
window.ws = ws;
// 开启后的动作，指定在连接后执行的事件
ws.onopen = () => {
  console.log('open connection');
};
// 接收服务端发送的消息
ws.onmessage = (str) => {
  const params = JSON.parse(str.data)
  event.emit(params.type, params.data)
};
// 指定在关闭后执行的事件
ws.onclose = () => {
  console.log('close connection');
};

export default ws;