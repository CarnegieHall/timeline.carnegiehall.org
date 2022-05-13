---
to: src/components/<%= name %>/<%= name %>.stories.tsx
---
import { <%= name %><% if (props) { %>, <%= name %>Props<% } %> } from '.';

export default {
  title: 'Components/<%= name %>',
  component: <%= name %>
};

export const Default = (<% if (props) { %>props: <%= name %>Props<% } %>) => (
  <<%= name %><% if (props) { %> {...props}<% } %> />
);