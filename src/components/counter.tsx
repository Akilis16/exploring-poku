import React from 'react';

interface CounterProps {
  count: number;
}

export function Counter({ count }: CounterProps) {
  return (
    <div className="total-counter-badge" data-testid="total-counter">
      <span className="badge-label">Total Items</span>
      <span className="badge-value">{count}</span>
    </div>
  );
}