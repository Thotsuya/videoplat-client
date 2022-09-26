import {configureStore,} from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import videosReducer from "../features/videos/videosSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        videos: videosReducer,

    },
})

export default store