import { DataTable, DataTableProps } from '.';

export default {
  title: 'Components/DataTable',
  component: DataTable
};

const DUMMY_DATA = {
  columns: [
    { Header: 'Tradition', accessor: 'tradition' },
    { Header: 'Genre', accessor: 'genre' },
    { Header: 'Date', accessor: 'date' },
    { Header: 'Directly Influenced By', accessor: 'directly-influenced-by' },
    { Header: 'Directly Influenced', accessor: 'directly-influenced' },
    { Header: 'Cross Influenced By', accessor: 'cross-influenced-by' },
    { Header: 'Cross Influenced', accessor: 'cross-influenced' }
  ],
  data: {
    tradition: [{ label: 'Secular' }],
    genre: [{ label: 'New Jack Swing', href: '/' }],
    date: [{ label: '1985-2000' }],
    'directly-influenced-by': [
      { label: 'Soul', href: '/' },
      { label: 'Rap/Hip Hop', href: '/' }
    ],
    'directly-influenced': [{ label: 'Lipsum Genre', href: '/' }],
    'cross-influenced-by': [
      { label: 'House', href: '/' },
      { label: 'Contemporary Gospel', href: '/' }
    ],
    'cross-influenced': [{ label: 'R&B', href: '/' }]
  }
};

export const Default = ({
  columns = DUMMY_DATA.columns,
  data = Array(50).fill(DUMMY_DATA.data) as any
}: DataTableProps) => <DataTable columns={columns} data={data} />;
