import React, { FunctionComponent } from 'react'
import { StyledSingleBlock } from '../styles/block-page-styles.style'

interface IProps {
    headings: string[];
    values: string[];
}

const BlockTable: FunctionComponent<IProps> = ({ headings, values }) => {
    return (
        <StyledSingleBlock>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: 350 }}>
                    {headings.map((menu) => (
                        <div style={{ borderBottom: '1px solid #c2bbba', padding: 10 }}>{menu}</div>
                    ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                    {values.map((value: any) => (
                        <div style={{ borderBottom: '1px solid #c2bbba', padding: 10 }}>{value}</div>
                    ))}
                </div>
            </div>
        </StyledSingleBlock>
    )
}

export default BlockTable
