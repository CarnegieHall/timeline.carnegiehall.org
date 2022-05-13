import { HeroImg, HeroImgProps } from '.';

export default {
  title: 'Components/HeroImg',
  component: HeroImg
};

export const Default = (props: HeroImgProps) => (
  <HeroImg {...props} />
);