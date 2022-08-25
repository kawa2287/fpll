import React, { Fragment } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Center, Heading } from 'native-base';
import './TableStyle.css';
import { logoLinks } from '../../static/LogoLinks';

/**
 *
 * @param {object} props
 * @param {string} props.stat
 * @param {string} props.statLabel
 * @param {string} props.title
 * @param {number} props.gameweeks
 * @param {{manager:Object,stats:StatObject}[]} props.managerStats
 * @returns
 */
const LeaderboardTable = (props) => {
    const { stat, statLabel, title, managerStats, gameweeks } = props;

    if (managerStats.length > 0) {
        const rows = GenerateData(managerStats, stat);

        return (
            <Fragment>
                <Heading>{title}</Heading>
                <TableContainer component={Paper} style={s.table}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: '5%' }}>
                                    Rank
                                </TableCell>
                                <TableCell style={{ width: '5%' }}>
                                    Logo
                                </TableCell>
                                <TableCell style={{ width: '70%' }}>
                                    Team
                                </TableCell>
                                <TableCell style={{ width: '10%' }}>
                                    {statLabel}
                                </TableCell>
                                <TableCell style={{ width: '10%' }}>
                                    {'WkAvg'}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, i) => (
                                <TableRow
                                    key={row.manager.entry + stat}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                        color: 'white',
                                    }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        style={{ color: 'gold' }}
                                    >
                                        {i + 1}
                                    </TableCell>
                                    <TableCell>
                                        <Center w={'100%'}>
                                            {logoLinks[row.manager.entry].logo}
                                        </Center>
                                    </TableCell>
                                    <TableCell>
                                        {row.manager.entry_name}
                                    </TableCell>
                                    <TableCell>
                                        {row.stats[stat].toFixed(0)}
                                    </TableCell>
                                    <TableCell>
                                        {(row.stats[stat] / gameweeks).toFixed(
                                            2,
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Fragment>
        );
    } else {
        return null;
    }
};

export default LeaderboardTable;

const s = {
    table: {
        background: 'rgba(0, 0, 0, 0.1)',
    },
};

/**
 *
 * @param {{manager:Object,stats:StatObject}[]} managerStats
 * @param {string} stat
 * @return {{manager:Object,stats:StatObject}[]}
 */
const GenerateData = (managerStats, stat) => {
    let statArray = [];
    if (managerStats.length > 0) {
        statArray = managerStats.sort((a, b) => b.stats[stat] - a.stats[stat]);
    }
    return statArray;
};

/*
{rows.map((row) => (
    <TableRow
        key={row.name}
        sx={{
            '&:last-child td, &:last-child th': {
                border: 0,
            },
        }}
    >
        <TableCell component="th" scope="row">
            {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
    </TableRow>
))}
*/
