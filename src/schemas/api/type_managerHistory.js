/**
 * @typedef API_ManagerHistory
 * @property {GameweekSnapshot[]} current
 * @property {object[]} past
 * @property {string} past.season_name
 * @property {number} past.total_points
 * @property {number} past.rank
 * @property {object[]} chips
 * @property {string} chips.name
 * @property {string} chips.time
 * @property {number} chips.event
 * @property {number} entry
 */

/**
 * @typedef GameweekSnapshot
 * @property {number} event
 * @property {number} points
 * @property {number} total_points
 * @property {number} rank
 * @property {number} rank_sort
 * @property {number} overall_rank
 * @property {number} bank
 * @property {number} value
 * @property {number} event_transfers
 * @property {number} event_transfers_cost
 * @property {number} points_on_bench
 */
