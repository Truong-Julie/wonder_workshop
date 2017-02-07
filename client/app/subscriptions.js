import React from 'react'
import SubscriptionEntry from './subscriptionEntry'

const Subscriptions = (props) => {
  return (
    <div className='subscriptions'>
      My Subscriptions
      {props.subscriptions.map((subscription, i) => {
        return (
          <SubscriptionEntry 
            handleUnsubscribe={props.handleUnsubscribe}
            title={subscription} 
            key={i} />
        )
      })}
    </div>
  )
}

export default Subscriptions
