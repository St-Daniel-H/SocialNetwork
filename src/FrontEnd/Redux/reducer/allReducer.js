import user_reducer from './userLog'
import { combineReducers } from 'redux'

const allReducer = combineReducers(
    {
        user: user_reducer
    }
)

export default allReducer;