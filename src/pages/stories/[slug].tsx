import { AdaptiveHeader, HeroImg } from '$src/components/HeroImg';
import { Meta } from '$src/components/Meta';
import { NavBar } from '$src/components/NavBar';
import { PageGrid } from '$src/components/PageGrid';
import { RelatedStories } from '$src/components/RelatedStories';
import { ScrollDown } from '$src/components/ScrollDown';
import { ScrollProgress } from '$src/components/ScrollProgress';
import { ShareBar } from '$src/components/ShareBar';
import { Article, ARTICLE_CONTAINER_STYLES } from '$src/containers/Article';
import { CMS_API } from '$src/lib/consts';
import { paginatedFetchJSON } from '$src/lib/utils';
import { usePlayer } from '$src/stores/usePlayer';
import { parseSong, useSong } from '$src/stores/useSong';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useCallback, useEffect } from 'react';

/**
 * Story page
 */
export default function StoryPage({ data, stories }: any) {
  const setSong = useSong(useCallback((s) => s.set, [])),
    songPlaying = usePlayer(useCallback((s) => s.playing, []));

  useEffect(() => {
    if (!!data.default_song && !songPlaying) {
      setSong(parseSong(data.default_song));
    }
  }, [data, setSong]);

  return (
    <>
      <ScrollProgress />
      <AdaptiveHeader />

      <Meta
        title={data.seo.title}
        description={data.seo.description}
        cover={data.seo.image}
      />
      <div className="!col-span-full sticky top-0 ">
        <HeroImg
          image={data.hero_image}
          color={data.color}
          attribution={data.hero_image_attribution}
          withStoryHeading={{
            title: data.title,
            authors: data.authors,
            position: data.position
          }}
        />
        <ScrollDown className="z-10 text-grey-100 absolute left-[var(--page-gutter)] bottom-[22vh] md:bottom-11 " />
      </div>

      <div className="!col-span-full z-10 bg-grey-100">
        <PageGrid className={ARTICLE_CONTAINER_STYLES}>
          <Article content={data.content} authors={data.authors} />
        </PageGrid>

        <ShareBar className="relative z-10" citation={data.citation || ''} />
        <RelatedStories story={data} stories={stories} />
        <NavBar
          period={{ start: data.year_start, end: data.year_finish }}
          showOnScroll
        />
      </div>
    </>
  );
}

/** Page data */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: stories } = await paginatedFetchJSON(`${CMS_API}/stories`),
    data = stories.find(({ slug }: any) => slug === params?.slug);

  return {
    props: {
      data,
      stories: stories.map(
        ({ id, slug, position, title, hero_image, authors, color }: any) => ({
          id,
          slug,
          position,
          title,
          hero_image,
          authors
        })
      )
    }
  };
};

/** Static pages generation */
export const getStaticPaths: GetStaticPaths = async () => {
  const { data: stories } = await paginatedFetchJSON(`${CMS_API}/stories`);

  return {
    paths: stories.map(({ slug, id }: any) => ({
      params: { slug, id }
    })),
    fallback: false
  };
};
