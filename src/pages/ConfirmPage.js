import { Grid } from '@material-ui/core'
import React from 'react'
import ConfirmPlan from '../components/ConfirmPlan'

function ConfirmPage() {
    return (
        <div>
            <Grid container spacing={2} direction="column" justify="center">
                <Grid item xs={2}>
                    <ConfirmPlan/>
                </Grid>

                <Grid item xs={2}>
                    <ConfirmPlan/>
                </Grid>
                
            </Grid>
            

        </div>
    )
}

export default ConfirmPage
