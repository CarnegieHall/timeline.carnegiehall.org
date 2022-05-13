import { Footer } from '$src/components/Footer';
import { HTML } from '$src/components/HTML';
import { Img } from '$src/components/Img';
import { MediaDetails } from '$src/components/MediaDetails';
import { PageGrid } from '$src/components/PageGrid';
import { PullQuote } from '$src/components/PullQuote';
import { ScrollSections } from '$src/components/ScrollSections';
import { SectionDivider } from '$src/components/SectionDivider';
import { TwoUp } from '$src/components/TwoUp';
import { BREAKPOINTS } from '$src/lib/consts';
import { GlobalData } from '$src/lib/GlobalData';
import { useBreakpoint } from '$src/lib/hooks';
import { plaintext } from '$src/lib/utils';
import { useContext } from 'react';
import slugify from 'slugify';
import { ARTICLE_TEXT_STYLES } from './Article';

/**
 * ### Global site menu and about page
 */
export function About() {
  const { about, authors } = useContext(GlobalData),
    isTablet = useBreakpoint(`(min-width: ${BREAKPOINTS.md})`),
    ContentWrap = isTablet ? 'div' : SectionDivider,
    stickyOffset = 30;

  return (
    <>
      <PageGrid className="px-[var(--page-gutter)]">
        {about.content.map(({ type, content, medias, media_full_url }: any, i: number) => {
          switch (type) {
            case 'block-quote':
              return (
                <SectionDivider key={i}>
                  <PullQuote
                    className="mx-auto"
                    quote={plaintext(content.quote)}
                    key={i}
                  />
                </SectionDivider>
              );
            case 'image-and-text':
              return (
                <TwoUp
                  key={i}
                  left={
                    <div
                      className="md:sticky"
                      style={{ top: `${stickyOffset}px` }}
                    >
                      <Img
                        className="w-full"
                        sizes="(min-width: 786px) 50vw, 100vw"
                        src={media_full_url}
                        alt={medias[0]?.alt_text}
                      />
                      <MediaDetails
                        className="mt-2"
                        caption={plaintext(content.image_caption)}
                        credit={content.image_credit}
                      />
                    </div>
                  }
                  right={
                    <ContentWrap className={ARTICLE_TEXT_STYLES}>
                      <HTML content={content.text} />
                    </ContentWrap>
                  }
                />
              );
          }
        })}
        <ScrollSections
          stickyOffset={stickyOffset}
          sections={authors.map(
            ({ id, first_name, last_name, bio, external_link }: any) => ({
              id,
              label: `${first_name} ${last_name}`,
              anchor: slugify(`${first_name} ${last_name}`),
              content: bio,
              link: external_link
            })
          )}
          title="Advisory Team"
        />
      </PageGrid>
      <Footer className="bg-black-300" />
    </>
  );
}
