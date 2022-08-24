/**
 * @typedef API_GW_Picks
 * @property {null} active_chip
 * @property {object[]} automatic_subs
 * @property {number} automatic_subs.entry
 * @property {number} automatic_subs.element_in
 * @property {number} automatic_subs.element_out
 * @property {number} automatic_subs.event
 * @property {object} entry_history
 * @property {number} entry_history.event
 * @property {number} entry_history.points
 * @property {number} entry_history.total_points
 * @property {number} entry_history.rank
 * @property {number} entry_history.rank_sort
 * @property {number} entry_history.overall_rank
 * @property {number} entry_history.bank
 * @property {number} entry_history.value
 * @property {number} entry_history.event_transfers
 * @property {number} entry_history.event_transfers_cost
 * @property {number} entry_history.points_on_bench
 * @property {Picks[]} picks
 */

/**
 * @typedef Picks
 * @property {number} element
 * @property {number} position
 * @property {number} multiplier
 * @property {boolean} is_captain
 * @property {boolean} is_vice_captain
 */
