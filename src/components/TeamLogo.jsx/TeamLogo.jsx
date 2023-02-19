import React from 'react';
import { Link } from 'react-router-dom';
import { logoLinks } from '../../static/LogoLinks';
import '../../schemas/api/type_leagueResponse.js';

/**
 *
 * @param {object} props
 * @param {number} props.entry
 */
const TeamLogo = ({ entry, bg = null }) => {
    return (
        <Link
            to={`/teams/${entry}`}
            exact="true"
            style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                overflow: 'hidden',
                background: bg,
            }}
        >
            {entry in logoLinks ? logoLinks[entry].logo : null}
        </Link>
    );
};

export default TeamLogo;
