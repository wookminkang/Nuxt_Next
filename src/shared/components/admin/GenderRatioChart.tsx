'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface GenderRatioChartProps {
  manCnt: number;
  womanCnt: number;
}

const COLORS = {
  man: '#14b8a6', // teal-500
  woman: '#f97316', // orange-500
};

export const GenderRatioChart = ({ manCnt, womanCnt }: GenderRatioChartProps) => {
  const data = [
    { name: '남자', value: manCnt },
    { name: '여자', value: womanCnt },
  ];

  const total = manCnt + womanCnt;

  return (
    <div className="h-48 mb-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.name === '남자' ? COLORS.man : COLORS.woman}
              />
            ))}
          </Pie>
          {/* <Tooltip
            formatter={(value: number) => [`${value}명`, '']}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '4px',
            }}
          /> */}
        </PieChart>
      </ResponsiveContainer>
      <div className="flex gap-4 justify-center mt-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-teal-500 rounded"></div>
          <span className="text-sm">남자</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span className="text-sm">여자</span>
        </div>
      </div>
    </div>
  );
};

