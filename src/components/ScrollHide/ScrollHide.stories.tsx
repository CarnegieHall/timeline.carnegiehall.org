import { ScrollHide } from '.';

export default {
  title: 'Components/ScrollHide',
  component: ScrollHide
};

export const Default = () => (
  <div className="h-20">
    <ScrollHide>
      <p>Some content that will hide on scroll</p>
    </ScrollHide>
  </div>
);
