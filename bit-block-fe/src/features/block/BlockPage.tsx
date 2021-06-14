import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { getSingleBlock } from '../../api/block';
import { useAppSelector } from '../../app/hooks';
import { SearchAppBar } from '../../components/SearchHeader';
import { TransactionsActions } from '../../components/TransactionsActions';
import { clearBlock } from './blockSlice';
import BlockTable from './components/BlockTable';
import TransActions from './components/TransActions';

export const BlockPage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const block: any = useAppSelector((state) => state.block.block)
    const loading: any = useAppSelector((state) => state.block.loading)
    const status: any = useAppSelector((state) => state.block.status)


    const { hash }: any = params;

    useEffect(() => {
        dispatch(getSingleBlock(hash))
        return () => {
            dispatch(clearBlock())
        }
    }, [])

    const headings = [
        'Hash',
        'Confirmations',
        'TimeStamp',
        'Height',
        'Miner',
        'Number Of Transactions',
        'Difficulty',
        'Merkel root',
        'Version',
        'Bits',
        'Weight',
        'Size',
        'Nonce',
        'Transaction Volume',
        'Block Reward',
        'Fee Reward'
    ]

    const arrayOfValues = Object.keys(block).reduce((acc: any, curr) => {
        return [...acc, { [block[curr]]: block[curr] }]
    }, [])

    const arrayOfArrayValues = arrayOfValues.map((obj: any) => Object.values(obj))

    const values = arrayOfArrayValues.reduce((acc: any, curr: any) => acc.concat(curr), []).slice(0, 16)

    const arrayOfTransactions = block?.tx

    useEffect(() => {
        if (status.toLowerCase() === 'error') {
            history.push('/blocks')
        }
    }, [status])

    return (
        <>
            <SearchAppBar setPage={() => { }} searchTerm={''} setSearchTerm={() => { }} showSearchBar={false} />
            {!loading && status === 'done' && arrayOfValues ? (
                <>
                    <h3 style={{ marginLeft: 50 }}>BTC/BLOCK</h3>
                    <BlockTable headings={headings} values={values} />
                    <TransActions
                        page={page}
                        arrayOfTransactions={arrayOfTransactions}
                        rowsPerPage={rowsPerPage}
                        setPage={setPage}
                    />
                </>
            ) :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Loading page please wait...</p>
                </div>
            }
        </>
    )
}

export default BlockPage
