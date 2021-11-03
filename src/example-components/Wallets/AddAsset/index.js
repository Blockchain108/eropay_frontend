import React from 'react';

import {
  Card,
  CardHeader,
  Input,
  Button,
  FormGroup,
} from 'reactstrap';

export default function LivePreviewExample() {

  return (
    <>
      <Card className="mb-5">
        <CardHeader className="d-flex align-items-center justify-content-between card-header-alt p-4">
          <div>
            <h6 className="font-weight-bold font-size-lg mb-0 text-black">
              Add Search
            </h6>
            <div className="mt-1 font-size-sm">
                If you want to hold any additional assets issued on the Stellar network (not whitelisted in LOBSTR), please use the form below to find them by the domain name (i.e. example.com).
            </div>
            <div className="font-size-sm">
                LOBSTR does not endorse any assets on the Stellar network. Please do your own research and use caution.
            </div>
          </div>
        </CardHeader>
        <FormGroup className="p-4 d-flex justify-content-start align-items-center">
            <Input
                type="text"
                name=""
                id=""
                placeholder="Asset Domain"
                className="mr-3 w-50"
            />
            <Button color="success">
                Search
            </Button>
        </FormGroup>
      </Card>
    </>
  );
}
