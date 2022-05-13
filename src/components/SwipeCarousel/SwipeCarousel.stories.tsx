import { SwipeCarousel } from '.';

export default {
  title: 'Components/SwipeCarousel',
  component: SwipeCarousel
};

const DummySlide = ({ index }: any) => (
  <div className="text-center flex flex-col items-center py-8">
    <h1 className="font-display font-bold text-xl">{`Slide ${index}`}</h1>
    <p className="max-w-sm">
      Laoreet purus iaculis urna in integer litora tempor placerat vestibulum
      rhoncus inceptos felis mollis neque
    </p>
  </div>
);

export const Default = () => (
  <SwipeCarousel>
    <DummySlide index={1} />
    <DummySlide index={2} />
    <DummySlide index={3} />
  </SwipeCarousel>
);
