// eslint-disable-next-line
import React, { useCallback, useState, Fragment } from 'react';
import { Observer } from 'mobx-react-lite';
import { toJS } from 'mobx'
import store from './store'
import config from './config'
import { AlignAround, FullHeight, FullHeightAuto, FullHeightFix, FullWidth, FullWidthAuto, FullWidthFix } from './styles/common'
import Card from './components/Card'
import Task from './components/Task'

function App() {
  return <Fragment>
    <Observer>
      {() => <Fragment>
        <FullHeight style={{ backgroundColor: config.mainBG, color: config.mainColor }}>
          <FullHeightFix>
            <AlignAround style={{ height: 120 }}>
              Thunder实时信息
            </AlignAround>
          </FullHeightFix>
          <FullHeightFix>
            <FullWidth>
              <FullWidthAuto>
                <AlignAround style={{ height: 120 }}>
                  <Card>
                    <div>并发数量</div>
                    <div>{store.config.concurrent}</div>
                  </Card>
                  <Card>
                    <div>重试次数</div>
                    <div>{store.config.retries}</div>
                  </Card>
                </AlignAround>
              </FullWidthAuto>
              <FullWidthAuto>
                <AlignAround style={{ height: 120 }}>
                  <Card>
                    <div>已完成数量</div>
                    <div>{store.config.finished}</div>
                  </Card>
                  <Card>
                    <div>失败数量</div>
                    <div>{store.config.failed}</div>
                  </Card>
                </AlignAround>
              </FullWidthAuto>
            </FullWidth>
          </FullHeightFix>
          <FullHeightAuto>
            <FullWidth style={{ padding: '0 10% 0 10%' }}>
              <FullWidthAuto></FullWidthAuto>
              <FullWidthFix style={{ width: 80 }}>进度</FullWidthFix>
              <FullWidthFix style={{ width: 160 }}>已下载/总大小</FullWidthFix>
              <FullWidthFix style={{ width: 80 }}>下载速度</FullWidthFix>
              <FullWidthFix style={{ width: 80 }}>下载时间</FullWidthFix>
            </FullWidth>
            {store.task.tasks.map(task => (<Task key={task.no} percent={task.percent} spent={task.spent} task={toJS(task)} />))}
          </FullHeightAuto>
        </FullHeight>
      </Fragment>}
    </Observer>
  </Fragment>
}

export default App;