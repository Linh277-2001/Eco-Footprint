import  { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function CreatePostPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // Simulate API call or data processing
    setTimeout(() => {
      console.log('Submitted values:', values);
      message.success('Post created successfully!');
      setLoading(false);
      form.resetFields();
    }, 1500);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="create-post-page">
      <h2 style={{marginTop:'15px'}}>Create a New Post</h2>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter the title' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: 'Please enter the content' }]}
        >
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item label="Upload Images" name="images">
          <Upload maxCount={3} listType="picture">
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
            <button loading={loading} style={{backgroundColor:'#ccc', marginBottom:'10px',marginLeft:'40%'}}>Submit</button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreatePostPage;
