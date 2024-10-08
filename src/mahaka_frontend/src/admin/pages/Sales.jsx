import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const eventData = [
  { id: '01', name: 'Halloween Retreat', popularity: 68, color: '#00b8a9' },
  { id: '02', name: 'Disney Princess Pink Carnival', popularity: 59, color: '#00b4d8' },
  { id: '03', name: 'Circus Essentials', popularity: 18, color: '#b983ff' },
  { id: '04', name: 'Apple Event', popularity: 25, color: '#f4a261' },
];

const visitorData = [
  { month: 'Jan', Loyal: 300, New: 270 },
  { month: 'Feb', Loyal: 370, New: 290 },
  { month: 'Mar', Loyal: 350, New: 220 },
  { month: 'Apr', Loyal: 300, New: 180 },
  { month: 'May', Loyal: 250, New: 160 },
  { month: 'Jun', Loyal: 220, New: 220 },
  { month: 'Jul', Loyal: 290, New: 350 },
  { month: 'Aug', Loyal: 340, New: 370 },
  { month: 'Sep', Loyal: 310, New: 360 },
  { month: 'Oct', Loyal: 330, New: 340 },
  { month: 'Nov', Loyal: 280, New: 260 },
  { month: 'Dec', Loyal: 220, New: 140 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow rounded">
        <p className="text-sm font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Sales = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Today's Sales</h1>
          <p className="text-gray-500">Sales Summary</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-card text-blue-500 px-4 py-2 rounded-lg shadow">
          Export
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 ">
        {[
          { title: 'Total Today Income', value: '10,293', increase: '1.4%', icon: '📦' },
          { title: 'Total Visitors', value: '40,689', increase: '8.5%', icon: '👥' },
          { title: 'Total Ticket Sold', value: '40,689', increase: '8.5%', icon: '🎟️' },
        ].map((item, index) => (
          <div key={index} className=" p-6 rounded-lg shadow border-2 border-gray-200 bg-card">
            <h3 className="text-gray-500 font-medium">{item.title}</h3>
            <div className="flex justify-between items-center mb-4">
              <p className="text-3xl font-bold mb-2">{item.value}</p>
              <span className="text-6xl">{item.icon}</span>
            </div>
            <p className="text-green-500">
              <span>↑ {item.increase} Up from past week</span>
            </p>
          </div>
        ))}
      </div>

      {/* Top Events and Visitor Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Events Section */}
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-6">Top Events</h3>
          <div className="grid grid-cols-8 gap-4 text-gray-400 mb-4">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Name</div>
            <div className="col-span-3">Popularity</div>
            <div className="col-span-1 text-right">Sales</div>
          </div>
          {eventData.map((event) => (
            <div key={event.id} className="grid grid-cols-8 gap-4 items-center mb-5">
              <div className="col-span-1">{event.id}</div>
              <div className="col-span-3 ">{event.name}</div>
              <div className="col-span-3 relative">
                <div className="w-full bg-gray-100 rounded-full h-1">
                  <div
                    className="h-1 rounded"
                    style={{ width: `${event.popularity}%`, backgroundColor: event.color }}
                  ></div>
                </div>
              </div>
              <div className="col-span-1 text-right">
                <span
                  className="px-3 py-1 rounded font-medium inline-block"
                  style={{
                    backgroundColor: `${event.color}20`,
                    color: event.color,
                    border: `1px solid ${event.color}`,
                  }}
                >
                  {event.popularity}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Visitor Insights Section */}
        <div className=" p-6 rounded-lg shadow bg-card">
          <h3 className="text-2xl font-bold mb-6">Visitor Insights</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={visitorData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#888', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#888', fontSize: 12 }}
                domain={[0, 400]}
                ticks={[0, 100, 200, 300, 400]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} iconType="square" iconSize={8} />
              <Line
                type="monotone"
                dataKey="Loyal"
                stroke="#00b4d8"
                strokeWidth={3}
                dot={false}
                name="Loyal Customers"
              />
              <Line
                type="monotone"
                dataKey="New"
                stroke="#00b8a9"
                strokeWidth={3}
                dot={false}
                name="New Customers"
                activeDot={{ r: 8, fill: '#00b8a9', stroke: 'white', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Wahana Section */}
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-6">Top Wahana</h3>
          <div className="grid grid-cols-8 gap-4 text-gray-400 mb-4">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Name</div>
            <div className="col-span-3">Popularity</div>
            <div className="col-span-1 text-right">Sales</div>
          </div>
          {eventData.map((event) => (
            <div key={event.id} className="grid grid-cols-8 gap-4 items-center mb-5">
              <div className="col-span-1">{event.id}</div>
              <div className="col-span-3 ">{event.name}</div>
              <div className="col-span-3 relative">
                <div className="w-full bg-gray-100 rounded-full h-1">
                  <div
                    className="h-1 rounded"
                    style={{ width: `${event.popularity}%`, backgroundColor: event.color }}
                  ></div>
                </div>
              </div>
              <div className="col-span-1 text-right">
                <span
                  className="px-3 py-1 rounded font-medium inline-block"
                  style={{
                    backgroundColor: `${event.color}20`,
                    color: event.color,
                    border: `1px solid ${event.color}`,
                  }}
                >
                  {event.popularity}%
                </span>
              </div>
            </div>
          ))}
        </div>
        </div>
    </div>
  );
};

export default Sales;
