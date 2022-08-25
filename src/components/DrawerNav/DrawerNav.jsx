import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useSideBarToggleStore } from '../../states/store_SideBarToggle';
import { linkList } from '../../static/LinkList';
import { Link } from 'react-router-dom';

const DrawerNavigation = () => {
    // Bind State
    const showSideBar = useSideBarToggleStore((state) => state.showSideBar);
    const setShowSideBarFalse = useSideBarToggleStore(
        (state) => state.setShowSideBarFalse,
    );

    const list = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setShowSideBarFalse()}
            onKeyDown={() => setShowSideBarFalse()}
        >
            <List>
                {linkList.map((item, index) => (
                    <ListItem key={item.title} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <Link to={item.path} style={{ color: 'white' }}>
                                <ListItemText primary={item.title} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Drawer
                anchor={'right'}
                open={showSideBar}
                onClose={() => setShowSideBarFalse()}
                SlideProps={{
                    style: { background: 'darkslategray', color: 'white' },
                }}
            >
                {list}
            </Drawer>
        </div>
    );
};

export default DrawerNavigation;
