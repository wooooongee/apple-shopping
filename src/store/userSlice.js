import {createSlice} from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : {name : 'kim' , age : 20},

    //redux state 변경하는법
    // state 수정해주는 함수 만들고
    // 원할때 그 함수 실행해달라고 store.js에 요청
    reducers:{
      changeName(state){
        state.name = 'park'
      },
      increase(state,action){
        state.age += action.payload
      }
    }
})

export let {changeName,increase} = user.actions

export default user