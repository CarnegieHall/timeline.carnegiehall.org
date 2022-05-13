import { Link } from '$src/components/Link';
import { PageGrid } from '$src/components/PageGrid';
import { onKeyAction } from '$src/lib/utils';
import { useLayout } from '$src/stores/useLayout';
import { Transition } from '@headlessui/react';
import type { HTMLProps } from 'react';
import { useCallback } from 'react';
import shallow from 'zustand/shallow';
import { About } from './About';
import { Explore } from './Explore';

function TabAction({
  label,
  active,
  ...props
}: {
  label: string;
  active: boolean;
} & HTMLProps<HTMLSpanElement>) {
  const Element = props.href ? Link : 'span';
  return (
    <Element
      style={{
        textDecorationColor: 'var(--color-red)',
        textUnderlineOffset: '0.25em'
      }}
      className={`hover:underline whitespace-nowrap cursor-pointer mx-4 sm:mx-8 text-sm sm:text-base sm:mr-8 font-display font-bold  ${
        active && 'underline'
      }`}
      {...props}
    >
      {label}
    </Element>
  );
}

export type MenuProps = HTMLProps<HTMLDivElement>;

/**
 * ### Global site menu and about page
 */
export function Menu({ className, ...props }: MenuProps) {
  const [config, updateLayout] = useLayout(
      useCallback((s) => [s.menu, s.update], []),
      shallow
    ),
    timing = (duration: string | number) =>
      `${config.asPage ? '[0ms]' : `[${duration}ms]`}`;

  return (
    <Transition
      as={PageGrid as any}
      className={`bg-black-300 overflow-x-hidden ${className}`}
      enterFrom="opacity-0"
      enterTo="opacity-1"
      leaveFrom="opacity-1"
      leaveTo="opacity-0"
      enter={`transition-opacity duration-${timing(500)}`}
      leave="transition-opacity duration-500 delay-[750ms]"
      show={config.open}
      {...props}
    >
      <Transition.Child
        as={PageGrid}
        rows="auto 1fr"
        unmount={false}
        className="h-screen bg-black-300 text-grey-100 scrollable"
        enterFrom="opacity-0"
        enterTo="opacity-1"
        leaveFrom="opacity-1"
        leaveTo="opacity-0"
        enter={`transition-opacity duration-${timing(500)}`}
        leave="transition-opacity duration-500 delay-[700ms]"
      >
        <Transition.Child
          as={PageGrid}
          unmount={false}
          rows="1fr"
          className="bg-grey-100 text-black py-4 md:py-[26px] items-center"
          enterFrom="-translate-y-full"
          enterTo="translate-y-0"
          leaveFrom="translate-y-0"
          leaveTo="-translate-y-full"
          enter={`transition-transform duration-${timing(300)} delay-${timing(
            400
          )}`}
          leave="transition-transform duration-300"
        >
          <div className="flex -mx-4 scrollable sm:justify-center sm:-mx-8">
            <TabAction label="View Timeline" href="/timeline" active={false} />
            <TabAction
              label="Index"
              active={config.page === 'index'}
              onClick={() => updateLayout({ menu: { page: 'index' } })}
              onKeyDown={onKeyAction(() =>
                updateLayout({ menu: { page: 'index' } })
              )}
              tabIndex={0}
            />
            <TabAction
              label="About the Timeline"
              active={config.page === 'about'}
              onClick={() => updateLayout({ menu: { page: 'about' } })}
              onKeyDown={onKeyAction(() =>
                updateLayout({ menu: { page: 'about' } })
              )}
              tabIndex={0}
            />
          </div>
        </Transition.Child>

        <Transition.Child
          as={PageGrid}
          unmount={false}
          className="bg-black-300"
          enterFrom="opacity-0"
          enterTo="opacity-1"
          leaveFrom="opacity-1"
          leaveTo="opacity-0"
          enter={`transition-opacity duration-${timing(300)} delay-${timing(
            '[500ms]'
          )}`}
          leave="transition-opacity duration-300"
        >
          <Transition
            as={PageGrid}
            show={config.page === 'index'}
            className="pb-24"
            enterFrom="opacity-0"
            enterTo="opacity-1"
            leaveFrom="opacity-1"
            leaveTo="opacity-0"
            enter={`transition-opacity duration-${timing(300)} delay-${timing(
              300
            )}`}
            leave="transition-opacity duration-300"
          >
            <Explore />
          </Transition>
          <Transition
            as={PageGrid}
            show={config.page === 'about'}
            enterFrom="opacity-0"
            enterTo="opacity-1"
            leaveFrom="opacity-1"
            leaveTo="opacity-0"
            enter={`transition-opacity duration-${timing(300)} delay-${timing(
              300
            )}`}
            leave="transition-opacity duration-300"
            className="pb-24"
          >
            <About />
          </Transition>
        </Transition.Child>
      </Transition.Child>
    </Transition>
  );
}
