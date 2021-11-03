import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { Upload, Check, X, User } from 'react-feather';

import {
    Row,
    Col,
    FormGroup,
    FormText,
    Button,
    Input
} from 'reactstrap';

import { userActions } from '../../../_actions';
import { toast } from 'react-toastify';
import ResetPassword from './ResetPassword';

export default function SettingsProfile() {
    const [files, setFiles] = useState([]);
    const [passModal, setPassModal] = useState(false);

    const userInfo = useSelector(state => state.auth.userData);
    const [firstname, setFirstname] = useState(userInfo.firstname);
    const [lastname, setLastname] = useState(userInfo.lastname);
    const [photo, setPhoto] = useState(userInfo.photo);

    const {
        isDragActive,
        isDragAccept,
        isDragReject,
        open,
        getRootProps,
        getInputProps
    } = useDropzone({
        noClick: true,
        noKeyboard: true,
        multiple: false,
        accept: 'image/*',
        onDrop: async (acceptedFiles) => {
            const formData = new FormData();
            formData.append("file", acceptedFiles[0]);
            var result = await userActions.fileUpload(formData);
            if (result.data.status) {
                setFiles(
                    acceptedFiles.map((file) =>
                        Object.assign(file, {
                            preview: URL.createObjectURL(file)
                        })
                    )
                );
                setPhoto(result.data.filename);
            }
        }
    });

    const thumbs = files.map((file) => (
        <div key={file.name}
            className="rounded-circle avatar-image overflow-hidden d-140 bg-neutral-success text-center font-weight-bold text-success d-flex justify-content-center align-items-center">
            <img className="img-fluid img-fit-container rounded-sm" src={file.preview} alt="..." />
        </div>
    ));

    const saveProfile = async () => {
        if (firstname === '' || lastname ==='') {
            toast.warning('Please enter all required info'); return;
        }

        var data = {
            id: userInfo.id,
            firstname: firstname,
            lastname: lastname,
            photo: photo
        }

        var result = await userActions.saveProfile(data);
        if (result.data.status) {
            window.location.reload();
        } else {
            toast.warning("Something Server Problem!");
        }
    }

    useEffect(() => () => {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <>
            <Row className="p-4">
                <Col md="12" className="d-flex justify-content-center mb-4">
                    <div className="d-block d-md-flex align-items-start">
                        <div className="dropzone rounded-circle shadow-sm-dark mr-md-3">
                            <div {...getRootProps({ className: 'dropzone-upload-wrapper' })}>
                                <input {...getInputProps()} />
                                <div className="dropzone-inner-wrapper d-140 rounded-circle dropzone-avatar">
                                    <div className="avatar-icon-wrapper d-140 rounded-circle m-2">
                                        <Button color="link" onClick={open}
                                            className="avatar-button badge shadow-sm-dark btn-icon badge-position badge-position--bottom-right border-2 text-indent-0 d-40 badge-circle badge-first text-white">
                                            <Upload className="d-20" />
                                        </Button>

                                        <div>
                                            {isDragAccept && (
                                                <div className="rounded-circle overflow-hidden d-140 bg-success text-center font-weight-bold text-white d-flex justify-content-center align-items-center">
                                                    <Check className="d-40" />
                                                </div>
                                            )}
                                            {isDragReject && (
                                                <div className="rounded-circle overflow-hidden d-140 bg-danger text-center font-weight-bold text-white d-flex justify-content-center align-items-center">
                                                    <X className="d-60" />
                                                </div>
                                            )}
                                            {!isDragActive && (
                                                <div className="rounded-circle overflow-hidden d-140 bg-second text-center font-weight-bold text-white-50 d-flex justify-content-center align-items-center">
                                                    <User className="d-50" />
                                                </div>
                                            )}
                                        </div>

                                        {thumbs.length > 0 && <div>{thumbs}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md="6" className="mt-5">
                    <FormGroup>
                        <label className="font-weight-bold">
                            First name
                        </label>
                        <Input value={firstname} onChange={(e)=>setFirstname(e.currentTarget.value)} />
                    </FormGroup>
                </Col>
                <Col md="6" className="mt-5">
                    <FormGroup>
                        <label className="font-weight-bold">
                            Last name
                        </label>
                        <Input value={lastname} onChange={(e)=>setLastname(e.currentTarget.value)} />
                    </FormGroup>
                </Col>
                <Col md="6">
                    <FormGroup>
                        <label className="font-weight-bold">
                            Account email
                        </label>
                        <Input value={userInfo.email} readOnly />
                    </FormGroup>
                </Col>
                <Col md="6">
                    <FormGroup>
                        <label className="font-weight-bold">
                            Password
                        </label>
                        <Input type="password" value="*********" readOnly />
                        <FormText color="success" className="text-right cursor-pointer" onClick={()=>setPassModal(!passModal)}>
                            Change password
                        </FormText>
                    </FormGroup>
                </Col>
                <Col md="6">
                    <FormGroup>
                        <label className="font-weight-bold">
                            Phone number
                        </label>
                        <Input value={ userInfo.phone } readOnly />
                        <FormText color="success" className="text-right">Change phone number</FormText>
                    </FormGroup>
                </Col>
                <Col md="6"></Col>
                <Col md="12" className="d-flex justify-content-between">
                    <FormGroup>
                        <Button color="danger">Delete Wallet.Eropay account</Button>
                    </FormGroup>
                    <FormGroup>
                        <Button color="success" onClick={()=>saveProfile()}>Save Profile</Button>
                    </FormGroup>
                </Col>
            </Row>
            {
                passModal && <ResetPassword modal={passModal} setModal={()=>setPassModal(!passModal)} />
            }
        </>
    )
}