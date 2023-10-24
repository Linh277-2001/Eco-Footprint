import "./House.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Slider, InputNumber } from "antd";
import House2 from "./assets/housingMember/HousingMemberAreaHouseLargeDesktop.png";
import Man1 from "./assets/man/Man1.png";
import Man2 from "./assets/man/Man2.png";
import Man3 from "./assets/man/Man3.png";
import Man4 from "./assets/man/Man4.png";
import Man5 from "./assets/man/Man5.png";
import cloud1 from "./assets/cloud/cloud1.png";
import cloud2 from "./assets/cloud/cloud2.png";
import cloud3 from "./assets/cloud/cloud3.png";
import Heading from "../Heading/Heading";
import axios from "axios";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
function House() {
  const footprintId = localStorage.getItem("footprintId");
  const token = localStorage.getItem("token");   
  const [house, setHouse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/activity/category/2"
        );
        setHouse(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  // State variables for slider values
  const [sliderValues, setSliderValues] = useState({});

  // Handler for slider changes
  const handleSliderChange =async (product, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [product]: value,
    }));
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
            footprintId: footprintId
          },
          volumn: value,
        },
      });
      const exist=findByActivityAndFootprint.data;
      const count=Object.keys(exist).length;
      console.log(count)
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
  };
  useEffect(() => {
    const initialSliderValues = {};
    house.forEach((e) => {
      initialSliderValues[e.id] = 0;
    });
    setSliderValues(initialSliderValues);
  }, [house]);

  const manImages = [Man1, Man2, Man3, Man4, Man5];
  const backgroundImage = `url(${House2})`;
  return (
    <>
      <div className="container2">
        <div>
          <Heading />
        </div>
        <div>
          <img className="cld1" src={cloud1} />
          <img className="cld2" src={cloud3} />
          <img className="cld3" src={cloud2} />
        </div>
        <div className="content2">
          <Link to="/travelled">
            <LeftCircleOutlined className="leftIcon" />
          </Link>
          <Link to="/trash">
            <RightCircleOutlined className="rightIcon" />
          </Link>
          <p className="caption2">HOUSING</p>
          <h1 className="title2">How many people live in your household?</h1>
          {house.map((e) => (
            <Row style={{ marginTop: "10px" }}>
              <Col span={8}>
                <h2>{e.name.toUpperCase()}</h2>
              </Col>
              <Col span={10}>
                <Slider
                  min={0}
                  max={e.maxvolumn}
                  step={1}
                  value={sliderValues[e.id] || 0}
                  onChange={(value) => handleSliderChange(e.id, value)}
                />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={0}
                  max={20}
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
          className="houseMenberImg"
          style={{
            backgroundImage: backgroundImage,
            backgroundSize: "cover", // Để hình ảnh nền hiển thị đầy đủ trong phần tử
            backgroundPosition: "center", // Căn giữa hình ảnh nền
            width: "100%", // Đảm bảo phần tử chiếm hết chiều rộng
            height: "60%", // Đặt chiều cao của phần tử
            display: "flex", // Sử dụng flexbox
            flexDirection: "column", // Xếp hình ảnh và nội dung ở dưới theo cột
            alignItems: "center", // Căn giữa theo chiều ngang
            justifyContent: "flex-end", // Đặt nội dung ở dưới
          }}
        >
          <img className="Man" src={manImages[4]} alt="" />
        </div>
      </div>
    </>
  );
}
export default House;
