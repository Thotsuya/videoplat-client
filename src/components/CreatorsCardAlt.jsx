import {Card, CardContent, Grid, Typography} from "@mui/material";


export default function CreatorsCardAlt({creator}) {

    return (
        <Grid item xs={12} lg={3}>
            <Card sx={{minWidth: 275}} elevation={4}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {creator.name}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {creator.email}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}