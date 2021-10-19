import React, { useCallback, useState, Fragment } from 'react';
import { AlignCenterXY, AlignSideV, FullHeightAuto, FullWidth, FullWidthAuto, FullWidthFix } from '../../styles/common'
import sizeFormat from '../../utils/sizeFormat';

function Task({ task, percent, spent }) {
  return <Fragment>
    <FullWidth style={{ padding: '0 10% 0 10%', marginTop: 10 }}>
      <FullWidthAuto style={{ backgroundColor: 'grey', marginRight: 15 }}>
        <div style={{ width: percent + '%', height: 20, backgroundColor: '#5897e5' }}></div>
      </FullWidthAuto>
      <span style={{ width: 80 }}>{percent}%</span>
      <span style={{ width: 160 }}>{sizeFormat(task.chunk)}/{sizeFormat(task.size)}</span>
      <span style={{ width: 80 }}>{sizeFormat(task.speed)}</span>
      <span style={{ width: 80 }}>{spent}</span>
    </FullWidth>
  </Fragment>
}

export default Task;