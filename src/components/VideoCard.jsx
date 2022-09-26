import {Box, Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {useEffect} from "react";
import moment from "moment";
import {useSelector} from "react-redux";
import {FaThumbsUp, FaThumbsDown} from "react-icons/fa";
import client from "../config/axios";
import useToasts from "../utils/useToasts";
import {useDispatch} from "react-redux";
import {fetchVideos} from "../features/videos/videosActions";


export default function VideoCard({video}) {

    useEffect(() => {
        //console.log(video);
    }, [])

    const {id} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const {info : InfoToast} = useToasts();

    const isLiked = () => {
        return video.likedBy.find((user) => user.id === id) !== undefined;
    }

    const likeVideo = async () => {
        try {
            const response = await client.post(`/videos/${video.id}/like`);
            dispatch(fetchVideos());
            InfoToast(response.data.message);
        }catch (error) {
            console.log(error);
        }
    }

    return (
        <Grid item xs={6} lg={3}>
            <Card sx={{minWidth: 275}} elevation={4}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {video.title}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        By {video.User.name}
                    </Typography>
                    <Typography variant="body2">
                        {video.description}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        Published on {moment(video.createdAt).format('DD MMM YYYY')}
                    </Typography>

                    <Typography variant="body2">
                        {video.likedBy.length} Likes
                    </Typography>

                </CardContent>
                <CardActions>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        {isLiked() ? (
                            <Button variant="outlined" color={"error"} sx={{
                                padding: '0.7rem',
                            }} onClick={likeVideo}>
                                <FaThumbsDown/>
                            </Button>

                        ) : (
                            <Button variant="outlined" color={"primary"} sx={{
                                padding: '0.7rem',
                            }} onClick={likeVideo}>
                                <FaThumbsUp/>
                            </Button>
                        )}
                    </Box>
                </CardActions>
            </Card>
        </Grid>
    )
}