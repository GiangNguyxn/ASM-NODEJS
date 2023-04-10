import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

type Props = {
  onCateAdd: () => void;
};

const AddCategoryPage = ({ onCateAdd }: Props) => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    onCateAdd(values);
    navigate("/admin/categories");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name Category"
        name="name"
        rules={[
          { required: true, message: "Please input your name category!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add New Category
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCategoryPage;
