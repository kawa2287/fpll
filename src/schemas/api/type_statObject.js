/**
 * @typedef API_StatInstance
 * @property {number} id
 * @property {StatObject} stats
 * @property {object[]} explain
 * @property {number} explain.fixture
 * @property {object[]} explain.stats
 * @property {string} explain.stats.identifier
 * @property {number} explain.stats.points
 * @property {number} explain.stats.value
 */

/**
 * @typedef StatObject
 * @property {number} minutes
 * @property {number} goals_scored
 * @property {number} assists
 * @property {number} clean_sheets
 * @property {number} goals_conceded
 * @property {number} own_goals
 * @property {number} penalties_saved
 * @property {number} penalties_missed
 * @property {number} yellow_cards
 * @property {number} red_cards
 * @property {number} saves
 * @property {number} bonus
 * @property {number} bps
 * @property {string} influence
 * @property {string} creativity
 * @property {string} threat
 * @property {string} ict_index
 * @property {number} total_points
 * @property {boolean} in_dreamteam
 */
