import { Box } from '@mui/material'
import React from 'react'

export default function Footer() {
    return (
        <>
            <Box sx={{color:'gray', fontSize:'12px', textAlign:'center', paddingBottom:'10px'}}>
                Coded and designed by <a style={{color: 'dimgray'}} href="https://github.com/brandonlouis">Brandon Louis Chia</a>.
            </Box>
        </>
    )
}