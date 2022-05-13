import type { KeyboardEvent } from 'react';

/**
 * Simple fetch wrapper for JSON GETs
 */
export async function fetchJSON(url: string) {
  const data = await fetch(url).then((res) => res.json());
  return JSON.parse(JSON.stringify(data));
}

/**
 * Simple fetch wrapper for JSON GETs w/ looping for paginated cases
 */
export async function paginatedFetchJSON(url: string) {
  let records: any = [];
  let hasNextPage: boolean = false;
  let fetchUrl: string = url;

  do {
    let response = await fetch(fetchUrl).then((res) => res.json());
    records = records.concat(response.data);
    hasNextPage = response.next ?? false;
    if (hasNextPage) fetchUrl = response.next;
  } while (hasNextPage);

  return { data: records };
}

/**
 * Call a funciton on enter/space
 */
export const onKeyAction = (cb: () => void) => (e: KeyboardEvent<any>) => {
  if (e.key === 'Enter' || e.key === ' ') {
    cb();
  }
};

/**
 * Naive utility to strip HTML tags from a string
 * @param html HTML string
 */
export function plaintext(html: string) {
  return html?.replace(/<[^>]*>?/gm, '');
}

/**
 * Resole relative URLs against a source
 * @param link URL to resolve
 * @param source Source URL to resolve against
 */
export function resolveUrl(link: string, source: string) {
  return !/^https?:\/\//i.test(link) ? new URL(link, source).href : link;
}

/**
 * Helper to update CSS variables
 * @param properties Object of CSS properties
 */
export function setProperties(properties: any) {
  Object.keys(properties).forEach((property: string) =>
    document.documentElement.style.setProperty(property, properties[property])
  );
}
