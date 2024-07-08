import { Drawer } from 'antd';
import React from 'react';

const FilterDrawer = ({ open, close, id, deleteFunction }) => {
    return (
        <Drawer
            open={open}
            title="Corpus"
            onClose={close}
            onCancel={close}
            onOk={() => deleteFunction(id)}
        >
            Are you sure about deleting ?
        </Drawer>
    );
};

export default FilterDrawer;
