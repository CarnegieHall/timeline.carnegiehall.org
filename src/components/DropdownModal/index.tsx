import { Transition } from '@headlessui/react';
import type { HTMLProps } from 'react';
import { useRef } from 'react';
import { Portal } from 'react-portal';
import { useClickAway, useKeyPressEvent } from 'react-use';
import { PageGrid } from '../PageGrid';

export type DropdownModalProps = {
  /** Whether to show the modal */
  open: boolean;
  /** Callback for when requesting close */
  onClose(): void;
  /** Optional render target for the modal portal */
  renderTarget?: HTMLElement | null;
} & HTMLProps<HTMLDivElement>;

/**
 * ### Modal that slides down from the top of the screen
 */
export function DropdownModal({
  open,
  onClose,
  renderTarget,
  children,
  className = ''
}: DropdownModalProps) {
  const defaultPortal: any = useRef(null),
    dropdown = useRef(null);

  useKeyPressEvent('Escape', onClose);
  useClickAway(dropdown, onClose);

  return (
    <Portal ref={defaultPortal} node={renderTarget}>
      <Transition
        show={open}
        unmount
        enter="transition-transform duration-300"
        leave="transition-transform duration-300"
        enterFrom="-translate-y-full"
        enterTo="translate-y-0"
        leaveFrom="translate-y-0"
        leaveTo="-translate-y-full"
        className={`fixed top-0 w-full bg-black z-[99999] text-white py-7 ${className}`}
      >
        <PageGrid ref={dropdown}>
          <div>{children}</div>
        </PageGrid>
      </Transition>
    </Portal>
  );
}
