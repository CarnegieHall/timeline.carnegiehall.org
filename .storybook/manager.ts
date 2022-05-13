import icon from '../public/icon.png';
import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Carnegie Hall',
    brandUrl: 'https://timeline.carnegiehall.org',
    brandImage: icon,
    colorPrimary: '#FF1C3C',
    colorSecondary: '#FF1C3C'
  }),
  sidebar: {
    showRoots: true
  },
  viewMode: 'docs'
});
