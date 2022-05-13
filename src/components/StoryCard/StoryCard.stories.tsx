import { StoryCard, StoryCardProps } from '.';

export default {
  title: 'Components/StoryCard',
  component: StoryCard
};

export const Default = ({
  number = 1,
  title = `Musical Exchange Across the "Black Atlantic"`,
  image = `https://assets.imgix.net/unsplash/turntable.jpg`,
  author = 'Michael E. Veal, PH.D.',
  href = ''
}: StoryCardProps) => (
  <div className="max-w-sm">
    <StoryCard
      number={number}
      title={title}
      image={image}
      author={author}
      href={href}
    />
  </div>
);
export const WithBackground = ({
  number = 1,
  title = `Musical Exchange Across the "Black Atlantic"`,
  image = `https://assets.imgix.net/unsplash/turntable.jpg`,
  author = 'Michael E. Veal, PH.D.',
  href = ''
}: StoryCardProps) => (
  <div className="bg-blue-300 p-10 max-w-sm">
    <StoryCard
      number={number}
      title={title}
      image={image}
      author={author}
      href={href}
    />
  </div>
);
