import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IProduct } from "../../../interfaces/product";
import { Button, Form, Input, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
const { TextArea } = Input;
type Props = {
  products: IProduct[];
  onUpdate: (props: Props) => void;
  categories: any;
};

const UpdateProductPage = ({ products, onUpdate, categories }: Props) => {
  const { id: _id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const data = products.find((item) => item._id == _id);
    setProduct(data);
  }, [products]);
  useEffect(() => {
    setFields();
  }, [product]);
  const [form] = Form.useForm();

  const setFields = () => {
    form.setFieldsValue({
      id: product?._id,
      name: product?.name,
      price: product?.price,
      categoryId: product?.categoryId,
      des: product?.des,
    });
  };

  const onFinish = (values: any) => {
    onUpdate({ _id, ...values });
    navigate("/admin/products");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const dataCate = categories.map((item: any) => {
    return {
      value: item._id,
      label: item.name,
    };
  });

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
      {/* <Form.Item label="Image" name="image">
        <Upload listType="picture" action="http://localhost:8081/api/products">
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item> */}
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
          options={dataCate}
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
          Update Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateProductPage;
