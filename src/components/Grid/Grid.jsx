import React from 'react';
import Box from '@mui/material/Box';
import Card2 from "../../components/Card/Card";
import Grid from '@mui/material/Unstable_Grid2';



export default function BasicGrid({ data }) {
    return (
        <Box sx={{ flexGrow: 1, marginLeft: '10%', marginRight: '10%' }}>
            <Grid container spacing={3}>
                {data.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                        <Card2 item={item} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}