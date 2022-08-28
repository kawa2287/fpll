/**
 *
 * @param {number} rounds
 * @param {Manager[]} managers
 * @returns {LeagueB_WeekMatchups[]}
 */
export const RoundRobinCreator = (rounds, managers) => {
    let leftArray = [];
    let rightArray = [];
    if (managers) {
        // Sort managers by entry
        managers = managers.sort((a, b) => b.entry - a.entry);
        console.log(managers);
        for (let i = 0; i < managers.length; i++) {
            if (i % 2 === 0) {
                leftArray.push(managers[i]);
            } else {
                rightArray.push(managers[i]);
            }
        }

        // Add in 'BYE' if necessary
        if (leftArray.length !== rightArray.length) {
            rightArray.push('BYE');
        }

        // Init a master array to hold all the matchups
        let masterMatchups = [];
        let currentGameweek = 1;

        for (let x = 0; x < rounds; x++) {
            // Do one round robin
            for (let n = 0; n < leftArray.length * 2 - 1; n++) {
                let matchups = [];

                // remove 1 from array
                let anchor = leftArray.shift(); // Removes 1 from left array
                let shifted = leftArray.shift(); // Remove next element in line;

                // pop last element of right array
                let popped = rightArray.pop();

                // add element to beginning of right array
                rightArray.unshift(shifted);

                // Push popped element to left array
                leftArray.push(popped);

                // Add back in the 1 to the left array;
                leftArray.unshift(anchor);

                // Add matchups
                for (let j = 0; j < leftArray.length; j++) {
                    matchups.push({
                        managers: [leftArray[j], rightArray[j]],
                        teamA_entry: leftArray[j].entry,
                        teamB_entry: rightArray[j].entry,
                        teamA_score: '',
                        teamB_score: '',
                        winner_entry: null,
                        loser_entry: null,
                    });
                }

                // Add matchups to masterMatchups
                masterMatchups.push({
                    gameweek: currentGameweek,
                    matchups: matchups,
                });

                // Increment
                currentGameweek += 1;
            }
        }
        return masterMatchups;
    } else {
        return [];
    }
};
