import App from './app';
import React from 'react';
import ReactDOM from 'react-dom';
import ws from './utils/ws'

// 总入口: 将组件挂载到dom上
ReactDOM.render(<App />, document.getElementById('root'));
