import { ReactComponent as ArrowLeft } from '$src/assets/icons/caret-left.svg';
import { Link } from '$src/components/Link';
import { NavBar } from '$src/components/NavBar';
import { PullQuote } from '$src/components/PullQuote';
import { GlobalData } from '$src/lib/GlobalData';
import { usePageStyles } from '$src/lib/hooks';
import { usePageLayout } from '$src/stores/useLayout';
import { useContext } from 'react';

/**
 * Error page
 */
export default function ErrorPage() {
  const { settings: data } = useContext(GlobalData);

  usePageLayout({
    page: {
      rows: '1fr auto'
    },
    footer: {
      hidden: true
    }
  });
  usePageStyles({
    background: 'var(--color-grey-300)'
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <PullQuote quote={data['404_heading']} />
        <Link
          className="label flex items-center my-10"
          href={data['404_cta_relative_link']}
        >
          {data['404_cta_message']}
          <ArrowLeft className="rotate-180 ml-2 -translate-y-0.5 h-3 w-3 fill-current" />
        </Link>
      </div>
      <NavBar period={{ start: '1600', end: 'Present' }} />
    </>
  );
}
