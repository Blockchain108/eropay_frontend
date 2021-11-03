import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'reactstrap';

const ConfirmModal = props => {
    const { modal, confirmToggle, confirmValue, title, btnName } = props;

    const cancalHandler = () => {
        confirmToggle(!modal);
        confirmValue(false);
    }
    
    const confirmHandler = () => {
        confirmToggle(!modal);
        confirmValue(true);
    }

    return (
        <>
            <Modal zIndex={2000} centered isOpen={modal} toggle={()=>cancalHandler()}>
                <div className="text-center p-5">
                    <div className="avatar-icon-wrapper rounded-circle m-0">
                        <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-success text-success m-0 d-130">
                            <FontAwesomeIcon
                            icon={['far', 'lightbulb']}
                            className="d-flex align-self-center display-3"
                            />
                        </div>
                    </div>
                    <h4 className="font-weight-bold mt-2">
                        {title}
                    </h4>
                    <div className="pt-4">
                        <Button
                            onClick={()=>cancalHandler()}
                            color="neutral-dark"
                            className="btn-pill mx-1">
                            <span className="btn-wrapper--label">Cancel</span>
                        </Button>
                        <Button
                            onClick={()=>confirmHandler()}
                            color="success"
                            className="btn-pill mx-1">
                            <span className="btn-wrapper--label">{btnName}</span>
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ConfirmModal;
