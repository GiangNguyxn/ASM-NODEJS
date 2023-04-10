import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Form, Input } from "antd";
type Props = {
  categories: [];
  onUpdate: () => void;
};

const UpdateCategoryPage = ({ categories, onUpdate }: Props) => {
  const [category, setCategory] = useState({});
  const { id: _id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const data = categories.find((item) => item._id == _id);
    setCategory(data);
  }, [categories]);
  useEffect(() => {
    setFields();
  }, [category]);
  const [form] = Form.useForm();
  const setFields = () => {
    form.setFieldsValue({
      id: category?._id,
      name: category?.name,
    });
  };
  const onFinish = (value: any) => {
    onUpdate({ _id, ...value });
    navigate("/admin/categories");
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name Category"
        name="name"
        rules={[{ required: true, message: "Please input your name product!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Update Category
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateCategoryPage;
