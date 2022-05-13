import { CardStack } from '.';
import { PageGrid } from '../PageGrid';

export default {
  title: 'Components/CardStack',
  component: CardStack
};

const DummyItem = ({ className }: any) => (
  <div className={`subgrid py-5 h-52 ${className}`}>
    <div className="col-start-2 col-span-1">Card</div>
  </div>
);

export const Default = () => (
  <PageGrid>
    <CardStack onEject={() => null} onEjectFinish={() => null}>
      <DummyItem className="bg-blue-300" />
      <DummyItem className="bg-grey-500" />
      <DummyItem className="bg-red text-white" />
    </CardStack>
  </PageGrid>
);
