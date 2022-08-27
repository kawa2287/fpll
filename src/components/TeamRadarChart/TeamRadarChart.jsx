import React from 'react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from 'recharts';

const data = [
    {
        subject: 'FWD',
        A: 120,
        B: 110,
        fullMark: 150,
    },
    {
        subject: 'MID',
        A: 98,
        B: 130,
        fullMark: 150,
    },
    {
        subject: 'DEF',
        A: 86,
        B: 130,
        fullMark: 150,
    },
];

const TeamRadarChart = (props) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                    name="Mike"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.5}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
};

export default TeamRadarChart;
