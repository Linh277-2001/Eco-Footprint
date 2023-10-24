import { useState } from "react";
import { useEffect } from "react";
import { Col, InputNumber, Row, Slider } from "antd";
import "./App.css";
import { Link } from "react-router-dom";
import Cloud1 from "./assets/cloud1.png";
import Cloud2 from "./assets/cloud2.png";
import FoodImg from "./assets/FoodCategoryDesktop.png";
import Heading from "../Heading/Heading";
import { RightCircleOutlined } from "@ant-design/icons";
import axios from "axios";

function App() {
  const [activity, setActivity] = useState([]);
  const footprintId = localStorage.getItem("footprintId");
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/activity/category/1"
        );
        setActivity(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // State variables for slider values
  const [sliderValues, setSliderValues] = useState({});

  // Handler for slider changes
  const handleSliderChange = async (product, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [product]: value,
    }));
    console.log(product)
    try {
      const findByActivityAndFootprint = await axios({
        url: `http://localhost:8080/api/af/find/${product}/${footprintId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          id: {
            activityId: product,
            footprintId: footprintId,
          },
          volumn: value,
        },
      });
      const exist=findByActivityAndFootprint.data;
      const count=Object.keys(exist).length;
      console.log(count);
      if(count>0){
        const putAF=await axios({
          url:"http://localhost:8080/api/af",
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          data:{
            id:{
              activityId: product,
              footprintId: footprintId
            },
            volumn: value
          }
        })  
      }
      else{
        const postaf=await axios({
          url:"http://localhost:8080/api/af",
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          data:{
            id:{
              activityId: product,
              footprintId: footprintId,
            },
            volumn: value
            }
          })
      }
    } catch (error) {
      
    }
    
    console.log(value);
  };

  // Initialize default slider values to 0 when the component mounts
  useEffect(() => {
    const initialSliderValues = {};
    activity.forEach((e) => {
      initialSliderValues[e.id] = 0;
    });
    setSliderValues(initialSliderValues);
  }, [activity]);
  return (
    <>
      <div className="container5">
        <div>
          <Heading />
        </div>
        <div>
          <img className="cloud1" src={Cloud1} />
          <img className="cloud2" src={Cloud2} />
        </div>
        <div className="content">
          <Link to="/travelled">
            <RightCircleOutlined className="rightIcon" />
          </Link>
          <p className="caption">FOOT</p>
          <h1 className="title">How often do you eat animal-based products?</h1>
          <h2 className="sub_title">{activity.map((a) => a.name + " ")}</h2>
          {activity.map((e) => (
            <Row>
              <Col span={4}>
                <h2>{e.name.toUpperCase()}</h2>
              </Col>

              <Col span={15}>
                <Slider
                  min={0}
                  max={e.maxvolumn}
                  step={0.1}
                  value={sliderValues[e.id] || 0}
                  onChange={(value) => handleSliderChange(e.id, value)}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={20}
                  step={0.1}
                  style={{
                    margin: "0 16px",
                  }}
                  value={sliderValues[e.id] + " " + e.unit || 0}
                  onChange={(value) => handleSliderChange(e.id, value)}
                />
              </Col>
            </Row>
          ))}
        </div>
        <div
          className="houseImg"
          style={{
            backgroundImage: `url(${FoodImg})`,
            backgroundSize: "cover", // Để hình ảnh nền hiển thị đầy đủ trong phần tử
            backgroundPosition: "center", // Căn giữa hình ảnh nền
            width: "100%", // Đảm bảo phần tử chiếm hết chiều rộng
            height: "100%", // Đặt chiều cao của phần tử
            display: "flex", // Sử dụng flexbox
            flexDirection: "column", // Xếp hình ảnh và nội dung ở dưới theo cột
            alignItems: "center", // Căn giữa theo chiều ngang
            justifyContent: "flex-end", // Đặt nội dung ở dưới
          }}
        ></div>
      </div>
    </>
  );
}

export default App;
