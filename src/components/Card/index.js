import React, { useCallback, useState, Fragment } from 'react';
import { AlignCenterXY, AlignSideV } from '../../styles/common'

function Card({ children }) {
  return <Fragment>
    <AlignSideV>
      {children}
    </AlignSideV>
  </Fragment>
}

export default Card;