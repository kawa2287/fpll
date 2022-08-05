import { HStack } from 'native-base';
import React, { Fragment } from 'react';
import { linkList } from '../../../static/LinkList';
import { NavLink } from 'react-router-dom';

function HeaderDesktop() {
    return (
        <Fragment>
            <HStack alignItems="center" space={8} pr="20">
                {linkList.map((item, i) => (
                    <NavLink
                        key={item.title}
                        style={({ isActive }) =>
                            isActive ? activeStyle : inactiveStyle
                        }
                        to={item.path}
                    >
                        {item.title}
                    </NavLink>
                ))}
            </HStack>
        </Fragment>
    );
}

export default HeaderDesktop;

const activeStyle = {
    color: 'white',
};
const inactiveStyle = {
    color: 'gray',
};
