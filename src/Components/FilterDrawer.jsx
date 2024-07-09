import { useState, useEffect } from 'react';
import { Drawer, Checkbox, Row, Col, Space, Button } from 'antd';

const FilterDrawer = (props) => {
    const {
        open,
        form,
        close,
        field,
        setField,
        dataParams,
        filterData,
        getTableData,
    } = props;

    const [checkedList, setCheckedList] = useState([]);

    const closeFilter = () => {
        setCheckedList([])
        setField("")
        close()
    };

    const onChange = (list) => {
        setCheckedList(list);
    };

    // Sadly because of the mock api that I was using and limited time, It is not possible to filter couple values for one field
    // In theory with proper backend it should have been working with multiple values
    const finishFilter = (values, field) => {
        values.forEach((value, index) => {
            dataParams.current[`${field}`] = value;
        });

        closeFilter()
        getTableData()
    };

    return (
        <Drawer
            open={open}
            title="Filter"
            onClose={closeFilter}
            onCancel={closeFilter}
            extra={
                <Space>
                    <Button type="primary" onClick={() => finishFilter(checkedList, field)}>
                        Filter Data
                    </Button>
                </Space>
            }
        >
            <>
                <Row>
                    <Checkbox.Group
                        value={checkedList}
                        onChange={onChange}
                        style={{ maxHeight: (window.innerHeight - 200), overflowY: "auto", overflowX: "hidden" }}
                    >
                        {filterData?.map((dat) => (
                            <Col key={dat?.name} span={24}>
                                <Checkbox value={dat?.name}>{dat.name}</Checkbox>
                            </Col>
                        ))}
                    </Checkbox.Group>
                </Row>
            </>
        </Drawer>
    );
};

export default FilterDrawer;
