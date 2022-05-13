import { OverflowScroll } from '.';
import { Img } from '../Img';
import { PageGrid } from '../PageGrid';

export default {
  title: 'Components/OverflowScroll',
  component: OverflowScroll
};

const DummyComponent = () => (
  <Img
    src="https://assets.imgix.net/unsplash/turntable.jpg"
    alt=""
    className="w-[33vw] mr-12"
  />
);

export const Default = () => (
  <PageGrid>
    <OverflowScroll>
      <DummyComponent />
      <DummyComponent />
      <DummyComponent />
      <DummyComponent />
      <DummyComponent />
      <DummyComponent />
      <DummyComponent />
    </OverflowScroll>
  </PageGrid>
);
