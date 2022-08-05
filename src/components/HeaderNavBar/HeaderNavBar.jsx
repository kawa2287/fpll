import { HStack, Text, Box, StatusBar } from 'native-base';
import { useScreenTypeStore } from '../../states/ScreenQuery';
import HeaderDesktop from './desktop/HeaderDesktop';
import HeaderMobile from './mobile/HeaderMobile';

/**
 * This is the app main header component.  There will be a breakpoint for mobile vs desktop.
 * The Mobile version will have a side drawer with the routing options.
 * THe Desktop version will have a nav bar with links for routing options.
 *
 * These will all need to be authenticated and determine if the user is logged in/
 * has permission to access
 *
 * @param {object} props
 * @returns
 */
const HeaderNavBar = (props) => {
    // Bind Screen Size
    const screenType = useScreenTypeStore((state) => state.screenType);

    let headerContents = null;
    if (screenType === 'desktop') {
        headerContents = <HeaderDesktop />;
    } else if (screenType === 'mobile') {
        headerContents = <HeaderMobile />;
    }

    return (
        <Box w={'100%'} shadow="5">
            <StatusBar bg="#3700B3" barStyle="dark-content" />
            <Box safeAreaTop />
            <HStack
                bg="brand.dark"
                px="1"
                py="3"
                justifyContent="space-between"
                alignItems="center"
                w="100%"
                h={60}
            >
                <HStack pl="2" space={3}>
                    <Text fontSize="20" fontWeight="100">
                        Fantasy Premiere League League
                    </Text>
                </HStack>
                {headerContents}
            </HStack>
        </Box>
    );
};

export default HeaderNavBar;
