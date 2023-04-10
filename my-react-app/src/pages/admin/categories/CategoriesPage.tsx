import React from "react";
import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

type Props = {
  categories: [];
  onRemove: () => void;
};

const CategoriesPage = ({ categories, onRemove }: Props) => {
  const data = categories.map((category) => {
    return {
      key: category._id,
      name: category.name,
      quantity: category.products.length,
    };
  });
  interface DataType {
    key: string;
    name: string;
    price: number;
    des: string;
    categoryId: string[];
  }
  //   const onHandleRemove = (id: number | string) => {
  //     onRemove(id);
  //   };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name Category",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Quantity Products",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button type="primary">
            <Link to={`/admin/category/${record.key}/edit`}>Edit</Link>{" "}
          </Button>
          <Button
            type="primary"
            danger
            ghost
            onClick={() => onRemove(record.key)}
          >
            Remove
          </Button>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};

export default CategoriesPage;
