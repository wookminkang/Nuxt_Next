'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface StorageChartProps {
  used: number;
  supply: number;
}

const COLORS = {
  used: '#a855f7', // purple-500
  available: '#d1d5db', // gray-300
};

export const StorageChart = ({ used, supply }: StorageChartProps) => {
  const available = supply - used;
  const data = [
    { name: '사용량', value: used },
    { name: '사용가능', value: available },
  ];

  return (
    <>
      <div className="h-48 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
              label={({ name }) => name}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.name === '사용량' ? COLORS.used : COLORS.available}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mb-4">
        <div className="text-2xl font-bold text-purple-500">{used.toFixed(2)} GB</div>
        <div className="text-sm text-gray-500 mt-1">{supply} GB</div>
      </div>
      <div className="flex gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span className="text-sm">사용</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <span className="text-sm">전체 (제공량)</span>
        </div>
      </div>
    </>
  );
};

