import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Nav, NavItem } from "react-bootstrap";
import { Context1 } from "./../App";
import { changeCart, addCount } from "../store";

const Detail = (props) => {
  // useEffect(() => {
  //   let a = setTimeout(() => {
  //     setAlert(false);
  //     return () => {
  //       clearTimeout(a);
  //     };
  //   }, 2000);
  // }, []);
  let dispatch = useDispatch();
  let [alert, setAlert] = useState(true);
  let [tab, setTab] = useState(0);
  let [fade, setFade] = useState("");
  let { id } = useParams();
  const state = useSelector((state) => state);
  const data = props.shoes.find((a) => {
    return a.id == id;
  });
  console.log(data);
  useEffect(() => {
    setFade("end");
    return () => {
      setFade("");
    };
  }, []);
  return (
    <div className={`start ${fade}`}>
      <div className="container">
        {/* {alert ? (
        <div className="alert alert-warning">
          2초이내 구매시 할인
        </div>
      ) : null} */}
        <div className="row">
          <div className="col-md-6">
            <img
              src={`https://codingapple1.github.io/shop/shoes${
                data.id + 1
              }.jpg`}
              width="100%"
              alt="img"
            />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{data.name}</h4>
            <p>{data.content}</p>
            <p>{data.price}원</p>
            <button
              className="btn btn-danger"
              onClick={() => {
                const filter = state.cart.filter(a => a.id === data.id);
                filter.length > 0 ? dispatch(addCount(filter[0].id)) : dispatch(changeCart(data))
              }}
            >
              주문하기
            </button>
          </div>
        </div>
        <Nav variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link
              eventKey="link0"
              onClick={() => {
                setTab(0);
              }}
            >
              버튼1
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link1"
              onClick={() => {
                setTab(1);
              }}
            >
              버튼2
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link2"
              onClick={() => {
                setTab(2);
              }}
            >
              버튼3
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab tab={tab} shoes={props.shoes} />
      </div>
    </div>
  );
};
function Tab(props) {
  let [fade, setFade] = useState("");
  let { save, shoes } = useContext(Context1);
  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      clearTimeout(a);
      setFade("");
    };
  }, [props.tab]);
  return (
    <div className={`start ${fade}`}>
      {
        [
          <div>
            {props.shoes[0].name}
            {save}
          </div>,
          <div>내용2</div>,
          <div>내용3</div>,
        ][props.tab]
      }
    </div>
  );
}
export default Detail;
