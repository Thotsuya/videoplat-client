import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchCreators} from "../../features/creators/creatorsActions";
import {useSelector} from "react-redux";
import {Grid, Typography} from "@mui/material";
import CreatorsCard from "../../components/CreatorsCard";

export default function CreatorsIndex() {

    const dispatch = useDispatch();
    const {creators} = useSelector(state => state.creators);

    useEffect(() => {
        dispatch(fetchCreators());
    }, []);


    return (
        <div>
            <Typography variant="h4">
                Content Creators
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} mt={3}>
                {creators && (
                    creators.map((creator) => (
                        <CreatorsCard key={creator.id} creator={creator}/>
                    ))
                )}
            </Grid>
        </div>
    )
}