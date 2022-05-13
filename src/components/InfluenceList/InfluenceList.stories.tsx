import { InfluenceList, InfluenceListProps } from '.';
import { PageGrid } from '../PageGrid';

export default {
  title: 'Components/InfluenceList',
  component: InfluenceList
};

export const Default = ({
  direct = [{ name: 'Stride', slug: '0' }],
  indirect = [{ name: 'Brass Bands', slug: '0' }]
}: InfluenceListProps) => (
  <PageGrid>
    <InfluenceList direction="backwards" direct={direct} indirect={indirect} />
  </PageGrid>
);

export const Forwards = ({
  direct = [{ name: 'Stride', slug: '0' }],
  indirect = [{ name: 'Brass Bands', slug: '0' }]
}: InfluenceListProps) => (
  <PageGrid>
    <InfluenceList direction="forwards" direct={direct} indirect={indirect} />
  </PageGrid>
);

export const Bars = ({
  direct = [{ name: 'Stride', slug: '0' }],
  indirect = [{ name: 'Brass Bands', slug: '0' }]
}: InfluenceListProps) => (
  <PageGrid>
    <InfluenceList
      direction="backwards"
      theme="bars"
      direct={direct}
      indirect={indirect}
    />
  </PageGrid>
);
