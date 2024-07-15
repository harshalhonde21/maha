import {configureStore} from '@reduxjs/toolkit'
import useReducer from "./slices/userSlice.js"
import useReducers  from "./slices/chpSlice.js"
import unloading  from "./slices/unloadingEnd.js"
const store = configureStore({
    reducer:{
        user: useReducer,
        chp: useReducers,
        unloadingEnd: unloading
    } 
})

export default store