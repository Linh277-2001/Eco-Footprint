import { useState } from 'react';
import { Form, Input, message } from 'antd';
import axios from 'axios';

function AccountSettingsPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [password, setPassword]=useState("");
  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      console.log('Submitted values:', values);
      message.success('Account settings updated successfully!');
      setLoading(false);
      form.resetFields();
    }, 1500);
  };
  const userId=localStorage.getItem("userId");
  const token=localStorage.getItem("token");
  const handleClickSubmit=async()=>{
    try{
      const response=await axios({
        url:`http://localhost:8080/api/user/changePassword/${userId}?newPassWord=${password}`,
        method: "PUT",
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      alert("Change sucsess");
    }
    catch(error){
      console.error(error)
    }
  }  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  console.log(password);

  return (
    <div className="account-settings-page">
      <h2 style={{marginTop:'15px'}}>Account Settings</h2>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { min: 6, message: 'Password must be at least 6 characters' },
          ]}
          
        >
          <Input.Password value={password} onChange={e=>setPassword(e.target.value)}/>
        </Form.Item>
        <Form.Item
          label="Confirm New Password"
          name="confirmNewPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your new password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords do not match')
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <button loading={loading} style={{backgroundColor:'#ccc', marginBottom:'10px',marginLeft:'40%'}} onClick={handleClickSubmit}>Submit</button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AccountSettingsPage;
