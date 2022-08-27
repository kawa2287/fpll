/**
 *
 * @param {*} set
 * @returns {API_fixtureResponse}
 */
export const GetFixtureResponse = async (set) => {
    try {
        const response = await fetch('/api/fixtures/');
        const result = await response.json();
        set({ fixtures: result, fixturesLoaded: true });
    } catch (error) {
        console.error(error);
    }
};
