import { Box, Center, HStack, Icon, Image, Text } from 'native-base';
import CheeriosLogo from '../assets/logos/CheeriosLogo';
import { logoLinks } from '../static/LogoLinks';

/**
 *
 * @param {object} props
 * @param {UserInfo} props.user
 * @param {UserInumbernfo} props.rank
 * @returns
 */
const TeamCard = (props) => {
    // Deconstruct
    const { user, rank } = props;

    return (
        <Box w={'100%'} maxW={'400px'} bg="gray.800" mb={1}>
            <HStack w={'100%'} h="3em" justifyContent={'space-evenly'}>
                <Text w={'10%'} alignSelf="center" textAlign={'center'}>
                    {rank}
                </Text>
                <Center w={'10%'}>{logoLinks[user.entry].logo}</Center>
                <Text w={'45%'} alignSelf="center" ml={2}>
                    {user.entry_name.toUpperCase()}
                </Text>
                <Text w={'35%'} alignSelf="center" fontWeight={100}>
                    {`${user.player_first_name} ${user.player_last_name}`}
                </Text>
            </HStack>
        </Box>
    );
};
export default TeamCard;

/**
 * @typedef UserInfo
 * @property {number} entry
 * @property {string} entry_name
 * @property {string} player_first_name
 * @property {string} player_last_name
 *
 */
