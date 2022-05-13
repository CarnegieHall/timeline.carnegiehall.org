import { AuthorCredit } from '$src/components/AuthorCredit';
import { HTML } from '$src/components/HTML';
import { MediaScroller } from '$src/components/MediaScroller';
import { PageGrid } from '$src/components/PageGrid';
import { PullQuote } from '$src/components/PullQuote';
import { SectionDivider } from '$src/components/SectionDivider';
import { SectionTitle } from '$src/components/SectionTitle';
import { plaintext } from '$src/lib/utils';
import type { Author } from '$types/data';
import { forwardRef, HTMLProps } from 'react';

export type ArticleProps = {
  leadIn?: boolean;
  content: {
    type: string;
    children?: any[];
    content?: any;
  }[];
  authors?: Author[];
} & HTMLProps<HTMLDivElement>;

export const ARTICLE_CONTAINER_STYLES = 'pb-24 z-10 bg-grey-100 relative';
export const ARTICLE_SECTION_LAYOUT = `max-w-4xl w-full lazyrender mx-auto`;
export const ARTICLE_TEXT_STYLES = 'font-body text-lg md:text-xl richtext';

const DIVIDERS = ['title', 'block-quote'];

export const Article = forwardRef(function Article(
  { leadIn = true, content, authors, className }: ArticleProps,
  ref
) {
  const Section = ({ type, children, index, className = '' }: any) => {
    const Wrapper = DIVIDERS.includes(type) ? SectionDivider : 'section',
      adjacentSection =
        DIVIDERS.includes(type) && DIVIDERS.includes(content[index + 1]?.type);

    return (
      <Wrapper
        className={`${index === 0 ? 'mt-13 md:mt-12' : 'mt-6'} ${
          !adjacentSection && 'mb-6'
        }  ${className}`}
        dividers={{
          top: index === 0 && leadIn ? 'long' : 'standard',
          bottom: adjacentSection ? 'none' : 'standard'
        }}
      >
        {children}
      </Wrapper>
    );
  };

  return (
    <PageGrid ref={ref} className={`font-body z-10 ${className}`}>
      {content.map(({ type, children, content }: any, i: number) => {
        switch (type) {
          case 'title':
            return (
              <Section
                type={type}
                index={i}
                className="flex flex-col items-center"
                key={i}
              >
                <SectionTitle title={content.text} />
              </Section>
            );
          case 'text':
            return (
              <Section
                type={type}
                index={i}
                className={`${ARTICLE_SECTION_LAYOUT} ${ARTICLE_TEXT_STYLES}`}
                key={i}
              >
                <HTML content={content.text} />
              </Section>
            );
          case 'block-quote':
            return (
              <Section
                type={type}
                index={i}
                className="flex flex-col items-center !mt-0 !mb-0"
                key={i}
              >
                <PullQuote
                  quote={plaintext(content.quote)}
                  author={content.person}
                  role={content.title}
                />
              </Section>
            );
          case 'media-collection':
            return (
              <Section type={type} index={i} className="!grid subgrid" key={i}>
                <MediaScroller
                  media={children.map(
                    ({ content, media_full_url, medias }: any) => {
                      const video = content.vimeo_url || content.youtube_url;

                      return {
                        caption: plaintext(content.caption),
                        credit: content.credit,
                        creditLink: content.credit_link,
                        type: !!video ? 'video' : 'image',
                        media: media_full_url,
                        alt: medias[0]?.alt_text,
                        url: video
                      };
                    }
                  )}
                />
              </Section>
            );
          case 'info-text':
            return (
              <Section
                type={type}
                index={i}
                className={`${ARTICLE_SECTION_LAYOUT} font-ui text-sm  richtext`}
                key={i}
              >
                <HTML content={content.text} />
              </Section>
            );
          case 'author-reference':
            return (
              <Section
                className="max-w-4xl mx-auto"
                type={type}
                index={i}
                key={i}
              >
                {authors?.map((author: Author, i: number) => (
                  <AuthorCredit author={author} key={i} />
                ))}
              </Section>
            );
        }
      })}
    </PageGrid>
  );
});
