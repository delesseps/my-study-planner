import React from 'react'

let queue: any = []

function sendProfileQueue() {
  if (!queue.length) {
    return Promise.resolve({success: true})
  }
  const queueToSend = [...queue]
  queue = []

  // In the future this data will be sent to a data store
  console.log('Profiler results: ', {body: queueToSend})
}

if (process.env.NODE_ENV === 'development') {
  setInterval(sendProfileQueue, 5000)
}

interface Props {
  metadata?: any
  phases?: any
  id: string
  children: any
}

function Profiler({metadata, phases, id, ...props}: Props) {
  function reportProfile(
    id: string,
    phase: 'mount' | 'update',
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
    interactions: any,
  ) {
    if (!phases || phases.includes(phase)) {
      queue.push({
        metadata,
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
      })
    }
  }
  return <React.Profiler id={id} onRender={reportProfile} {...props} />
}

export default Profiler
