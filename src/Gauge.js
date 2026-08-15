import React from 'react';

function Gauge({ status, size = 100 }) {
  const colors = {
    ok: '#4cb782',
    'due soon': '#f2a93b',
    overdue: '#e5484d',
  };

  const color = colors[status] || colors.ok;
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const progressMap = {
    ok: 0.74,
    'due soon': 0.5,
    overdue: 0.84,
  };
  const progress = progressMap[status] || 0.74;
  const strokeDasharray = `${progress * circumference} ${circumference}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth="8"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={strokeDasharray}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

export default Gauge;