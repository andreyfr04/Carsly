import React from 'react';

function Gauge({ status, size = 100 }) {
  const colors = {
    ok: '#4cb782',
    'due soon': '#f2a93b',
    overdue: '#e5484d',
  };
  const color = colors[status] || colors.ok;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 8}
        fill="none"
        stroke={color}
        strokeWidth="8"
      />
    </svg>
  );
}

export default Gauge;