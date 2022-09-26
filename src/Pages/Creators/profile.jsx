import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCreator} from "../../features/creators/creatorsActions";
import {Grid, Paper, Typography} from '@mui/material'
import VideoCardAlt from "../../components/VideoCardAlt";
import CreatorsCardAlt from "../../components/CreatorsCardAlt";

export default function CreatorProfile() {

    const dispatch = useDispatch();
    const {creator} = useSelector(state => state.creators);
    const {id} = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchCreator(id));
    }, [])

    if (creator) {
        return (
            <>
                <Typography variant="h4">
                    {creator.name}
                </Typography>

                <Paper elevation={4} sx={{p: 2, mt: 2}}>
                    <Typography variant="body1">
                        {creator.email}
                    </Typography>
                </Paper>

                <Paper elevation={4} sx={{p: 2, mt: 2}}>
                    <Typography variant="body1">
                        {creator.followers?.length} Followers
                    </Typography>
                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} mt={3}>
                        {creator.followers && (
                            creator.followers.map((creator) => (
                                <CreatorsCardAlt key={creator.id} creator={creator}/>
                            ))
                        )}
                    </Grid>
                </Paper>

                <Paper elevation={4} sx={{p: 2, mt: 2}}>
                    <Typography variant="body1">
                        {creator.Videos?.length} Videos
                    </Typography>
                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} mt={3}>
                        {creator.Videos && (
                            creator.Videos.map((video) => (
                                <VideoCardAlt edit key={video.id} video={video}/>
                            ))
                        )}
                    </Grid>
                </Paper>

                <Paper elevation={4} sx={{p: 2, mt: 2}}>
                    <Typography variant="body1">
                        {creator.likedVideos?.length} Liked Videos
                    </Typography>
                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} mt={3}>
                        {creator.likedVideos && (
                            creator.likedVideos.map((video) => (
                                <VideoCardAlt key={video.id} video={video}/>
                            ))
                        )}
                    </Grid>
                </Paper>


            </>
        );
    }

    return (
        <>
            <h1>Creator Profile</h1>
        </>
    );
}