import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { StyledCoinHead } from '../styles';
import { FunctionComponent } from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearBlock } from '../features/block/blockSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);

interface IProps {
  searchTerm?: string;
  showSearchBar: boolean;
  setSearchTerm: (val: string) => any;
  setPage: (e: any) => any;
}

export const SearchAppBar: FunctionComponent<IProps> = ({ searchTerm, setSearchTerm, showSearchBar, setPage }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <AppBar style={{ paddingTop: 15, paddingBottom: 15 }} position="static">
        <Toolbar>
          <StyledCoinHead>$B</StyledCoinHead>
          <Typography className={classes.title} variant="h6" noWrap>
            BIT-BLOCK
          </Typography>
          <div className={classes.search}>
            {showSearchBar ?
              <>
                {/* <div className={classes.searchIcon}>
                  <SearchIcon />
                </div> */}
                {/* <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(e) => {
                    setPage(0)
                    setSearchTerm(e.target.value)
                  }}
                /> */}
              </>
              : <Link
                style={{ color: '#fff' }}
                component="button"
                // variant="body2"
                onClick={() => {
                  history.push('/blocks');
                  dispatch(clearBlock())
                }}
              >
                <NavigateBeforeIcon style={{ color: 'ffff' }} />
              </Link>
            }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
