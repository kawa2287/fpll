import { HStack, IconButton } from 'native-base';
import React from 'react';
import { colorThemes } from '../../../styling/themes';
import MenuIcon from '@mui/icons-material/Menu';
import { useSideBarToggleStore } from '../../../states/SideBarToggle';

function HeaderMobile(props) {
    // Bind State
    const showSideBar = useSideBarToggleStore((state) => state.showSideBar);
    const setShowSideBarFalse = useSideBarToggleStore(
        (state) => state.setShowSideBarFalse,
    );
    const setShowSideBarTrue = useSideBarToggleStore(
        (state) => state.setShowSideBarTrue,
    );

    // Set Toggle State
    const SetDrawerToggleState = (showSideBar) => {
        // Get the State Functions

        if (showSideBar) {
            // make false
            setShowSideBarFalse();
        } else {
            // make true
            setShowSideBarTrue();
        }
    };

    return (
        <HStack alignItems="center">
            <IconButton
                icon={<MenuIcon style={{ color: colorThemes.brand.light }} />}
                onPress={() => SetDrawerToggleState(showSideBar)}
            />
        </HStack>
    );
}

export default HeaderMobile;
