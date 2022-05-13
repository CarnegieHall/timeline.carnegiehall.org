import '$src/styles/index.css';
import { Stories } from '@storybook/addon-docs';
import nextImgShim from './lib/nextImage';

// Shim next/image
nextImgShim();

// Change title of stories
Stories.defaultProps = {
  title: 'Examples'
};
