import { createStore } from 'redux'
import { connect }from 'react-redux'

const SET_SEARCH_TERM = 'setSearchTerm'
const initialState = {
  searchTerm: ''
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return reduceSearchTerm(state, action)
    default:
      return state
  }
}

const reduceSearchTerm = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {searchTerm: action.values})
  return newState
}

const store = createStore(rootReducer)

const mapStateToProps = (state) => {
  return { searchTerm: state.setSearchTerm }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchTerm (searchTerm) {
      dispatch({ type: SET_SEARCH_TERM, value: searchTerm })
    }
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export {connector, store}
