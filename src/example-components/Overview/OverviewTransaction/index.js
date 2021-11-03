import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { dashboardActions } from '../../../_actions';
import TransactionModal from './transactionModal';

import {
    Table,
    Card,
    CardHeader
} from 'reactstrap';

import {
    ArrowDownRight,
    ArrowUpRight
} from 'react-feather';

export default function LivePreviewExample() {
    const [toggleTransactionModal, setToggleTransactionModal] = useState(false);
    const [transactionIndex, setTransactionIndex] = useState(0);
    const [transactionList, setTransactionList] = useState([])
    const publicKey = useSelector(state => state.auth.userData.public_key);
    
    const transModal = (index) => {
        setTransactionIndex(index);
        setToggleTransactionModal(!toggleTransactionModal);
    }

    const lastestTransaction = async () => {
        setTransactionList((await dashboardActions.getTransaction(publicKey)).slice(0, 10));
    }

    useEffect(() => {
        lastestTransaction();
    }, [])

    return (
        <>
            <Card className="mb-5">
                <CardHeader className="d-flex align-items-center justify-content-between card-header-alt p-4">
                    <div>
                        <h6 className="font-weight-bold font-size-lg mb-0 text-black">
                            Last Transaction
                        </h6>
                    </div>
                </CardHeader>
                <div className="divider" />
                <div className="divider" />
                <Table responsive borderless className="text-nowrap mb-4">
                    <tbody>
                        {
                            transactionList.map((transaction, index) => (
                                <tr 
                                    key={index} 
                                    className="cursor-pointer"
                                    onClick={() => transModal(index)} >
                                    <td className="px-4">
                                        <div className="d-flex align-items-center">
                                            <div color="danger" className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-neutral-success text-success">
                                                { transaction.status ? <ArrowUpRight /> : <ArrowDownRight /> } 
                                            </div>
                                            <div>
                                                <div className="font-size-sm font-weight-bold">
                                                    {
                                                        transaction.type === 'create_account' ? 
                                                            transaction.account.slice(0, 8) + '...' + transaction.account.slice(-8) :
                                                            transaction.from.slice(0, 8) + '...' + transaction.from.slice(-8)
                                                    }
                                                </div>
                                                <div className="font-size-sm opacity-7">
                                                    { transaction.status ? 'Sent' : 'Received' }
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-right px-4">
                                        <div className="font-size-sm font-weight-bold">
                                            {
                                                transaction.type === 'create_account' ? 
                                                    transaction.starting_balance + ' XLM' : 
                                                    transaction.amount + ' '
                                            }
                                            { transaction.asset_type === 'native' ? 'XLM' : transaction.asset_code }
                                        </div>
                                        <div className="font-size-sm opacity-7">
                                            { transaction.created_at }
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Card>

            {
                toggleTransactionModal && 
                    <TransactionModal 
                        modal={toggleTransactionModal} 
                        toggle={()=>setToggleTransactionModal(!toggleTransactionModal)}  
                        data={transactionList[transactionIndex]}  />
            }
        </>
    );
}
