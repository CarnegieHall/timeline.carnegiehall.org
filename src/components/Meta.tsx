import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { SITE_URL } from '../lib/consts';
import { resolveUrl } from '../lib/utils';

export type MetaProps = {
  /** Page title */
  title?: string;
  /** Page description */
  description?: string;
  /** Cover image (used for social networks) */
  cover?: string;
};

/**
 * Sets a page's <head> meta data
 */
export function Meta({ title, description, cover }: MetaProps) {
  const { pathname, locale, defaultLocale, query } = useRouter();
  let resolvedPathName = pathname;

  Object.keys(query).map(
    (key) =>
      (resolvedPathName = resolvedPathName.replace(
        `[${key}]`,
        (query as any)[key]
      ))
  );

  const resolvedCover = cover && (resolveUrl(cover, SITE_URL || '') as string),
    resolvedLocation =
      locale === defaultLocale
        ? `${SITE_URL}${resolvedPathName}`
        : `${SITE_URL}/${locale}${resolvedPathName}`;

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={resolvedLocation}
      openGraph={{
        url: resolvedLocation,
        title,
        description,
        images: resolvedCover ? [{ url: resolvedCover }] : []
      }}
    />
  );
}
