import * as React from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

const Stepper = React.forwardRef(
  ({ className, label, onChange, value, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-10 min-w-[190px] items-center justify-between gap-2 rounded-md border border-input bg-background py-2 text-sm',
          className,
        )}
      >
        <Button
          data-testid='stepper-decrement'
          disabled={value === 0}
          onClick={() => onChange(value - 1)}
          type='button'
          variant='link'
        >
          -
        </Button>
        <span
          {...props}
          className={cn(!value && 'truncate text-muted-foreground')}
          ref={ref}
        >
          {value} {label}
          {value > 1 || value === 0 ? 's' : ''}
        </span>
        <Button
          data-testid='stepper-increment'
          disabled={value === 100}
          onClick={() => onChange(value + 1)}
          type='button'
          variant='link'
        >
          +
        </Button>
      </div>
    );
  },
);
Stepper.displayName = 'Stepper';

export { Stepper };
