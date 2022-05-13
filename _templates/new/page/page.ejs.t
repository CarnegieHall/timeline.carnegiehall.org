---
to: src/pages/<%= name %>.tsx
---
<% if (staticProps) { -%>
import type { GetStaticProps } from 'next';
<% } -%>
import { Meta } from '$src/components/Meta';

/**
 * <%= h.changeCase.sentence(name) %> page
 */
export default function <%= h.changeCase.pascal(name) %>Page({
  <% if (staticProps) { -%>data<% } %>
}: any) {

  return (
    <>
      <Meta <% if (staticProps) { %>title={data.seo.title} description={data.seo.description} cover={data.seo.image} <% } %>/>
    </>
  );
}

<% if (staticProps) { -%>
/** Page data */
export const getStaticProps: GetStaticProps = async (context) => {

  return {
    props: { data }
  };
};
<% } -%>
