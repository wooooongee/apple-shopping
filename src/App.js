import "./App.css";
import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import { createContext, useEffect, useState } from "react";
import { data } from "./data.js";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Detail from "./routes/Detail.js";
import axios from "axios";
import Cart from "./routes/Cart";

export let Context1 = createContext();

let count = 0;
function App() {
  useEffect(() => {
    !localStorage.getItem('watched') &&
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  let obj = { name: "kim" };
  localStorage.setItem("data", JSON.stringify(obj));
  let pull = JSON.parse(localStorage.getItem("data"));
  let [shoes, setShoes] = useState(data);
  let [btn, setBtn] = useState(true);
  let [save, setSave] = useState([10, 11, 12]);
  let navigate = useNavigate();
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Jaewoong</Navbar.Brand>
          <Nav className="me-auto">
            <Link className="link" to="/">
              홈
            </Link>
            <button
              className="link"
              onClick={() => {
                navigate("/detail/0");
              }}
            >
              상세페이지
            </button>
            <button
              className="link"
              onClick={() => {
                navigate("/about");
              }}
            >
              정보
            </button>
            <Link to="/cart">장바구니</Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <Row>
                {shoes.map((a, i) => {
                  return <Card shoes={a} key={i} id={i} navigate={navigate} />;
                })}
              </Row>
              <button
                className="btn btn-danger"
                style={{ display: btn === true ? "block" : "none" }}
                onClick={() => {
                  count++;
                  if (count === 1) {
                    axios
                      .get("https://codingapple1.github.io/shop/data2.json")
                      .then((result) => {
                        let copy = [...shoes, ...result.data];
                        setShoes(copy);
                      })
                      .catch(() => {
                        console.log("fail");
                      });
                  } else if (count === 2) {
                    fetch("https://codingapple1.github.io/shop/data3.json")
                      .then((result) => result.json())
                      .then((result) => {
                        console.log(result);
                        let copy = [...shoes, ...result];
                        setShoes(copy);
                        setBtn(false);
                      })
                      .catch(() => {
                        console.log("fail");
                      });
                  }
                }}
              >
                더보기
              </button>
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <Context1.Provider value={{ save, shoes }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          }
        />
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="*" element={<div>없는페이지</div>} />
      </Routes>
    </div>
  );
}

function Card(props) {
  return (
    <Col xs={6} md={4}>
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.id + 1) + ".jpg"
        }
        alt=""
        width="80%"
        onClick={() => {
          props.navigate(`/detail/${props.id}`);
        }}
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
    </Col>
  );
}

// const About = ()=>{
//   return(
//     <div>
//       <h4>회사정보</h4>
//       <Outlet/>
//     </div>
//   )
// }

// const Event = ()=>{
//   return(
//     <div>
//       <h4>오늘의 이벤트</h4>
//       <Outlet></Outlet>
//     </div>
//   )
// }

export default App;
