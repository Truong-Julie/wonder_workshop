import React from 'react'

const SubscriptionEntry = (props) => {
  let handleUnsubscribe = (e) => {
    props.handleUnsubscribe(props.title)
  }
  return (
    <div className='subscription'>
      <h3>{props.title}</h3>
      <img onClick={handleUnsubscribe} src='./assets/cancel.png' />
    </div>
  )
}

export default SubscriptionEntry
