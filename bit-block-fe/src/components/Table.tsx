import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { AnyCnameRecord } from 'dns';
import { IBlock } from '../features/blocks/blocksSlice';
import TableHead from './TableHead';
import { Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

export interface IProps {
count: number;
page: number;
rowsPerPage: number;
onChangePage: (event: React.ChangeEvent, number: number) => void;
}

export const TablePaginationActions: FunctionComponent<IProps> = (props) => {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

  interface IPaginationActions {
    rows: IBlock[];
    page: number;
    rowsPerPage: number;
    setPage: (number: number) => void;
    setRowsPerPage: (number: number) => void;
    showTablePagination: boolean;
  }

export const CustomPaginationActionsTable: FunctionComponent<IPaginationActions> = ({ rows, page, rowsPerPage, showTablePagination, setPage, setRowsPerPage})  => {
  const classes = useStyles2();
  const history = useHistory();

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          <TableRow>
            <TableCell  align="center">
                Height
            </TableCell>
            <TableCell align="center">
                Hash
            </TableCell>
            <TableCell  align="center">
                TimeStamp
            </TableCell>
            <TableCell  align="center">
                Block Index
            </TableCell>
            <TableCell  align="center">
                Miner
            </TableCell>
          </TableRow>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => {
            const { hash, height, timestamp, block_index, miner} = row;

            const timestampArray = timestamp?.split('/');

            const customTimestamp = timestampArray?.join('-')

           return (
            <TableRow key={hash}>
                <TableCell style={{ width: 160 }} align="center">
                  {height}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  <Link component='button' onClick={() => history.push(`/block/${hash}`)}>
                    {hash}
                  </Link>
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {customTimestamp}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {block_index}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {miner}
                </TableCell>
              </TableRow>
           ) 
          })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        {showTablePagination &&
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              // @ts-ignore
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        }
      </Table>
    </TableContainer>
  );
}
