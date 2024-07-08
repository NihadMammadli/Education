import { Modal } from 'antd';
import React from 'react';

const CorpusModal = ({ open, close, id, deleteFunction }) => {
    return (
        <Modal
            open={open}
            title="Corpus"
            onClose={close}
            onCancel={close}
            onOk={() => deleteFunction(id)}
        >
            Are you sure about deleting ?
        </Modal>
    );
};

export default CorpusModal;
