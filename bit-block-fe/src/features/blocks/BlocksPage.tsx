import React, { useEffect, useState } from 'react'
import { getBlocks } from '../../api/block'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { SearchAppBar } from '../../components/SearchHeader';
import { CustomPaginationActionsTable } from '../../components/Table'
import { IBlock } from './blocksSlice';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { clearErrorMsg } from '../block/blockSlice';


function BlocksPage() {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentTime, setCurrentTime] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [display, setDisplay] = useState('none')
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const dispatch = useAppDispatch()
    const history = useHistory()

    const blocks: any = useAppSelector((state) => state.blocks.blocks)
    const loading = useAppSelector((state) => state.blocks.loading)
    const status = useAppSelector((state) => state.blocks.status)
    const error = useAppSelector((state) => state.block.error)

    const timestamp = useAppSelector((state) => state.blocks.timestamp)

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    // const lastRetreivedMins = getMinutes(timestampMills)
    const lastRetreivedMins = timestamp.split(':')

    // all hashes that have already been serached for extra data
    const hashesOfDataReceived: string[] = useAppSelector((state) => state.blocks.hashesOfDataReceived)

    // the array of blocks that gets passed to our table
    const arrayOfBlocks: IBlock[] = Object.keys(blocks).map((obj: any) => blocks[obj])

    // create an array of hashes that are currently in the dom to be used to make individual api calls for each hash 
    let arrayOfHashes = Object.keys(blocks).map((hash) => hash).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    useEffect(() => {
        if (parseInt(currentTime[1]) - parseInt(lastRetreivedMins[1]) > 10 || !timestamp) {
            dispatch(getBlocks())
        }
    }, [currentTime])

    useEffect(() => {
        setInterval(() => setCurrentTime(new Date().toLocaleTimeString().split(':')), 10000)
    }, [])

    // this can be used if we want to get extra info for each hash thats is currently o the page but the block chain api limits to make calls
    // useEffect(() => {
    //     if(arrayOfHashes.length > 0) {
    //         arrayOfHashes.forEach((hash) => {
    //             // Checking here if the hash has been searched for already for the extra data
    //             //  then dependent on the condition the logic follows
    //           const foundHash =  searchedHashes.find((searchedHash) => searchedHash === hash) 
    //           if(foundHash) return;
    //             dispatch(getSingleBlock(hash))
    //         })
    //     }
    // }, [arrayOfHashes])

    useEffect(() => {
        if (error.toLowerCase() === 'error') {
            setModalIsOpen(true)
        }
    }, [error])


    const handleModalClose = () => {
        setModalIsOpen(false)
        dispatch(clearErrorMsg())
    }



    return (
        <div>
            {loading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Loading page please wait...</p>
            </div>}
            {
                !loading && arrayOfBlocks.length > 0 &&
                <div>
                    <Modal
                        isOpen={modalIsOpen}
                        //   onAfterOpen={afterOpenModal}
                        onRequestClose={() => handleModalClose()}
                        style={customStyles}
                        contentLabel="Error modal"
                    >
                        <span style={{ cursor: 'pointer', float: 'right' }} onClick={() => handleModalClose()} >X</span>
                        <p>Sorry block not found</p>
                        <p>Please check internet connection</p>
                    </Modal>
                    <SearchAppBar
                        setPage={setPage}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        showSearchBar={true}
                    />
                    <div style={{ width: '100%', padding: '30px 0px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <span><b>BLOCK EXPLORER</b></span>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid grey' }}>
                                <SearchIcon />
                                <input
                                    style={{ width: '600px', padding: 10, border: 'none' }}
                                    placeholder="Search…"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setPage(0)
                                        setSearchTerm(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <button style={{ padding: 10, marginLeft: 45 }} onClick={() => {
                            if (!searchTerm) return window.alert('Please enter a value')
                            if (!searchTerm.trim()) return window.alert('Can not search for empty values')
                            history.push(`block/${searchTerm.trim()}`)
                        }
                        }>Search</button>
                    </div>
                    <h2 style={{ marginLeft: 50 }}>LATEST BLOCKS</h2>
                    <div style={{ padding: 30 }}>
                        <CustomPaginationActionsTable
                            showTablePagination={true}
                            page={page}
                            setPage={setPage}
                            setRowsPerPage={setRowsPerPage}
                            rowsPerPage={rowsPerPage}
                            rows={!searchTerm ? arrayOfBlocks : arrayOfBlocks.filter((block) => block.hash.includes(searchTerm.trim()))}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default BlocksPage
