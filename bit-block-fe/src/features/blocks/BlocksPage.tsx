import React, { useEffect, useState } from 'react'
import { getBlocks, getSingleBlock } from '../../api/block'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { SearchAppBar } from '../../components/SearchHeader';
import { CustomPaginationActionsTable } from '../../components/Table'
import { IBlock } from './blocksSlice';

function BlocksPage() {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentTime, setCurrentTime] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useAppDispatch()

    const blocks: any = useAppSelector((state) => state.blocks.blocks)
    const loading = useAppSelector((state) => state.blocks.loading)
    const satus = useAppSelector((state) => state.blocks.status)

    const timestamp = useAppSelector((state) => state.blocks.timestamp)

    // const lastRetreivedMins = getMinutes(timestampMills)
    const lastRetreivedMins = timestamp.split(':')

    // all hashes that have already been serached for extra data
    const hashesOfDataReceived: string[] = useAppSelector((state) => state.blocks.hashesOfDataReceived)

    // the array of blocks that gets passed to our table
    const arrayOfBlocks: IBlock[] = Object.keys(blocks).map((obj: any) => blocks[obj])

    // create an array of hashes that are currently in the dom to be used to make individual api calls for each hash 
    let arrayOfHashes = Object.keys(blocks).map((hash) => hash).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    console.log(currentTime)
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

    return (
        <div>
            {loading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Loading page please wait...</p>
            </div>}
            {
                !loading && arrayOfBlocks.length > 0 &&
                <div>
                    <SearchAppBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} showSearchBar={true} />
                    <div style={{ padding: 30 }}>
                        <CustomPaginationActionsTable
                            showTablePagination={true}
                            page={page}
                            setPage={setPage}
                            setRowsPerPage={setRowsPerPage}
                            rowsPerPage={rowsPerPage}
                            rows={!searchTerm ? arrayOfBlocks : arrayOfBlocks.filter((block) => block.hash.includes(searchTerm))}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default BlocksPage
