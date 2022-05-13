import create from 'zustand';

type Filters = {
  instruments?: Set<string>;
  musical_features?: Set<string>;
  themes?: Set<string>;
  yearRange?: string[];
};
type UseTimeline = {
  filters: Filters;
  setFilters(filters: Filters): void;
};

export const useTimeline = create<UseTimeline>((set) => {
  return {
    filters: {},
    setFilters: (filters) => set({ filters })
  };
});
