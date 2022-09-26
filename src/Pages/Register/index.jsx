import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useDispatch} from 'react-redux';
import client from '../../config/axios';
import {login} from '../../features/user/userSlice';
import {useNavigate} from 'react-router-dom';
import useToasts from '../../utils/useToasts';

const theme = createTheme();

export default function Register() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        profileImage: "",
        password_confirmation: "",
        role: "student"
    });

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error : ErrorToast} = useToasts();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({});
        try {
            const response = await client.post('/register', user);
            dispatch(login(response.data));
            navigate('/');
        }catch (error) {
            if(error.response.status === 422) {
                setErrors(error.response.data.errors);
            }else{
                ErrorToast(error.response.data);
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            onChange={handleChange}
                            autoComplete="name"
                            autoFocus
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={handleChange}
                            autoComplete="email"
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handleChange}
                            autoComplete="current-password"
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password_confirmation"
                            label="Password Confirmation"
                            type="password"
                            id="password_confirmation"
                            onChange={handleChange}
                            autoComplete="current-password"
                            error={!!errors.password_confirmation}
                            helperText={errors.password_confirmation}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="profileImage"
                            label="Profile Image URL"
                            type="url"
                            id="profileImage"
                            onChange={handleChange}
                            error={!!errors.profileImage}
                            autoComplete="current-password"
                            helperText={errors?.profileImage}
                        />
                        <Box sx={{minWidth: 120, mt: 2}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Role"
                                    name="role"
                                    value={user.role}
                                    error={!!errors.role}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"student"}>Student</MenuItem>
                                    <MenuItem value={"teacher"}>Teacher</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/login">
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}