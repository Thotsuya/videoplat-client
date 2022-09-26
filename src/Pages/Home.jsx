import {useEffect} from "react";
import {fetchVideos} from "../features/videos/videosActions";
import {useDispatch, useSelector} from "react-redux";
import {Button, Grid, Typography} from '@mui/material'
import VideoCard from "../components/VideoCard";
import {Link} from "react-router-dom";

export default function Home() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const {videos} = useSelector(state => state.videos);


    useEffect(() => {
        dispatch(fetchVideos());
    }, [])

    if (user.token) {
        return (
            <>
                <Typography variant="h4">
                    My Feed
                </Typography>

                <Button fullWidth sx={{ mt: 2 }} variant="contained" component={Link} to="/videos/create" color="primary">
                    Create Video
                </Button>

                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} mt={3}>
                    {videos && (
                        videos.map((video) => (
                            <VideoCard key={video.id} video={video}/>
                        ))
                    )}
                </Grid>
            </>
        );
    }

    return (
        <>
            <h1>Home</h1>
        </>
    );
}