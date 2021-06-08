import React, { useEffect } from 'react'
import { getBlocks, getSingleBlock } from '../../api/block'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { CustomPaginationActionsTable } from '../../components/Table'

function BlocksPage() {

    const dispatch = useAppDispatch()

    const blocks = useAppSelector((state) => state.blocks.blocks)

    useEffect(() => {
        dispatch(getBlocks())
        // return () => {
        //     cleanup
        // }
    }, [])

    return (
        <div>
            <CustomPaginationActionsTable rows={blocks} />
        </div>
    )
}

export default BlocksPage
