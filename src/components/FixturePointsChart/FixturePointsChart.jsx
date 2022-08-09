import React from 'react';
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const FixturePointsChart = (props) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                layout="vertical"
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Bar
                    dataKey="pv"
                    stackId="a"
                    fill="#8884d8"
                    isAnimationActive={false}
                />
                <Bar
                    dataKey="uv"
                    stackId="a"
                    fill="#82ca9d"
                    isAnimationActive={false}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default FixturePointsChart;

const data = [
    {
        name: 'Team A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Team B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Team C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Team D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Team E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Team F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Team G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
