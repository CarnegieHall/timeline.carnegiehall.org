import type { ReactNode } from 'react';
import { Link } from '../Link';

export type ButtonProps = {
  children: ReactNode;
} & any;

/**
 * ### Adaptive button component
 */
export function Button({ children, className = '', ...props }: ButtonProps) {
  const Element = props.href ? Link : 'button';

  return (
    <Element
      className={`label text-xsm tracking-widest text-center rounded-full border transition-all bg-grey-100 py-2 px-6 hover:bg-black hover:text-grey-100 ${className}`}
      {...props}
    >
      {children}
    </Element>
  );
}
