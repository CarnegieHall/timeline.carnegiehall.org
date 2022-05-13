import { NavBar, NavBarProps } from '.';
import { PageGrid } from '../PageGrid';

export default {
  title: 'Components/NavBar',
  component: NavBar
};

export const Default = ({
  period = { start: '1773', end: '1995' }
}: NavBarProps) => (
  <PageGrid>
    <NavBar period={period} />
  </PageGrid>
);
