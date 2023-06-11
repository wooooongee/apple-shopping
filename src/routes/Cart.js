import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {changeName , increase } from "./../store/userSlice"
import { changeNum , addCount ,popCart} from "../store";


const Cart = () => {

    const state = useSelector(state => state)
    console.log(state.cart)
    const dispatch = useDispatch();
  return (
    <div>
      {state.user.name} {state.user.age}의 장바구니
      <button className="btn" onClick={()=>{
        dispatch(increase(10))
      }}>버튼</button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
        {state.cart.map((a, i) => 
              <tr key={i}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.count}</td>
                <td><button className="btn" onClick={()=>{
                  dispatch(changeName())
                  dispatch(addCount(a.id))
                }}>+</button></td>
                <td><button className="btn btn-danger" onClick={()=>{
                  dispatch(popCart(i))
                }}>삭제</button></td>
              </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Cart;
