import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from 'antd';

import {
  HomeOutlined,
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

const { pathname } = window.location

const items = [
  getItem(
    "Home",
    "home",
    "/education/home",
    <HomeOutlined />
  ),

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
    const { keyPath } = event;
    const path = keyPath.reverse();
    const { length } = path;

    let url;

    switch (length) {
      case 1: {
        url = items.find((value) => value.key === path[0]).url;
        break;
      }
      case 2: {
        const children = items.find((value) => value.key === path[0]).children;
        url = children.find((value) => value.key === path[1]).url;
        break;
      }

      default:
        url = import.meta.env.VITE_HOME;
    }

    Navigation(url);
  };

  return (
    <Menu
      defaultSelectedKeys={pathname.substring("/cms/".length)}
      theme="light"
      mode="inline"
      items={items}
      onSelect={onSelect}
    />
  );
};
export default Index;
