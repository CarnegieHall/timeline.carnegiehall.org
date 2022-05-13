import create from 'zustand';

type Exploration = {
  title: string;
  href: string;
};

type UseExplorations = {
  explorations: Exploration[];
  add(exploration: Exploration): void;
};

export const useExplorations = create<UseExplorations>((set) => ({
  explorations: [],
  add: (exploration) =>
    set(({ explorations }) => {
      const newExplorations = explorations.filter(
        ({ href }) => href.split('?')[0] !== exploration.href.split('?')[0]
      );

      return { explorations: [exploration, ...newExplorations] };
    })
}));
