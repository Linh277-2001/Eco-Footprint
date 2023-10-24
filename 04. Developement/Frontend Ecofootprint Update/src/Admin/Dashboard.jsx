import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import axios from 'axios';

const Dashboard = () => {
  const [countUser, setCountUser]=useState(0);
  const token=localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  // console.log(headers)
  const getCountUser=async()=>{
    try{
    //   const response=await axios.get("http://localhost:8080/api/admin/count",{headers})
    // setCountUser(response.data);
    // console.log(response.data)

    const response = await axios({
      method: "GET",
      url:"http://localhost:8080/api/admin/count",
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json" 
      }
    })
    setCountUser(response.data);
    console.log("res", response.data);
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    getCountUser();
  },[])
  const categoryData = 15;
  const articleData = 300;

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="User Account" bordered style={{backgroundColor:'#b9ffd3'}}>
            <p style={{ fontSize: '24px' }}>{countUser}</p>
            <p style={{ fontSize: '18px' }}>Total number of users</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Category Count" bordered style={{backgroundColor:'#adcbf3'}}>
            <p style={{ fontSize: '24px' }}>{categoryData}</p>
            <p style={{ fontSize: '18px' }}>Total number of Category</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Article Count" bordered style={{backgroundColor:'#fde1c3'}}>
            <p style={{ fontSize: '24px' }}>{articleData}</p>
            <p style={{ fontSize: '18px' }}>Total number of Article</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
