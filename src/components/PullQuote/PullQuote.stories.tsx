import { PullQuote, PullQuoteProps } from '.';

export default {
  title: 'Components/PullQuote',
  component: PullQuote
};

export const Default = ({
  quote = `They sing at their work, at their homes, on the highway, and in the streets.`,
  author = `Reverend C.F. Sturgis`
}: PullQuoteProps) => <PullQuote quote={quote} author={author} />;
