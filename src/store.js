import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/userSlice';
import data from './data';





const stock = createSlice({
    name : 'stock',
    initialState : [10,11,12]
})

const cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ],
    reducers:{
      changeCart(state,action){
        state.push(action.payload)
      },
      addCount(state,action){
        let numId = state.findIndex(a => a.id === action.payload)
        state[numId].count++;
      },
      popCart(state,action){
        state.splice(action.payload,1)
      }
    }
})

export const {changeCart , addCount , popCart} = cart.actions

export default configureStore({
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer,
   }
}) 