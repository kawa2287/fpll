import { Box, Center, HStack, Text, VStack } from 'native-base';
import { logoLinks } from '../../static/LogoLinks';

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
                <Center w={'15%'}>
                    {user.entry in logoLinks
                        ? logoLinks[user.entry].logo
                        : null}
                </Center>
                <VStack
                    w={'55%'}
                    ml={2}
                    alignItems={'center'}
                    justifyContent="center"
                >
                    <Text
                        alignSelf="start"
                        justifySelf={'center'}
                        fontSize="1em"
                    >
                        {user.entry_name.toUpperCase()}
                    </Text>
                    <Text
                        alignSelf="start"
                        fontWeight={100}
                        style={{ color: 'darkgray' }}
                        fontSize="0.8em"
                    >
                        {`${user.player_first_name} ${user.player_last_name}`}
                    </Text>
                </VStack>
                <Text
                    w={'20%'}
                    alignSelf="center"
                    textAlign={'center'}
                    fontSize="2xl"
                    fontWeight={500}
                >
                    0
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
