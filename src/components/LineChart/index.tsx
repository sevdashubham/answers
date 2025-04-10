// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Customized,
} from 'recharts';
import {DataPoint} from '@/types';
import CustomTooltip from './CustomTooltip';

interface LineChartProps {
    data: DataPoint[];
    currentMonth: string;
    chartMetric?: string;
}

const LineChart: React.FC<LineChartProps> = ({
                                                 data,
                                                 currentMonth,
                                                 chartMetric = "Unsatisfied Demand %"
                                             }) => {
    // Find the peak value for special styling
    const peakValue = Math.max(...data.map(item => item.value));
    const peakMonth = data.find(item => item.value === peakValue)?.month;

    // Ensure we only display 7 months at a time
    const displayData = data.slice(0, 7);

    const [tickPositions, setTickPositions] = useState([]);
    const horizontalCoordinatesGenerator = () => {
        return tickPositions;
    };

    // Custom tick component that captures the tick positions
    const CustomYAxisTick = (props: {
        x: number;
        y: number;
        payload: {
            value: number;
        }
    }) => {
        const {x, y, payload} = props;

        useEffect(() => {
            // When the tick renders, add its position to our state if not already there
            setTickPositions((prevPositions: any) => {
                if (!prevPositions.includes(y)) {
                    return [...prevPositions, y].sort((a, b) => a - b);
                }
                return prevPositions;
            });
        }, [y]);

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={-3} y={0} dy={0} textAnchor="end" fill="#fff">{`$${payload.value / 1000}K`}</text>
            </g>
        );
    };

    // @ts-ignore
    return (
        <div className="bg-[#222324] border border-[#525252] rounded-[5px] pt-4 pr-6 w-full">
            {/* Header with dropdown */}
            <div className="flex justify-end py-3 px-4">
                <button
                    className="border border-[#5A5A5A] text-sm text-white bg-[#242424] px-3 py-1 rounded-md flex items-center">
                    {chartMetric}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>
            </div>

            {/* Chart container with fixed height to ensure nothing is cut off */}
            <div className="h-[28rem] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                        data={displayData}
                        margin={{top: 20, right: 30, left: 50, bottom: 30}}
                    >
                        {/* Custom cartesian grid with many vertical lines */}
                        <CartesianGrid
                            stroke="#343434"
                            strokeOpacity={0.8}
                            horizontal={true}
                            vertical={false}
                            horizontalCoordinatesGenerator={horizontalCoordinatesGenerator}
                        />

                        <Customized
                            component={({ xAxisMap, yAxisMap, data }) => {
                                const xAxis = xAxisMap[Object.keys(xAxisMap)[0]];
                                const yAxis = yAxisMap[Object.keys(yAxisMap)[0]];

                                return (
                                    <>
                                        {data.map((entry: any, index: number) => {
                                            const x = xAxis.scale(entry[xAxis.dataKey]);
                                            const y = yAxis.scale(entry.value); // y value of the data point
                                            const yBottom = yAxis.y + yAxis.height; // bottom of chart (x-axis)

                                            return (
                                                <line
                                                    key={`vline-${index}`}
                                                    x1={x}
                                                    y1={y}
                                                    x2={x}
                                                    y2={yBottom}
                                                    stroke="#8AA14F33"
                                                    strokeWidth={3}
                                                    opacity={0.8}
                                                />
                                            );
                                        })}
                                    </>
                                );
                            }}
                        />

                        {/* X-axis with custom styling */}
                        <XAxis
                            dataKey="month"
                            axisLine={true}
                            tickLine={false}
                            tick={(props) => {
                                const {x, y, payload} = props;
                                const isCurrentMonth = payload.value === currentMonth;

                                return (
                                    <g transform={`translate(${x},${y})`}>
                                        <text x={0} y={0} dy={16} textAnchor="middle" fill="#fff">
                                            {payload.value}
                                        </text>
                                        {isCurrentMonth && (
                                            <text x={0} y={16} dy={16} textAnchor="middle" fontSize={12} fill="#878787">
                                                Now
                                            </text>
                                        )}
                                    </g>
                                );
                            }}
                            tickMargin={10}
                        />

                        {/* Y-axis with equal gap currency formatting */}
                        <YAxis
                            ticks={[20000, 40000, 60000, 80000, 100000]}
                            domain={[0, 100000]}
                            axisLine={true}
                            tickLine={false}
                            tick={(props) => {
                                const {x, y, payload} = props;
                                return <CustomYAxisTick x={x} y={y} payload={payload}/>;
                            }}
                            width={50}
                            tickMargin={10}
                        />

                        {/* Custom tooltip */}
                        <Tooltip
                            content={<CustomTooltip/>}
                            cursor={false}
                        />

                        {/* Reference lines for data points - light gray for regular points */}
                        {displayData.map((point) => {
                            const isCurrentMonth = point.month === currentMonth;
                            if (isCurrentMonth) {
                                return <ReferenceLine
                                    key={`ref-${point.month}`}
                                    x={point.month}
                                    stroke="#555"
                                    strokeDasharray="3 3"
                                    strokeWidth={1}
                                    opacity={0.5}
                                    ifOverflow="extendDomain"
                                />
                            }
                        })}

                        {/* Special reference line for peak point - same color as the line chart */}
                        {peakMonth && (
                            <ReferenceLine
                                x={peakMonth}
                                stroke="#C8E972"
                                strokeDasharray="5 5"
                                strokeWidth={2}
                                opacity={0.8}
                                ifOverflow="extendDomain"
                            />
                        )}

                        {/* Straight line chart */}
                        <Line
                            type="linear"
                            dataKey="value"
                            stroke="#C8E972"
                            strokeWidth={3}
                            dot={(props) => {
                                const {cx, cy, payload} = props;

                                // Check if this is the peak point
                                const isPeak = payload.value === peakValue;

                                if (isPeak) {
                                    return (
                                        <circle
                                            cx={cx}
                                            cy={cy}
                                            r={isPeak ? 6 : 4}
                                            fill="#C8E972"
                                            filter={"url(#glow)"}
                                        />)
                                }
                                return <></>;
                            }}
                            activeDot={{r: 6, fill: "#C8E972"}}
                            connectNulls={true}
                        />

                        {/* Filter for glow effect on peak point */}
                        <defs>
                            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                    </RechartsLineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LineChart;
