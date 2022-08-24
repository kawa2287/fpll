import { useBootstrapStaticStore } from '../../states/BootstrapStatic';

/**
 *
 */
export const GetAllPlayers = async () => {
    const bootstrapStore = useBootstrapStaticStore();
    if (bootstrapStore) {
        return bootstrapStore.players;
    } else {
        return [];
    }
};

/**
 *
 * @param {number} playerID
 * @param {*} stat
 */
export const GetPlayerStat = async (playerID, stat) => {};
