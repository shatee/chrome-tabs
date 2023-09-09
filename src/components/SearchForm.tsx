import React from 'react';
import classnames from 'classnames';

export const SearchForm = {
  Input: React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
    ({ className, type = 'text', ...props }, ref) => {
      return (
        <input
          className={classnames(
            className,
            'bg-white w-full border-2 border-gray-200 py-2 px-4 rounded appearance-none text-gray-700 focus:outline-none',
          )}
          type={type}
          {...props}
          ref={ref}
        />
      );
    },
  ),
};
