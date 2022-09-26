import {Card, CardContent, Grid, Typography, Button} from "@mui/material";
import moment from "moment";
import {Link} from "react-router-dom";

export default function VideoCardAlt({video, edit = false}) {

    return (
        <Grid item xs={12} lg={3}>
            <Card sx={{minWidth: 275}} elevation={4}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {video.title}
                    </Typography>
                    <Typography variant="body2">
                        {video.description}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        Published on {moment(video.createdAt).format('DD MMM YYYY')}
                    </Typography>
                    {edit && (
                        <Button component={Link} to={`/videos/${video.id}/edit`} variant="contained" color="primary">
                            Edit
                        </Button>
                    )}
                </CardContent>
            </Card>
        </Grid>
    )
}