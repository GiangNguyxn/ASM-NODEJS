import React from "react";
import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IProduct } from "../../../interfaces/product";
import { Link } from "react-router-dom";
type Props = {
  products: IProduct[];
  categories: [];
  onRemove: () => void;
};

const ProductManagementPage = ({ products, categories, onRemove }: Props) => {
  const data = products.map((product) => {
    return {
      key: product._id,
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      des: product.des,
    };
  });
  interface DataType {
    key: string;
    name: string;
    price: number;
    des: string;
    categoryId: string[];
  }
  const onHandleRemove = (id: number | string) => {
    onRemove(id);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name Product",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price Product",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "des",
      key: "des",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
    },

    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button type="primary">
            <Link to={`/admin/products/${record.key}/edit`}>Edit</Link>{" "}
          </Button>
          <Button
            type="primary"
            danger
            ghost
            onClick={() => onHandleRemove(record.key)}
          >
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default ProductManagementPage;
