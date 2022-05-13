import { BREAKPOINTS } from '$src/lib/consts';
import { useBreakpoint } from '$src/lib/hooks';
import { OverflowScroll } from './OverflowScroll';
import { PageGrid } from './PageGrid';
import { StoryCard } from './StoryCard';

export function RelatedStories({ story, stories: allStories }: any) {
  const isDesktop = useBreakpoint(`(min-width: ${BREAKPOINTS.lg})`),
    stories = allStories.sort((a: any, b: any) => a.position - b.position),
    storyIndex = stories.findIndex(({ id }: any) => id === story.id);
  return (
    <PageGrid
      className="overflow-hidden "
      style={{ background: story.color || 'var(--color-grey-100)' }}
    >
      <OverflowScroll
        disabled={isDesktop}
        className="py-12 lg:justify-center lg:py-24"
        containerClasses="w-[80vw] flex-shrink-0 lg:w-1/3 px-6 lg:px-16 lg:border-r lg:last:border-r-0"
      >
        {[...stories, ...stories]
          .filter(({ id }: any) => id !== story.id)
          .slice(storyIndex, storyIndex + 3)
          .map(({ slug, position, title, hero_image, authors }: any) => (
            <StoryCard
              style={{ background: story.color }}
              number={position}
              title={title}
              image={hero_image}
              authors={authors.map(
                ({ first_name, last_name }: any) => `${first_name} ${last_name}`
              )}
              href={`/stories/${slug}`}
              key={slug}
            />
          ))}
      </OverflowScroll>
    </PageGrid>
  );
}
