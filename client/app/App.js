import React from 'react'
import Article from './article.js'
import Subscriptions from './subscriptions'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      subscriptions: [],
      articles: [],
      next: [],
      homeNext: ''
    }
    this.fetchFrontPage = this.fetchFrontPage.bind(this)
    this.handleSubscribe = this.handleSubscribe.bind(this)
    this.handleUnsubscribe = this.handleUnsubscribe.bind(this)
    this.fetchSubscriptions = this.fetchSubscriptions.bind(this)
    this.setLocalStorage = this.setLocalStorage.bind(this)
    this.infiniteScroll = this.infiniteScroll.bind(this)
    this.fetchNext = this.fetchNext.bind(this)
    this.fetchFrontPageNext = this.fetchFrontPageNext.bind(this)
  }

  fetchFrontPage () {
    let that = this
    $.ajax('https://www.reddit.com/hot.json', {
      success: function (responseData) {
        if (responseData.data.after) {
          that.setState({
            homeNext: responseData.data.after
          })
        }
        if (responseData.data.children.length > 0) {
          that.setState({ articles: responseData.data.children })
        } else {
          console.log('No reddit articles available')
        }
      }, 
      error: function () {
        console.error('Something didn\'t work!')
      }
    })
  }

  fetchFrontPageNext () {
    let that = this
    $.ajax('https://www.reddit.com/hot.json', {
      data: {after: that.state.homeNext},
      success: function (responseData) {
        if (responseData.data.after) {
          that.setState({
            homeNext: responseData.data.after
          })
        }
        if (responseData.data.children.length > 0) {
          that.setState({ 
            articles: [...that.state.articles, ...responseData.data.children]
          })
        } else {
          console.log('No reddit articles available')
        }
      }, 
      error: function () {
        console.error('Something didn\'t work!')
      }
    })
  }

  fetchSubscriptions () {
    let that = this
    if (this.state.subscriptions.length === 0) {
      this.fetchFrontPage()
    }
    this.state.subscriptions.forEach(subscription => {
      $.ajax(`https://www.reddit.com/r/${subscription}.json`, {
        success: function (responseData) {
          if (responseData.data.after) {
            that.setState({
              next: [...that.state.next, 
                      { subreddit: subscription,
                        after: responseData.data.after
                      }
                    ]
            })
          }
          if (responseData.data.children.length > 0) {
            that.setState({ articles: 
              [...that.state.articles, ...responseData.data.children] 
            })
          } else {
            console.log('No reddit articles available')
          }
        }, 
        error: function () {
          console.error('Something didn\'t work!')
        }
      })
    })
  }

  fetchNext () {
    let that = this
    if (that.state.next.length === 0) {
      this.fetchFrontPageNext()
    }
    this.state.next.forEach((next, i) => {
      $.ajax(`https://www.reddit.com/r/${next.subreddit}.json`, {
        data: { after: next.after },
        success: function (responseData) {
          if (responseData.data.after) {
            that.state.next[i].after = responseData.data.after
          }
          if (responseData.data.children.length > 0) {
            that.setState({ 
              articles: [...that.state.articles, ...responseData.data.children] 
            })
          } else {
            console.log('No reddit articles available')
          }
        }, error: function () {
          console.error('Something didn\'t work!')
        }
      })
    })
  }

  infiniteScroll () {
    let body = document.body
    let html = document.documentElement
    let height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
    if (window.scrollY + document.documentElement.clientHeight === height) {
      this.fetchNext()
    }
  }

  handleSubscribe (subreddit) {
    if (this.state.subscriptions.includes(subreddit)) return 
    this.setState({
      subscriptions: [...this.state.subscriptions, subreddit]
    }, () => {
      this.setLocalStorage()
      this.fetchSubscriptions()
    })
  }

  handleUnsubscribe (unsubscribe) {
    this.setState({
      subscriptions: this.state.subscriptions.filter(subreddit => subreddit !== unsubscribe),
      next: this.state.next.filter(next => next.subreddit !== unsubscribe),
      articles: this.state.articles.filter(article => article.data.subreddit !== unsubscribe)
    }, () => {
      this.setLocalStorage()
    })
  }

  setLocalStorage () {
    window.localStorage.setItem('reddit', JSON.stringify(this.state.subscriptions))
  }

  componentWillMount () {
    this.setState({
      subscriptions: JSON.parse(window.localStorage.getItem('reddit')) || []
    })
  }
  componentDidMount () {
    this.fetchSubscriptions()
    window.addEventListener('scroll', this.infiniteScroll)
  }
  render () {
    return (
      <div className='container'>
        <div className='articles'>
          {this.state.articles.map((article,  i) => 
            <Article article={article} key={i} handleSubscribe={this.handleSubscribe} />
          )}
        </div>
        <Subscriptions subscriptions={this.state.subscriptions} handleUnsubscribe={this.handleUnsubscribe} />
      </div>
    )
  }
}

export default App
