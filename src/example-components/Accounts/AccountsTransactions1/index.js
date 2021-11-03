import React, { useState } from 'react';

import {
  Row,
  Col,
  FormText,
  Input,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Label,
  Modal,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardSubtitle,
  Form,
  FormGroup
} from 'reactstrap';

import visa from '../../../assets/images/visa-logo-color.svg';
import mastercard from '../../../assets/images/mastercard-logo-color.svg';

export default function LivePreviewExample() {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  return (
    <>
      <Card className="mb-5">
        <CardHeader className="d-flex align-items-center justify-content-between card-header-alt p-4">
          <div>
            <h6 className="font-weight-bold font-size-lg mb-0 text-black">
              Buy Lumens
            </h6>
            <FormText color="muted">
              Use your debit or credit card to buy Stellar Lumens (XLM)
            </FormText>
          </div>
          <div className="d-flex align-items-center">
            <img alt="" className="payment-method-img" src={visa} />
            <img alt="" className="payment-method-img" src={mastercard} />
          </div>
        </CardHeader>
        <div className="divider" />
        <Row className="p-4">
          <Col md="8">
            <FormGroup>
              <Label className="font-weight-bold" for="">
                Payment amount
              </Label>
              <Input
                type="text"
                name=""
                id=""
                placeholder="The amount of currency you want to spend"
              />
              <FormText color="muted">
              * The minimum amount is $20. The maximum is $12000
              </FormText>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <label className="font-weight-bold">
                  Currency
              </label>
              <div>
                  <UncontrolledDropdown tag="span" className="w-100">
                      <DropdownToggle color="neutral-dark" caret className="text-left w-100 d-inline-flex justify-content-between align-items-center">
                        USD
                      </DropdownToggle>
                      <DropdownMenu className="w-100 dropdown-menu-currency">
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  USD
                              </a>
                          </div>
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  EUR
                              </a>
                          </div>
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  GBP
                              </a>
                          </div>
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  AUD
                              </a>
                          </div>
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  BRL   
                              </a>
                          </div>
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  CAD
                              </a>
                          </div>
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  CHF
                              </a>
                          </div>
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  CNY
                              </a>
                          </div>
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  INR
                              </a>
                          </div>
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  JPY
                              </a>
                          </div>
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  KRW
                              </a>
                          </div>
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  MXN
                              </a>
                          </div>
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  NGN
                              </a>
                          </div>
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  PLN
                              </a>
                          </div>
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  RUB
                              </a>
                          </div>
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  SEK
                              </a>
                          </div>
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  SGD
                              </a>
                          </div>
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  THB
                              </a>
                          </div>
                          <div role="menuitem">
                              <a
                                  className="dropdown-item"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  TRY
                              </a>
                          </div>
                      </DropdownMenu>
                  </UncontrolledDropdown>
              </div>
            </FormGroup>
          </Col>
          <Col md="8">
            <FormGroup>
              <Label className="font-weight-bold" for="">
                Order amount
              </Label>
              <Input
                type="text"
                name=""
                id=""
                placeholder="The amount of XLM you will receive"
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label className="font-weight-bold" for="">
              Currency
              </Label>
              <Input
                type="text"
                name=""
                id=""
                placeholder="XLM"
                readOnly
              />
            </FormGroup>          
          </Col>
        </Row>
        <div className="divider" />
        <div className="p-4 d-flex justify-content-end align-items-center">
          <FormGroup>
            <Button color="success" size="sm" onClick={()=>toggle()}>
              Continue
            </Button>
          </FormGroup>
        </div>
      </Card>

      <Modal
        size="md"
        centered
        isOpen={modal}
        zIndex={1300}
        toggle={()=>toggle()}
        contentClassName="border-0 bg-white">
        <Card className="card-box">
            <CardBody>
                <CardTitle className="font-size-lg">
                  Confirm your order
                </CardTitle>
                <CardSubtitle className="font-size-sm mb-4">
                  Please review the details of your order before continuing with the payment process.
                </CardSubtitle>
                <Form>
                    <FormGroup>
                      <Card className="card-box p-3 text-dark" color="neutral-dark">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            Order amount:
                          </div>
                          <div>
                            163.8 XLM 
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            Service fee:
                          </div>
                          <div>
                            6.5 USD
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            Total charge (fee included):
                          </div>
                          <div>
                            106.5 USD
                          </div>
                        </div>
                      </Card>
                    </FormGroup>
                    <div className="divider" />
                    <FormGroup>
                      <div className="font-size-sm mt-3">
                        You will be redirected to moonpay.io. Services relating to credit card payments are provided by Moonpay, 
                        which is a separate platform owned by a third party. LOBSTR does not assume any responsibility for any loss or 
                        damage caused by the use of the credit card payment service. By proceeding further, you accept this disclaimer.
                      </div>
                    </FormGroup>
                    <FormGroup className="d-flex justify-content-end">
                        <Button color="light" className="mt-1 mr-2">
                            Close 
                        </Button>
                        <Button color="success" className="mt-1">
                            Confirm Order
                        </Button>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
      </Modal>
    </>
  );
}
