import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import "../layout/RootLayout.css";
import { Outlet } from "react-router-dom";
import banner from "../../assets/banner.jpg";
const { Header, Content, Footer } = Layout;
const { Item } = Menu;
type Props = {};

const RootLayout = (props: Props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const user = JSON.parse(localStorage.getItem("user")!);

  return (
    <div className="layoutClient__container">
      <Layout className="layout">
        <Header>
          <div className="LogoClient"></div>
          <Menu>
            <Item key={"home"}>
              <Link to={"/"}>Home</Link>
            </Item>
            <Item key={"products"}>
              <Link to={"/products"}>Products</Link>
            </Item>
            <Item key={"signin"}>
              <Link to={"/signin"}>Login</Link>
            </Item>
            <Item key={"signup"}>
              <Link to={"/signup"}>Signup</Link>
            </Item>
          </Menu>
          {/* <Menu
          theme="dark"
          mode="horizontal"
          items={[
            { key: "homepage", label: "Home" },
            { key: "products", label: "Product" },
            { key: "signin", label: "Login" },
            { key: "signup", label: "Signin" },
          ]}
        /> */}
        </Header>
        <Content style={{ padding: "0 50px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
          <div
            className="site-layout-content"
            style={{ background: colorBgContainer }}
          >
            <div className="banner__container">
              <img src={banner} alt="" />
            </div>
            <Outlet />
          </div>
          <Footer style={{ textAlign: "center" }}>
            <div className="footer-layout">GIANGNNPG21946</div>
          </Footer>
        </Content>
      </Layout>
    </div>
  );
};

export default RootLayout;
