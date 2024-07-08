import React from "react";
import Menu from "./Menu";
import Container from "./Container";
import { Layout } from "antd";
const { Sider } = Layout;

const Index = () => {
    return (
        <Layout>
            <Sider
                theme={"light"}
                collapsible
                width={260}
                collapsedWidth={75}
            >
                <Menu />
            </Sider>

            <Layout>
                <Container />
            </Layout>
        </Layout>
    );
};
export default Index;
