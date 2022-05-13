import { GlobalData } from '$src/lib/GlobalData';
import { onKeyAction, plaintext } from '$src/lib/utils';
import { useLayout } from '$src/stores/useLayout';
import { HTMLProps, useCallback, useContext } from 'react';
import shallow from 'zustand/shallow';
import { ArrowLink } from './ArrowLink';
import { HTML } from './HTML';
import { Img } from './Img';
import { MediaDetails } from './MediaDetails';
import { PageGrid } from './PageGrid';

/**
 * ### Global site footer
 */
export function Footer({ className = '' }: HTMLProps<HTMLDivElement>) {
  const { footer: data } = useContext(GlobalData),
    [config, menu, updateLayout] = useLayout(
      useCallback((s) => [s.footer, s.menu, s.update], []),
      shallow
    );

  function openAbout() {
    updateLayout({ menu: { open: true, page: 'about' } });
  }

  return (
    <>
      <style jsx>{`
        .copy p {
          margin-bottom: 0;
        }
      `}</style>

      <PageGrid
        as="footer"
        className={`lazyrender bg-black text-grey-100 px-[var(--page-gutter)] ${
          config.hidden ? 'hidden' : ''
        } ${config.classes} ${className}`}
      >
        <div className="col-start-2 col-end-3 lg:grid lg:grid-cols-[1fr,1px,1fr]">
          <div className="pt-20 pb-14 lg:col-start-1 lg:row-start-1 lg:pr-14 ">
            <Img
              src={data.logo.src}
              alt={data.logo.alt}
              height={24}
              sizes="300px"
              className="w-auto h-4 sm:h-5"
            />
          </div>
          <div className="lg:col-start-1 lg:row-start-2 lg:pr-14 lg:pb-20 ">
            <div className="text-lg lg:text-xl font-body copy">
              <HTML content={data.overview.content.text} />
              {!(menu.open && menu.page === 'about') && (
                <span
                  onClick={openAbout}
                  onKeyDown={onKeyAction(openAbout)}
                  tabIndex={0}
                  aria-label="Learn More"
                  className="italic cursor-pointer anchor"
                >
                  Learn More
                </span>
              )}
            </div>
            <div className="aspect-w-16 aspect-h-9 mt-9">
              <Img
                src={data.overview.media_full_url}
                alt={data.overview.medias[0]?.alt_text}
                className="object-cover object-center"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <MediaDetails
              caption={data.overview.content.image_caption}
              credit={data.overview.content.image_credit}
            />
          </div>

          <div className="hidden w-px lg:block lg:row-span-2 bg-grey-100" />

          <div className="max-w-xl pb-20 mt-12 lg:col-start-3 lg:row-start-2 lg:pl-14 lg:mt-0">
            <div className="text-lg font-body lg:text-xl">
              <HTML content={data.blurb} />
            </div>
            <Img
              src={data.association_logo.src}
              alt={data.association_logo.alt}
              className="w-9/12 max-w-xs my-4"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <small
              className="block max-w-xl text-sm font-ui"
              dangerouslySetInnerHTML={{ __html: data.footnote }}
            />
            <span className="block mt-6 text-sm tracking-wide uppercase font-ui">{`© ${new Date().getFullYear()} ${
              data.legal_name
            }`}</span>
          </div>
        </div>
      </PageGrid>
    </>
  );
}
