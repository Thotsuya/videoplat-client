import {Box, Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import client from "../config/axios";
import useToasts from "../utils/useToasts";
import {fetchCreators} from "../features/creators/creatorsActions";


export default function CreatorsCard({creator}) {

    const {id} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const {info: InfoToast} = useToasts();

    const isFollowing = () => {
        return creator.followers.find((user) => user.id === id) !== undefined;
    }

    const followCreator = async () => {
        try {
            const response = await client.post(`/creators/${creator.id}/follow`);
            dispatch(fetchCreators());
            InfoToast(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }

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
                    <Typography variant="body2">
                        {creator.followers.length} Followers
                    </Typography>
                    <Typography variant="body2">
                        {creator.Videos.length} Videos
                    </Typography>
                    <Typography variant="body2">
                        {creator.likedVideos.length} Liked Videos
                    </Typography>


                </CardContent>
                <CardActions>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        {isFollowing() ? (
                            <Button variant="outlined" color={"error"} sx={{
                                padding: '0.7rem',
                            }} onClick={followCreator}>
                                <FaThumbsDown/>
                            </Button>

                        ) : (
                            <Button variant="outlined" color={"primary"} sx={{
                                padding: '0.7rem',
                            }} onClick={followCreator}>
                                <FaThumbsUp/>
                            </Button>
                        )}
                    </Box>
                </CardActions>
            </Card>
        </Grid>
    )
}