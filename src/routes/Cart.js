import { memo, useState , useMemo } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "./../store/userSlice";
import { changeNum, addCount, popCart } from "../store";

//memo
const Child = memo(function () {
  return <div>자식</div>;
});

const Cart = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  function logic(){
    //반복문 10억번 돌린결과
    return 
  }
  
  //useMemo
  //useEffect랑 거의 똑같은데 실행 시점이 살짝 다를뿐
  // const result = useMemo(()=>{return logic()},[state])

  return (
    <div>
      <Child count={count}></Child>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      {state.user.name} {state.user.age}의 장바구니
      <button
        className="btn"
        onClick={() => {
          dispatch(increase(10));
        }}
      >
        버튼
      </button>
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
          {state.cart.map((a, i) => (
            <tr key={i}>
              <td>{a.id}</td>
              <td>{a.name}</td>
              <td>{a.count}</td>
              <td>
                <button
                  className="btn"
                  onClick={() => {
                    dispatch(changeName());
                    dispatch(addCount(a.id));
                  }}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    dispatch(popCart(i));
                  }}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Cart;
