import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getSingleBlock } from '../../api/block';
import { useAppSelector } from '../../app/hooks';
import { SearchAppBar } from '../../components/SearchHeader';
import { CustomPaginationActionsTable } from '../../components/Table';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import { clearBlock } from './blockSlice';
import ForwardIcon from '@material-ui/icons/Forward';

export const BlockPage = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const block: any = useAppSelector((state) => state.block.block)

    const { hash }: any = params;

    useEffect(() => {
        dispatch(getSingleBlock(hash))
        return () => {
            dispatch(clearBlock())
        }
    }, [])

    const menus = [
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

    const arrayOfTransActions = block?.tx

    // arrayOfTransActions?.map((tx: any) => console.log(tx.hash))

    return (
        <>
            <SearchAppBar searchTerm={''} setSearchTerm={() => { }} showSearchBar={false} />
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: 350 }}>
                        {menus.map((menu) => (
                            <div style={{ borderBottom: '1px solid #c2bbba', padding: 10 }}>{menu}</div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                        {values.map((value: any) => (
                            <div style={{ borderBottom: '1px solid #c2bbba', padding: 10 }}>{value}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <h3>Transactions</h3>
                {arrayOfTransActions && arrayOfTransActions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tx: any) => {
                    const date = new Date(tx.time)

                    const timeStringStamp = date.toLocaleDateString().split("/");

                    const timestamp = timeStringStamp.join("-");
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: 50 }}>
                                <p>Hash</p>
                                <p>Fee</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                <p>{tx.hash.slice(0, 8)}...</p>
                                <p>{(tx.fee / 1000000).toString().length <= 6 ? `${(tx.fee / 1000000)}0000` : '000'}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', marginTop: 20 }}>
                                <p><ForwardIcon /></p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', marginTop: 50 }}>
                                {tx?.out.map((t: any) => (
                                    <p>{t && t.addr && t.addr.slice(0, 5)}</p>
                                ))}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                <p>{timestamp}</p>
                                {tx.out.map((t: any) => (
                                    <p style={{ marginLeft: 10 }}>{t.value} BTC</p>
                                ))}
                            </div>
                        </div>
                    )
                })}
                <div>
                    <button onClick={() => setPage(0)} style={{ cursor: 'pointer', color: '#ffff', backgroundColor: '#376fff' }}>
                        <FirstPageIcon />
                    </button>
                    <button onClick={() => {
                        if (page === 0) return;
                        setPage(page - 1)
                    }
                    } style={{ cursor: `${page === 0 ? 'default' : 'pointer'}`, color: '#ffff', backgroundColor: '#376fff' }}>
                        <ArrowBackIosIcon />
                    </button>
                    <button onClick={() => {
                        if (page === Math.round(arrayOfTransActions.length / 5)) return;
                        setPage(page + 1)
                    }} style={{ cursor: 'pointer', color: '#ffff', backgroundColor: '#376fff' }}>
                        <ArrowForwardIosIcon />
                    </button>
                    <button onClick={() => setPage(Math.round(arrayOfTransActions.length / 5))} style={{ cursor: 'pointer', color: '#ffff', backgroundColor: '#376fff' }}>
                        <LastPageIcon />
                    </button>

                </div>
            </div>
        </>
    )
}

export default BlockPage
