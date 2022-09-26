import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../features/user/userSlice";


const drawerWidth = 240;
const navItems = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Creators',
        path: '/creators'
    }
]

export default function Topbar({children}) {

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2}}>
                Video Platform
            </Typography>
            <Divider/>
            <List>
                {user.token ? (
                    navItems.map((item) => (
                        <ListItem key={item.name} disablePadding>
                            <ListItemButton component={Link} to={item.path} sx={{textAlign: 'center'}}>
                                <ListItemText primary={item.name}/>
                            </ListItemButton>
                        </ListItem>
                    ))
                ) : (
                    <>
                        {/*  To Home, Login and Register   */}
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/" sx={{textAlign: 'center'}}>
                                <ListItemText primary="Home"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/login" sx={{textAlign: 'center'}}>
                                <ListItemText primary="Login"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/register" sx={{textAlign: 'center'}}>
                                <ListItemText primary="Register"/>
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
                {user.token && (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleLogout} sx={{textAlign: 'center'}}>
                                <ListItemText primary="Logout"/>
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </List>

        </Box>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        Video Platform
                    </Typography>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        {user.token ? (
                            navItems.map((item) => (
                                <Button component={Link} to={item.path} key={item.name} sx={{color: '#fff'}}>
                                    {item.name}
                                </Button>
                            ))) : (
                            <>
                                <Button sx={{color: '#fff'}} component={Link} to="/login">
                                    Login
                                </Button>
                                <Button sx={{color: '#fff'}} component={Link} to="/register">
                                    Register
                                </Button>
                            </>
                        )}
                        {user.token && (
                            <Button onClick={handleLogout} sx={{color: '#fff'}}>Logout</Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{p: 3}}>
                <Toolbar/>
                {children}
            </Box>
        </>
    )
}
