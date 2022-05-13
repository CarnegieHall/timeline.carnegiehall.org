import { ShareBar, ShareBarProps } from '.';
import { PageGrid } from '../PageGrid';

export default {
  title: 'Components/ShareBar',
  component: ShareBar
};

export const Default = ({
  citation = 'Porttitor integer elit netus leo scelerisque pretium metus massa quisque torquent cras dolor sagittis arcu'
}: ShareBarProps) => (
  <PageGrid>
    <ShareBar citation={citation} />
  </PageGrid>
);
