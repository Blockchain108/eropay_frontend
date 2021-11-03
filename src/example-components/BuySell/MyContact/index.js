import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Table,
  Card,
  CardBody,
  CardTitle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Modal,
  Label,

} from 'reactstrap';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';

export default function LivePreviewExample() {
  const [modal, setModal] = useState(false);

  const toggle = (index) => {
      setModal(!modal);
  };

  return (
    <>
      <Card className="card-box mb-5 p-4">
        <div className="card-header py-3">
          <div className="card-header--title font-size-lg">My Contacts</div>
          <div className="card-header--actions">
            <Button 
              size="sm" 
              color="neutral-primary"
              onClick={() => toggle()}>
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fas', 'plus-circle']} />
              </span>
              <span className="btn-wrapper--label">Add Contact</span>
            </Button>
          </div>
        </div>
        <div className="d-flex justify-content-between px-4 py-3">
          <FormGroup className="w-100">
            <InputGroup className="input-group-seamless">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <FontAwesomeIcon icon={['fas', 'search']} className="mx-auto" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Search terms..." type="search" />
            </InputGroup>
          </FormGroup>
        </div>
        <div className="divider" />
        <div className="table-responsive-md">
          <Table hover className="text-nowrap mb-0">
            <thead>
              <tr>
                <th className="bg-white text-left">ID</th>
                <th className="bg-white">Requester</th>
                <th className="bg-white text-center">Created date</th>
                <th className="bg-white text-center">Due date</th>
                <th className="bg-white text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-weight-bold">#453</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="avatar-icon-wrapper avatar-icon-sm mr-2">
                      <div className="avatar-icon">
                        <img alt="..." src={avatar1} />
                      </div>
                    </div>
                    <div>Shanelle Wynn</div>
                  </div>
                </td>
                <td className="text-center text-black-50">12/12/2020</td>
                <td className="text-center text-black-50">08/30/2021</td>
                <td className="text-center">
                  <Button
                    size="sm"
                    color="link"
                    className="d-30 p-0 btn-icon hover-scale-sm">
                    <FontAwesomeIcon
                      icon={['fas', 'ellipsis-h']}
                      className="font-size-lg"
                    />
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="font-weight-bold">#584</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="avatar-icon-wrapper avatar-icon-sm mr-2">
                      <div className="avatar-icon">
                        <img alt="..." src={avatar3} />
                      </div>
                    </div>
                    <div>Brody Dixon</div>
                  </div>
                </td>
              <td className="text-center text-black-50">06/08/2022</td>
                <td className="text-center text-black-50">07/25/2023</td>
                <td className="text-center">
                  <Button
                    size="sm"
                    color="link"
                    className="d-30 p-0 btn-icon hover-scale-sm">
                    <FontAwesomeIcon
                      icon={['fas', 'ellipsis-h']}
                      className="font-size-lg"
                    />
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="font-weight-bold">#764</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="avatar-icon-wrapper avatar-icon-sm mr-2">
                      <div className="avatar-icon">
                        <img alt="..." src={avatar5} />
                      </div>
                    </div>
                    <div>Milton Ayala</div>
                  </div>
                </td>
               <td className="text-center text-black-50">12/12/2020</td>
                <td className="text-center text-black-50">08/30/2021</td>
                <td className="text-center">
                  <Button
                    size="sm"
                    color="link"
                    className="d-30 p-0 btn-icon hover-scale-sm">
                    <FontAwesomeIcon
                      icon={['fas', 'ellipsis-h']}
                      className="font-size-lg"
                    />
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="font-weight-bold">#453</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="avatar-icon-wrapper avatar-icon-sm mr-2">
                      <div className="avatar-icon">
                        <img alt="..." src={avatar1} />
                      </div>
                    </div>
                    <div>Kane Gentry</div>
                  </div>
                </td>
                <td className="text-center text-black-50">12/12/2020</td>
                <td className="text-center text-black-50">08/30/2021</td>
                <td className="text-center">
                  <Button
                    size="sm"
                    color="link"
                    className="d-30 p-0 btn-icon hover-scale-sm">
                    <FontAwesomeIcon
                      icon={['fas', 'ellipsis-h']}
                      className="font-size-lg"
                    />
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="card-footer py-3 d-flex justify-content-between">
          <Pagination className="pagination-second">
            <PaginationItem disabled>
              <PaginationLink
                first
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <FontAwesomeIcon icon={['fas', 'angle-double-left']} />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem disabled>
              <PaginationLink
                previous
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <FontAwesomeIcon icon={['fas', 'chevron-left']} />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active>
              <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                4
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                5
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                next
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <FontAwesomeIcon icon={['fas', 'chevron-right']} />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                last
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <FontAwesomeIcon icon={['fas', 'angle-double-right']} />
              </PaginationLink>
            </PaginationItem>
          </Pagination>
          <div className="d-flex align-items-center">
            <span>Show</span>
            <select className="mx-1 form-control form-control-sm" id="" name="">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
            <span>entries</span>
          </div>
        </div>
      </Card>

      <Modal
        size="md"
        centered
        isOpen={modal}
        zIndex={1300}
        toggle={()=>toggle(0)}
        contentClassName="border-0 bg-white">
        <Card className="card-box">
          <CardBody>
            <CardTitle className="font-weight-bold font-size-lg mb-4">
              Add contact
            </CardTitle>
            <Form>
              <FormGroup>
                <Label htmlFor="exampleEmail">Account</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Enter public key or federation address"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="examplePassword">Contact name (optional)</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Enter contact name"
                />
              </FormGroup>
              <FormGroup className="d-flex justify-content-end">
                <Button color="light" className="mt-1 mr-2">
                  Close
                </Button>
                <Button color="success" className="mt-1">
                  Add
                </Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Modal>
    </>
  );
}
