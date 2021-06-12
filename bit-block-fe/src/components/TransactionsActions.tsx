import React, { FunctionComponent } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import { StyledTransActionActions } from '../features/block/styles/block-page-styles.style';


interface IProps {
    page: number;
    setPage: (e: any) => any;
    arrayOfTransactions: any;
}

export const TransactionsActions: FunctionComponent<IProps> = ({ page, setPage, arrayOfTransactions }) => {
    return (
        <StyledTransActionActions>
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
                if (page === Math.round(arrayOfTransactions.length / 5)) return;
                setPage(page + 1)
            }} style={{ cursor: 'pointer', color: '#ffff', backgroundColor: '#376fff' }}>
                <ArrowForwardIosIcon />
            </button>
            <button onClick={() => setPage(Math.round(arrayOfTransactions.length / 5))} style={{ cursor: 'pointer', color: '#ffff', backgroundColor: '#376fff' }}>
                <LastPageIcon />
            </button>
        </StyledTransActionActions>
    )
}
