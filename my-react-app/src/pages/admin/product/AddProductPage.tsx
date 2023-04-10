import React from "react";
import { IProduct } from "../../../interfaces/product";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Select } from "antd";
const { TextArea } = Input;
type Props = {
  onAdd: () => void;
  categories: any;
};

const AddProductPage = ({ onAdd, categories }: Props) => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      await onAdd(values);
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const data = categories.map((item: any) => {
    return {
      value: item._id,
      label: item.name,
    };
  });

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
        label="Name Product"
        name="name"
        rules={[{ required: true, message: "Please input your name product!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Price Product"
        name="price"
        rules={[{ required: true, message: "Please input your price!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Category Product"
        name="categoryId"
        rules={[{ required: true, message: "Please input your category!" }]}
      >
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={data}
        />
      </Form.Item>
      <Form.Item
        label="Description Product"
        name="des"
        rules={[{ required: true, message: "Please input your description!" }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add New Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductPage;
