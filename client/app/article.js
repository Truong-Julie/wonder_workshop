import React from 'react'

const Article = (props) => {
  let {thumbnail, url, title, subreddit} = props.article.data
  let handleSubscribe = () => {
    props.handleSubscribe(subreddit)
  }
  if (thumbnail === 'self' || thumbnail === 'default' || thumbnail === 'spoiler') {
    thumbnail = './assets/no_image.png' 
  }
  return (
    <div className='article'>
      <div className='article-image'> 
        <img src={thumbnail} />
      </div>
      <div className='article-content'>
        <a href={url}>
          <h4>{title}</h4>
        </a>
        <p className='article-subreddit' onClick={handleSubscribe}>Subscribe to: 
          <span className='subreddit-link'>{subreddit}</span>
        </p>
      </div>
    </div>
  )
}

export default Article
