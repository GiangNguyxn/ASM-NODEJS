import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, ContainerOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import "../layout/AdminLayout.css";
import { Button } from "antd/es/radio";
import type { MenuProps } from "antd";
import { Footer } from "antd/es/layout/layout";
type MenuItem = Required<MenuProps>["items"][number];
const { Header, Sider, Content } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link style={{ textDecorationLine: "none" }} to={`/admin/products`}>
      Danh sách sản phẩm
    </Link>,
    "sub1",
    <MenuFoldOutlined />,
    [
      getItem(
        <Link style={{ textDecorationLine: "none" }} to={`/admin/products`}>
          Thêm sản phẩm
        </Link>,
        "3"
      ),
    ]
  ),
  getItem(
    <Link style={{ textDecorationLine: "none" }} to={`/admin/categories`}>
      Danh sách danh mục
    </Link>,
    "sub2",
    <ContainerOutlined />,
    [getItem("Thêm danh mục", "6")]
  ),
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    const role = JSON.parse(user).role;

    if (role != "admin") {
      navigate("/signin");
    }
  });
  const onHandleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Button onClick={onHandleLogout}>Logout</Button>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
