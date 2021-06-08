import { TableCell } from '@material-ui/core'
import React, { FunctionComponent } from 'react'

interface IProps {
    headings: string[];
}

const TableHead: FunctionComponent<IProps> = ({headings}) => {
    return (
        <div>
            {headings.map((heading) => (
                <TableCell style={{ width: 160 }} align="right">
                    {heading}
                </TableCell>
            ))}
        </div>
    )
}

export default TableHead
