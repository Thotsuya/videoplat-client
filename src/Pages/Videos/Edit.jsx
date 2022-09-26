import client from "../../config/axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchVideos} from "../../features/videos/videosActions";
import useToasts from "../../utils/useToasts";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Box, Button, Checkbox, FormControlLabel, FormGroup, Paper, TextField, Typography} from "@mui/material";

export default function EditVideo() {

    const {id} = useParams();

    const [video, setVideo] = useState({});
    const [errors, setErrors] = useState({});
    const {error: ErrorToast, success} = useToasts();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        client.get(`/videos/${id}`)
            .then(res => {
                setVideo(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleChange = (e) => {
        setVideo({
            ...video,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            await client.put(`/videos/${id}`, video);
            success('Video Updated successfully');
            dispatch(fetchVideos());
            navigate('/');
        } catch (error) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.log(error.response.data);
            }
        }
    }

    return (
        <>
            <Typography variant="h4">
                Edit Video
            </Typography>
            <Paper component={"form"} onSubmit={handleSubmit} sx={{mt: 2, padding: 4}} elevation={4}>
                <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    autoFocus
                    name={"title"}
                    value={video.title}
                    onChange={handleChange}
                    error={!!errors.title}
                    helperText={errors.title}
                />
                <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    sx={{mt: 2}}
                    name={"description"}
                    value={video.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <TextField
                    fullWidth
                    label="Video URL"
                    variant="outlined"
                    sx={{mt: 2}}
                    name={"url"}
                    value={video.url}
                    type={"url"}
                    onChange={handleChange}
                    error={!!errors.url}
                    helperText={errors.url}
                />
                <FormGroup>
                    <FormControlLabel control={
                        <Checkbox checked={video.published} name={"published"} onChange={(e) => {
                            setVideo({
                                ...video,
                                published: e.target.checked
                            })
                        }} />} label="Published"/>
                </FormGroup>

                <Box sx={{mt: 2}}>
                    <Button type={"submit"} fullWidth variant="contained" color="primary">
                        Save
                    </Button>
                </Box>


            </Paper>
        </>
    );
}