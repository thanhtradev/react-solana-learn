import { Collapse } from 'antd'
import CreateMintAccount from './createMintAccount'
import React from 'react'

const { Panel } = Collapse
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

function Splt() {
  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel header="Create mint account" key="1">
        <CreateMintAccount />
      </Panel>
      <Panel header="This is panel header 2" key="2">
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 3" key="3">
        <p>{text}</p>
      </Panel>
    </Collapse>
  )
}

export default Splt
