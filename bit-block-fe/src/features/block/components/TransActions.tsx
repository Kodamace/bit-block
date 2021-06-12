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
                    const date = new Date(tx.time)

                    const timeStringStamp = date.toLocaleDateString().split("/");

                    const timestamp = timeStringStamp.join("-");
                    return (
                        <Grid container justify='space-around'>
                            <Grid item xs={6} sm={2}>
                                <p>Hash</p>
                                <p>Fee</p>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <p style={{ overflow: 'scroll' }}>{tx.hash}</p>
                                <p>{`${(tx.fee)}`}</p>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <br />
                                <br />
                                <p><ForwardIcon /></p>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <br />
                                <br />
                                {tx?.out.map((t: any) => (
                                    <p style={{ overflow: 'scroll' }}>{t && t.addr && t.addr}</p>
                                ))}
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <div style={{ textAlign: 'right' }}>
                                    <p>{timestamp}</p>
                                    {tx.out.map((t: any) => (
                                        <p style={{ marginLeft: 10 }}>{t.value} BTC</p>
                                    ))}
                                </div>
                            </Grid>
                        </Grid>
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
