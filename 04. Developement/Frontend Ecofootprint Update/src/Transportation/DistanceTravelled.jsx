import './DistanceTravelled.css';
import { useState,useEffect } from 'react'
import { Col, Row, Slider,InputNumber } from 'antd';
import {Link } from 'react-router-dom';
import cloud1 from './assets/cloud/cloud1.png'
import cloud2 from './assets/cloud/cloud2.png'
import cloud3 from './assets/cloud/cloud3.png'
import travelled from './assets/travelled/TransportationDistanceTravelledTablet.png'
import Heading from '../Heading/Heading';
import { RightCircleOutlined ,  LeftCircleOutlined  } from '@ant-design/icons'
import axios from 'axios';
function DistanceTravelled(){
  const footprintId = localStorage.getItem("footprintId");
  const token = localStorage.getItem("token");    
    const[vehicle, setVehicle]= useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/activity/category/3');
            setVehicle(response.data);
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
    setSliderValues(prevValues => ({
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
    vehicle.forEach(e => {
      initialSliderValues[e.id] = 0;
    });
    setSliderValues(initialSliderValues);
  }, [vehicle]);

    return(<>
        <div className='container3'>
            <div>
                <Heading />
            </div>  
            <div>
                <img className='cld1' src={cloud1} />
                <img className='cld2' src={cloud3} />
                <img className='cld3' src={cloud2} />
            </div>
            <div className='content2'>
                <Link to='/food'><LeftCircleOutlined className='leftIcon'/></Link>
                <Link to='/house'><RightCircleOutlined className='rightIcon'/></Link>
                <p className='caption2'>TRANSPORTATION</p>
                <h1 className='title2'>How far do you travel by car or motorcycle each day?</h1>
                <h2 className='sub_title2'>(as a driver or passenger)</h2>
                {vehicle.map((e)=>
                <Row>
                    <Col span={2}><h2>{e.name.toUpperCase()}</h2></Col>
                    <Col span={3}>
                        <h2 className='value_kms'>ZERO</h2>
                    </Col>
                    <Col span={12}>
                        <Slider
                            min={0}
                            max={e.maxvolumn}
                            step={1}
                            value={sliderValues[e.id] || 0} 
                            onChange={(value) => handleSliderChange(e.id, value)}
                        />
                    </Col>
                    <Col span={3}>
                        <h2 className='value_kms'>VERY FAR</h2>
</Col>
                    <Col span={4}>
                    <InputNumber
                        min={0}
                        max={20}
                        style={{
                            margin: '0 16px',
                        }}
                        value={sliderValues[e.id]+' '+e.unit || 0} 
                        onChange={(value) => handleSliderChange(e.id, value)} 
                    />
                    </Col>
                </Row>
                )}
                {/* <h1 className='title_kms'>{carInputValue} kms</h1> */}
                
            </div>
            <div className='houseMenberImg' style={{
                backgroundImage: `url(${travelled})`,
                backgroundSize: 'cover', // Để hình ảnh nền hiển thị đầy đủ trong phần tử
                backgroundPosition: 'center', // Căn giữa hình ảnh nền
                marginTop:'11%',
                width: '100%', // Đảm bảo phần tử chiếm hết chiều rộng
                height: '50%', // Đặt chiều cao của phần tử
                display: 'flex', // Sử dụng flexbox
                flexDirection: 'column', // Xếp hình ảnh và nội dung ở dưới theo cột
                alignItems: 'center', // Căn giữa theo chiều ngang
                justifyContent: 'flex-end', // Đặt nội dung ở dưới
            }}>
            </div>
        </div>
    </>)
}

export default DistanceTravelled;
