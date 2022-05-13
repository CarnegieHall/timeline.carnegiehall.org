import type { NavBarProps } from '$src/components/NavBar';
import { useCallback, useEffect } from 'react';
import create from 'zustand';
import shallow from 'zustand/shallow';
import merge from 'deepmerge';

type LayoutState = {
  header: {
    theme?: 'default' | 'minimal';
    fixed?: boolean;
    withNavBar?: null | NavBarProps;
    additionalClasses?: string;
  };
  footer: {
    hidden?: boolean;
    classes?: string;
  };
  page: {
    rows: string;
  };
  menu: {
    open?: boolean;
    page?: 'index' | 'about';
    asPage?: boolean;
  };
};

type UseLayout = LayoutState & {
  update(state: Partial<LayoutState>): void;
  reset(overrides?: Partial<LayoutState>): void;
};

const DEFAULT_STATE: LayoutState = {
  header: {
    theme: 'default',
    fixed: false,
    withNavBar: null,
    additionalClasses: ''
  },
  footer: {
    hidden: false,
    classes: ''
  },
  page: {
    rows: ''
  },
  menu: {
    open: false,
    page: 'index',
    asPage: false
  }
};

export const useLayout = create<UseLayout>((set) => ({
  ...DEFAULT_STATE,
  update: (state) => set((old) => merge(old, state)),
  reset: (overrides) => set(merge(DEFAULT_STATE, overrides || {}))
}));

/**
 * Helper to update partial layout state and cleanup on unmount
 * @param state State update
 * @param deps optional dependencies to update on
 */
export function usePageLayout(state: Partial<LayoutState>, deps: any[] = []) {
  const [update, reset] = useLayout(
    useCallback((s) => [s.update, s.reset], []),
    shallow
  );

  useEffect(() => {
    update(state);
    return () => {
      reset();
    };
  }, deps);
}
