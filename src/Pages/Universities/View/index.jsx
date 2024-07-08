import { Modal } from 'antd';
import React from 'react';

const CorpusModal = ({ open, close, data }) => {
    return (
        <Modal
            open={open}
            footer={false}
            title="Corpus"
            onClose={close}
            onCancel={close}
        >
            {data?.map((dat, index) => (
                <div key={index}>
                    {dat.name}
                </div>
            ))}
        </Modal>
    );
};

export default CorpusModal;
