import React from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const Index = () => {
  return (
    <Content>
      <div
        style={{
          backgroundColor: "#FFFFFF",
          margin: "20px 20px 0px 20px",
          padding: "10px",
          height: "90%",
          borderRadius: "8px",
          boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)"
        }}
      >
        <Outlet />
      </div>
    </Content>
  )
}
export default Index;
