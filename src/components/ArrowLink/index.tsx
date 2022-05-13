import { ReactComponent as Arrow } from '$src/assets/icons/arrow.svg';
import type { HTMLProps } from 'react';
import { Link } from '../Link';

/**
 * ### Link arrow
 */
export function ArrowLink({
  className = '',
  ...props
}: HTMLProps<HTMLAnchorElement>) {
  const Element = !!props.href ? Link : 'span';

  return (
    <Element className={`inline-block cursor-pointer ${className}`} {...props}>
      <Arrow className="w-7 stroke-current" />
    </Element>
  );
}
