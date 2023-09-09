import React from 'react';
import classnames from 'classnames';

export const List = {
  Separator({ className, ...props }: React.ComponentProps<'li'>) {
    return <li className={classnames(className, 'p-1 bg-gray-200 font-bold')} {...props} />;
  },
  Item({ className, ...props }: React.ComponentProps<'li'>) {
    return <li className={classnames(className, 'p-1')} {...props} />;
  },
  ItemTitle({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={classnames(className, 'h-6 truncate')} {...props} />;
  },
  ItemUrl({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={classnames(className, 'h-4 truncate')} {...props} />;
  },
};
