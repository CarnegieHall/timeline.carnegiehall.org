---
to: src/components/<%= name %>/index.tsx
---
import type { HTMLProps } from 'react';

export type <%= name %>Props = {
<% if (locals.props) { -%><% props.forEach(prop => { -%>
  /** <%= prop.description %> */
  <%= prop.name %>: <%= prop.type %>;
<% }) -%><% } -%>
} & HTMLProps<HTMLDivElement>;


/**
 * ### <%= description %>
 */
export function <%= name %>({<% if (locals.props) { %>
<% props.forEach(prop => { -%>
  <%= prop.name.replace(/(\?)$/, '') %>,
<% }) -%><% } -%>
  className = ''
}: <%= name %>Props) {
  return (
    <div className={`${className}`}>

    </div>
  );
}