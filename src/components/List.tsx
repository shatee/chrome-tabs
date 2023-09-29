import React from 'react';
import classnames from 'classnames';

export const List = {
  Separator({ className, ...props }: React.ComponentProps<'li'>) {
    return <li className={classnames(className, 'p-1 bg-gray-200 font-bold')} {...props} />;
  },
  Item({ className, selected, ...props }: React.ComponentProps<'li'> & { selected: boolean }) {
    return (
      <li
        className={classnames(
          className,
          'flex p-2 items-center cursor-pointer hover:bg-gray-200',
          selected ? 'bg-gray-200' : undefined,
        )}
        {...props}
      />
    );
  },
  ItemIcon({ className, ...props }: React.ComponentProps<'img'>) {
    return <img className={classnames(className, 'w-5 h-5 mr-2')} {...props} />;
  },
  ItemMain({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={classnames(className, '')} {...props} />;
  },
  ItemTitle({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={classnames(className, 'h-6 text-sm leading-tight truncate')} {...props} />;
  },
  ItemUrl({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={classnames(className, 'h-4 text-xs leading-tight truncate')} {...props} />;
  },
};
