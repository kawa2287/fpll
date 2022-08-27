import { Box, Center, HStack, Text, VStack } from 'native-base';
import { logoLinks } from '../../static/LogoLinks';
import TeamLogo from '../TeamLogo.jsx/TeamLogo';

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
        <Box
            bg="gray.800"
            mb={1}
            borderColor={'darkslategray'}
            borderWidth={'1'}
        >
            <HStack w={'100%'} h="3.5em">
                <Text
                    w={'10%'}
                    alignSelf="center"
                    textAlign={'center'}
                    fontSize="lg"
                    fontWeight={100}
                >
                    {rank}
                </Text>
                <Text
                    w={'5%'}
                    alignSelf="center"
                    textAlign={'center'}
                    fontSize="lg"
                    fontWeight={100}
                    style={{ color: DetermineMovement(user).color }}
                >
                    {DetermineMovement(user).char}
                </Text>
                <Center w={'15%'}>
                    <TeamLogo entry={user.entry} />
                </Center>
                <VStack
                    w={'45%'}
                    ml={2}
                    alignItems={'center'}
                    justifyContent="center"
                >
                    <Text
                        alignSelf="start"
                        justifySelf={'center'}
                        fontSize="0.8em"
                    >
                        {user.entry_name.toUpperCase()}
                    </Text>
                    <Text
                        alignSelf="start"
                        fontWeight={100}
                        style={{ color: 'darkgray' }}
                        fontSize="0.6em"
                    >
                        {`${user.player_name} `}
                    </Text>
                </VStack>
                <Text
                    w={'12.5%'}
                    alignSelf="center"
                    textAlign={'center'}
                    fontSize="1.1em"
                    fontWeight={100}
                    style={{ color: 'lightblue' }}
                >
                    {user.event_total}
                </Text>
                <Text
                    w={'12.5%'}
                    alignSelf="center"
                    textAlign={'center'}
                    fontSize="1.1em"
                    fontWeight={500}
                    style={{ color: 'gold' }}
                >
                    {user.total}
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

const DetermineMovement = (user) => {
    if (user.rank > user.last_rank) {
        return { char: '▼', color: 'red' };
    } else if (user.rank < user.last_rank) {
        return { char: '▲', color: 'lightgreen' };
    } else {
        return { char: '-', color: 'white' };
    }
};
