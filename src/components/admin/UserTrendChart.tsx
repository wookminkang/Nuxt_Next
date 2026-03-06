'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PeriodData {
  period: string;
  regCnt: number;
  visitTot: number | null;
  visitCnt: number;
}

interface UserTrendChartProps {
  data: PeriodData[];
}

export const UserTrendChart = ({ data }: UserTrendChartProps) => {
  // 날짜 포맷팅 (2026.01.13 형식으로 변환)
  const formattedData = data.map((item) => ({
    ...item,
    date: item.period ? item.period.replace(/-/g, '.').substring(0, 10) : item.period,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={formattedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="date"
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
        />
        <YAxis
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '4px',
          }}
        />
        <Legend
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="square"
        />
        <Line
          type="monotone"
          dataKey="visitCnt"
          name="방문자"
          stroke="#60a5fa"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="regCnt"
          name="가입자"
          stroke="#a78bfa"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

