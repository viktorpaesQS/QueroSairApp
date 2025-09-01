import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const Input = React.forwardRef(({ className, type, label, id, ...props }, ref) => {
  const hasValue = props.value && props.value.toString().length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        className={cn(
          'peer h-12 w-full rounded-lg border border-light-gray bg-dark-gray px-4 pt-4 text-base text-text-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors focus:border-brand-yellow',
          className
        )}
        ref={ref}
        {...props}
        placeholder={label} 
      />
      <motion.label
        htmlFor={id}
        className={cn(
          "absolute left-4 text-text-secondary transition-all duration-300 ease-in-out pointer-events-none",
          hasValue 
            ? 'top-2 text-xs text-brand-yellow' 
            : 'top-1/2 -translate-y-1/2 text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-yellow'
        )}
      >
        {label}
      </motion.label>
    </div>
  );
});
Input.displayName = 'Input';

export { Input };