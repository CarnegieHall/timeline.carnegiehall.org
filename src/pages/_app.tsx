import { GlobalPlayer } from '$src/components/AudioPlayer/lib/GlobalPlayer';
import { Footer } from '$src/components/Footer';
import { Header } from '$src/components/Header';
import { PageGrid } from '$src/components/PageGrid';
import { CMS_API, MUSICKIT_SCRIPT, SITE_URL } from '$src/lib/consts';
import { GlobalData } from '$src/lib/GlobalData';
import { fetchJSON, paginatedFetchJSON } from '$src/lib/utils';
import { useExplorations } from '$src/stores/useExplorations';
import { useLayout } from '$src/stores/useLayout';
import '$src/styles/index.css';
import { DefaultSeo } from 'next-seo';
import type { AppContext, AppProps } from 'next/app';
import NextApp from 'next/app';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import GTM from 'react-gtm-module';
import smoothscroll from 'smoothscroll-polyfill';

function App({
  Component,
  pageProps,
  footer,
  about,
  stories,
  authors,
  genres,
  settings
}: AppProps & any) {
  const router = useRouter(),
    [ready, setReady] = useState(false),
    addExploration = useExplorations(useCallback((s) => s.add, [])),
    page = useLayout(useCallback((s) => s.page, []));

  useEffect(() => {
    setTimeout(() => setReady(true), 10);
    smoothscroll.polyfill();
    GTM.initialize({
      gtmId: process.env.NEXT_PUBLIC_GTM_ID || ''
    });
  }, []);

  useEffect(() => {
    const add = (href: string) =>
      addExploration({ title: document.title, href });

    router.events.on('routeChangeComplete', add);
    return () => {
      router.events.off('routeChangeComplete', add);
    };
  }, [router.events, addExploration]);

  return (
    <>
      <Head>
        {/* Meta */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icon.png" />

        {/* Fonts */}
        <link rel="stylesheet" href="https://use.typekit.net/qqu3zvc.css" />

        {/* Musickit */}
        <script src={MUSICKIT_SCRIPT} async />
      </Head>

      <DefaultSeo
        titleTemplate="%s — Timeline of African American Music"
        title={settings.site_name}
        openGraph={{
          type: 'website',
          locale: 'en',
          url: SITE_URL,
          site_name: settings.site_name
        }}
      />

      {/* Page */}
      <GlobalData.Provider
        value={{ footer, about, stories, genres, settings, authors }}
      >
        <div
          className="grid grid-cols-[var(--grid-page)] auto-rows-min min-h-screen"
          style={{ gridTemplateRows: 'auto 1fr auto' }}
        >
          <Header />
          <PageGrid
            className={ready ? '' : 'invisible'}
            rows={page.rows}
            as="main"
          >
            <Component {...pageProps} />
          </PageGrid>
          <Footer />
        </div>
        <GlobalPlayer />
      </GlobalData.Provider>
    </>
  );
}

// Should be getStaticProps, but not supported in _app yet
// See https://github.com/vercel/next.js/discussions/10949
App.getInitialProps = async (appContext: AppContext) => {
  const { data: stories } = await paginatedFetchJSON(`${CMS_API}/stories`),
    { data: genres } = await paginatedFetchJSON(`${CMS_API}/genres`);

  return {
    ...(await NextApp.getInitialProps(appContext)),
    footer: await fetchJSON(`${CMS_API}/footer`),
    settings: await fetchJSON(`${CMS_API}/site-settings`),
    about: await fetchJSON(`${CMS_API}/about-page`),
    authors: await fetchJSON(`${CMS_API}/authors`),
    stories: stories.map(({ id, slug, position, title }: any) => ({
      id,
      slug,
      position,
      title
    })),
    genres: genres.map(({ id, slug, name }: any) => ({ id, slug, name }))
  };
};

export default App;
