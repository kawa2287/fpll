/**
 * @typedef API_LeageResponse
 * @property {object} new_entries
 * @property {boolean} new_entries.has_next
 * @property {number} new_entries.page
 * @property {} new_entries.results
 * @property {string} last_updated_data
 * @property {object} league
 * @property {number} league.id
 * @property {string} league.name
 * @property {string} league.created
 * @property {boolean} league.closed
 * @property {null} league.max_entries
 * @property {string} league.league_type
 * @property {string} league.scoring
 * @property {number} league.admin_entry
 * @property {number} league.start_event
 * @property {string} league.code_privacy
 * @property {boolean} league.has_cup
 * @property {null} league.cup_league
 * @property {null} league.rank
 * @property {object} standings
 * @property {boolean} standings.has_next
 * @property {number} standings.page
 * @property {Manager[]} standings.results
 */

/**
 * @typedef Manager
 * @property {number} id
 * @property {number} event_total
 * @property {string} player_name
 * @property {number} rank
 * @property {number} last_rank
 * @property {number} rank_sort
 * @property {number} total
 * @property {number} entry
 * @property {string} entry_name
 */
