import {configureStore,} from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import videosReducer from "../features/videos/videosSlice";
import creatorsReducer from "../features/creators/creatorsSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        videos: videosReducer,
        creators: creatorsReducer,
    },
})

export default store