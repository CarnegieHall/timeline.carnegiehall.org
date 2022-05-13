import { ScrollSections, ScrollSectionsProps } from '.';
import { PageGrid } from '../PageGrid';

export default {
  title: 'Components/ScrollSections',
  component: ScrollSections
};

const DUMMY_DATA = [
  {
    label: 'Torquent iaculis mattis',
    content:
      'Elit semper nam sit at viverra rhoncus commodo sollicitudin, diam habitasse vulputate taciti integer fames sagittis fusce, dapibus phasellus senectus egestas mus gravida sapien. Ultrices pellentesque lacinia dis lectus magna platea massa lobortis, quisque tempor lorem enim libero nisl. Mus ullamcorper blandit malesuada orci etiam est fames pellentesque, leo per lorem eleifend turpis augue erat torquent nostra, diam arcu rhoncus bibendum dictumst sed vulputate. Magnis rhoncus sapien himenaeos porttitor sed eros habitant eget, nam vitae rutrum sollicitudin litora dictum neque erat felis, vehicula metus penatibus pellentesque hac venenatis nullam. Etiam purus posuere ullamcorper phasellus magnis primis libero ipsum, mollis vitae lorem nisl parturient habitasse lacus dui pretium, eu commodo quisque porta nibh venenatis viverra. Nunc hac viverra commodo mus gravida massa integer dignissim accumsan potenti, feugiat aliquam lorem euismod mauris dapibus tincidunt eget nulla sapien, vitae blandit tristique malesuada himenaeos in bibendum netus elit. Penatibus mi integer quis sociosqu viverra mauris ullamcorper suscipit sit, suspendisse aliquam himenaeos laoreet pharetra in quisque erat elementum, rhoncus fames ad eleifend consectetur proin parturient lobortis. Diam lacus mauris sociosqu tempus fames ridiculus eu tristique sollicitudin faucibus netus, montes placerat orci integer velit donec pretium quam dignissim consectetur inceptos, lorem hendrerit mattis neque interdum congue ullamcorper penatibus sed habitant.'
  },
  {
    label: `Penatibus arcu imperdiet`,
    content: `Lobortis facilisi id duis faucibus mollis vestibulum molestie, vulputate sit cursus bibendum eu quam vivamus, velit elit porttitor eleifend conubia vitae. Metus suscipit nam ultricies inceptos volutpat natoque lacus nascetur eget ullamcorper auctor, consequat habitasse quam tortor et tempus bibendum imperdiet nisl ad. Dapibus auctor suspendisse facilisi tempus dictum ac eu turpis pellentesque eros viverra porttitor a consequat, senectus platea enim inceptos vel litora rhoncus arcu donec neque cubilia montes phasellus. Quisque phasellus rhoncus blandit metus orci hendrerit per aliquam enim lacus vitae venenatis suscipit malesuada torquent tortor, sem accumsan posuere erat gravida nam dis fames cubilia velit mus montes morbi magna. Elementum sem eros sodales ipsum varius dictumst, urna aenean netus lorem curabitur, etiam gravida proin ullamcorper egestas. Pulvinar suscipit molestie pellentesque sagittis quis vulputate fringilla ut hac enim iaculis orci, porttitor habitasse ornare elit in etiam montes cum nec mollis est. Lorem imperdiet mauris sociosqu, montes nibh nascetur ornare, parturient sed.`
  },
  {
    label: 'Torquent iaculis mattis',
    content:
      'Elit semper nam sit at viverra rhoncus commodo sollicitudin, diam habitasse vulputate taciti integer fames sagittis fusce, dapibus phasellus senectus egestas mus gravida sapien. Ultrices pellentesque lacinia dis lectus magna platea massa lobortis, quisque tempor lorem enim libero nisl. Mus ullamcorper blandit malesuada orci etiam est fames pellentesque, leo per lorem eleifend turpis augue erat torquent nostra, diam arcu rhoncus bibendum dictumst sed vulputate. Magnis rhoncus sapien himenaeos porttitor sed eros habitant eget, nam vitae rutrum sollicitudin litora dictum neque erat felis, vehicula metus penatibus pellentesque hac venenatis nullam. Etiam purus posuere ullamcorper phasellus magnis primis libero ipsum, mollis vitae lorem nisl parturient habitasse lacus dui pretium, eu commodo quisque porta nibh venenatis viverra. Nunc hac viverra commodo mus gravida massa integer dignissim accumsan potenti, feugiat aliquam lorem euismod mauris dapibus tincidunt eget nulla sapien, vitae blandit tristique malesuada himenaeos in bibendum netus elit. Penatibus mi integer quis sociosqu viverra mauris ullamcorper suscipit sit, suspendisse aliquam himenaeos laoreet pharetra in quisque erat elementum, rhoncus fames ad eleifend consectetur proin parturient lobortis. Diam lacus mauris sociosqu tempus fames ridiculus eu tristique sollicitudin faucibus netus, montes placerat orci integer velit donec pretium quam dignissim consectetur inceptos, lorem hendrerit mattis neque interdum congue ullamcorper penatibus sed habitant.'
  }
];

export const Default = ({
  sections = DUMMY_DATA as any,
  title = 'Advisory Board'
}: ScrollSectionsProps) => (
  <PageGrid className="scrollable max-h-[70vh]">
    <ScrollSections sections={sections} title={title} />
  </PageGrid>
);
