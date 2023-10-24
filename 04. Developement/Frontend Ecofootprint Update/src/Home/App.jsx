import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Anhchinh from "./assets/HousingRenewableResourcesDesktop.png";
import cloud from "./assets/cloud1.png";
import logo from "./assets/logo.png";
import Admin from "../Admin/App";
import Food from "../Food/App";
function App() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [email, setEmail] = useState("");
  const [loginUser, setLoginUser] = useState("");
  const [loginPsw, setLoginPws] = useState("");
  const [isPopupOpenLogin, setIsPopupOpenLogin] = useState(false);
  const [isPopupOpenRegister, setIsPopupOpenRegister] = useState(false);
  const turnOnRegister = () => {
    setIsPopupOpenLogin(!isPopupOpenLogin);
    setIsPopupOpenRegister(!isPopupOpenRegister);
  };
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (token) {
      if(role=='user') navigate("/food");
      else navigate('/admin')
    }
  }, [token, navigate]);
  const handleClickLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        url: "http://localhost:8080/api/auth/signin",
        headers: { "Content-Type": "application/json" },
        data: {
          username: loginUser,
          password: loginPsw,
        },
        method: "post",
      });
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("avatar", response.data.avatar);
      localStorage.setItem("email", response.data.email);
      const token = response.data.token;
      localStorage.setItem("token", token);
      const role = response.data.roles;
      if (role.includes("ROLE_ADMIN")) {
        localStorage.setItem("role", "admin");
        navigate("/admin");
      } else {
        localStorage.setItem("role","user");
        try{
          const postFootPrint=await axios({
            method: "post",
            url: `http://localhost:8080/api/footprint/createByUser/${response.data.id}`,
            headers:{
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          })
          localStorage.setItem("footprintId", postFootPrint.data.id);
        }
        catch(error){
          console.log(error)
        }
        navigate("/food");
      }
    } catch (error) {
      alert("Tên đăng nhập hoặc mật khẩu không chính xác");
    }
  };

  const togglePopup = () => {
    setIsPopupOpenLogin(!isPopupOpenLogin);
    setIsPopupOpenRegister(false);
  };
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        url: "http://localhost:8080/api/auth/signup",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: {
          name: name,
          username: userName,
          password: passWord,
          email: email,
        },
      });
      console.log("Res", response);
    } catch (e) {
      alert("Register unsucessfully!!!");
      console.error(e);
    }
  };
  return (
    <>
      <Routes>
        <Route element={<Admin />} path="/admin" />
        <Route path="/food" element={<Food />} />
      </Routes>
      <div className="container">
        <div>
          <img className="logo" src={logo} />
          <button className="btnLogin" onClick={togglePopup}>
            Login
          </button>
        </div>
        <img className="cloud1" src={cloud} />
        <img className="cloud2" src={cloud} />
        <div className="content">
          <p className="caption animated-text">What is your</p>
          <h1 className="title animated-text">Ecological Footprint?</h1>
          <h2 className="sub-title animated-text">
            {" "}
            How many planets do we need if everybody lives like you?
          </h2>
        </div>
        {/* Giao diện đăng nhập */}
        {isPopupOpenLogin && (
          <div className="popup">
            <div className="popup-content">
              <CloseCircleOutlined
                onClick={togglePopup}
                style={{ float: "right" }}
              />
              <h2 style={{ textAlign: "center" }}>Login Account</h2>
              <form style={{ paddingRight: "18px" }}>
                <input
                  type="text"
                  value={loginUser}
                  onInput={(e) => setLoginUser(e.target.value)}
                  placeholder="Username"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPsw}
                  onInput={(e) => setLoginPws(e.target.value)}
                />
                <button type="submit" onClick={handleClickLogin}>
                  Login
                </button>
                <button className="register" onClick={turnOnRegister}>
                  Register
                </button>
              </form>
            </div>
          </div>
        )}
        {/* <img className='houseImg' src={Anhchinh} alt="" /> */}
        <div
          className="houseImg"
          style={{
            backgroundImage: `url(${Anhchinh})`,
            backgroundSize: "cover", // Để hình ảnh nền hiển thị đầy đủ trong phần tử
            backgroundPosition: "center", // Căn giữa hình ảnh nền
            width: "100%", // Đảm bảo phần tử chiếm hết chiều rộng
            height: "75%", // Đặt chiều cao của phần tử
            display: "flex", // Sử dụng flexbox
            flexDirection: "column", // Xếp hình ảnh và nội dung ở dưới theo cột
            alignItems: "center", // Căn giữa theo chiều ngang
            justifyContent: "flex-end", // Đặt nội dung ở dưới
          }}
        ></div>
        {isPopupOpenRegister && (
          <div className="popup">
            <div className="popup-content">
              <CloseCircleOutlined
                onClick={togglePopup}
                style={{ float: "right" }}
              />
              <h2 style={{ textAlign: "center" }}>Register Account</h2>
              <form style={{ paddingRight: "18px" }} onSubmit={handleRegister}>
                <input
                  type="text"
                  value={name}
                  onInput={(evt) => setName(evt.target.value)}
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={userName}
                  onInput={(evt) => setUserName(evt.target.value)}
                  placeholder="Username"
                />
                <input
                  type="password"
                  value={passWord}
                  onInput={(evt) => setPassWord(evt.target.value)}
                  placeholder="Password"
                />
                <input type="password" placeholder="Repassword" />
                <input
                  type="email"
                  value={email}
                  onInput={(evt) => setEmail(evt.target.value)}
                  placeholder="Email"
                />
                <button type="submit">Register</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
