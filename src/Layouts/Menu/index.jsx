import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from 'antd';

import {
  BellOutlined,
  UserOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const getItem = (label, key, url, icon, children) => ({
  label,
  key,
  url,
  icon,
  children,
});

const items = [
  getItem(
    "Universities",
    "universities",
    "/education/universities",
    <UserOutlined />
  ),

  getItem(
    "Schools",
    "schools",
    `/education/schools`,
    <BellOutlined />
  ),
  getItem(
    "High Schools",
    "high_schools",
    `/education/high_schools`,
    <AppstoreOutlined />
  ),
];

const Index = () => {
  const Navigation = useNavigate();

  const onSelect = (event) => {
    let url = items.find((value) => value.key === event?.key)?.url

    Navigation(url);
  };

  return (
    <Menu
      defaultSelectedKeys={window.location.pathname.split('/')[2]}
      theme="light"
      mode="inline"
      items={items}
      onSelect={onSelect}
    />
  );
};
export default Index;
