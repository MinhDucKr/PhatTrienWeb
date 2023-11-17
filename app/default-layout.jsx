"use client";
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Avatar } from "antd";
const { Header, Sider, Content } = Layout;
const LayoutCustom = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    {
      key: "1",
      icon: <TagOutlined />,
      label: "Sản phẩm",
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Nhân viên",
    },
  ];

  return (
    <Layout>
      <Sider
        style={{ backgroundColor: "#fff" }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        {!collapsed && (
          <div className="h-16 px-4">
            <span className=" text-[32px] font-bold mr-4">Asia</span>{" "}
            <span className="text-[32px] font-medium text-red-500 ">star</span>
          </div>
        )}
        <Menu mode="inline" defaultSelectedKeys={["1"]} items={menu} />
      </Sider>
      <Layout>
        <div style={{ backgroundColor: "#fff" }} className="pr-8">
          <div className="flex justify-between items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="flex gap-2">
              <Avatar shape="square" size="large" icon={<UserOutlined />} />
              <div className="flex flex-col justify-start">
                <p>Dương Minh Đức </p>
                <p className="text-red-500">Manager</p>
              </div>
            </div>
          </div>
        </div>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutCustom;
