import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Typography } from 'antd';
import { FilterOutlined } from "@ant-design/icons";

const { Text } = Typography

const Index = ({ header, onFilter }) => {
    return (
        <Row style={{ justifyContent: "space-between" }}>
            <Text>
                {header}
            </Text>

            {onFilter &&
                <FilterOutlined onClick={onFilter} />
            }
        </Row>
    )
};

export default Index;
