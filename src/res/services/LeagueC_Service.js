export const SetPotInfo = (managers, buyInPerTeam, set) => {
    //console.log(managers);
    set({ totalPot: managers.length * buyInPerTeam });
};
