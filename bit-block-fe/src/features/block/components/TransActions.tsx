import { Grid } from '@material-ui/core';
import React, { FunctionComponent } from 'react'
import { TransactionsActions } from '../../../components/TransactionsActions';
import { StyledTransactionsList, StyledTransactionsWrapper } from '../styles/block-page-styles.style';
import ForwardIcon from '@material-ui/icons/Forward';


interface IProps {
    arrayOfTransactions: any;
    page: number;
    rowsPerPage: number;
    setPage: (e: any) => any;
}

const TransActions: FunctionComponent<IProps> = ({ arrayOfTransactions, page, rowsPerPage, setPage }) => {
    return (
        <StyledTransactionsWrapper>
            <h3>Transactions</h3>
            <StyledTransactionsList>
                {arrayOfTransactions && arrayOfTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tx: any) => {
                    const date = new Date(tx.time * 1000)

                    const timeStringStamp = date.toLocaleDateString().split("/");

                    const timestamp = timeStringStamp.join("-");
                    return (
                        <div style={{ display: 'flex' }}>
                            <div style={{ float: 'left', width: '10%' }}>
                                <p>Hash</p>
                                <p>Fee</p>
                            </div>
                            <div style={{ float: 'left', width: '20%' }}>
                                <p style={{ overflow: 'scroll' }}>{tx.hash}</p>
                                <p>{`${(tx.fee * 100000)}`}BTC</p>
                            </div>
                            <div style={{ float: 'left', width: '5%' }}>
                                <br />
                                <br />
                                <p><ForwardIcon style={{ color: 'green' }} /></p>
                            </div>
                            <div style={{ float: 'left', width: '35%', marginTop: 35 }}>
                                {tx?.out.map((t: any) => (
                                    <p style={{ width: 50 }}>{t && t.addr && t.addr.slice(0, 30)}...</p>
                                ))}
                            </div>
                            <div>
                                <div style={{ textAlign: 'right', width: 200 }}>
                                    <p>{timestamp}</p>
                                    {tx.out.map((t: any) => (
                                        <p style={{ marginLeft: 10 }}>{t.value * 500000} BTC</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </StyledTransactionsList>
            <TransactionsActions
                page={page}
                setPage={setPage}
                arrayOfTransactions={arrayOfTransactions} />
        </StyledTransactionsWrapper>
    )
}

export default TransActions
