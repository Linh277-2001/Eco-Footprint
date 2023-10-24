import{ useState } from 'react';
import { Modal, Form, Input, Button, Image } from 'antd';
import {EditOutlined } from '@ant-design/icons';
import avatar from '../Home/assets/avatar.jpg'

function ProfilePage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      // Simulate API call or data processing
      console.log('Submitted values:', values);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  const token=localStorage.getItem("token");
  console.log(token);
  const userInfo=localStorage.getItem("userInfo");
  return (
    <div className="profile-page-container">
      <h2>Your Profile</h2>
      <Image preview={false} style={{width:'25%'}} src={localStorage.getItem("avatar")} className='avatar1'/>
      <h4>{localStorage.getItem("name")}</h4>
      <h4>{localStorage.getItem("username")}</h4>
      <h4>{localStorage.getItem("email")}</h4>
      <Button icon={<EditOutlined />} onClick={showModal}>
        Edit Profile
      </Button>

      <Modal
        title="Edit Profile"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Full Name" name="fullName">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Adress" name="adress">
            <Input />
          </Form.Item>
          <Form.Item label="Bio" name="bio">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProfilePage;
