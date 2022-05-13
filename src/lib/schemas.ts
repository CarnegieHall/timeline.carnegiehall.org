function genreToItem({ name, slug }: any) {
  return {
    label: name,
    href: `/genres/${slug}`
  };
}

export const TIMELINE_TABLE = {
  columns: {
    desktop: [
      { Header: 'Tradition', accessor: 'tradition' },
      { Header: 'Genre', accessor: 'genre' },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Directly Influenced By', accessor: 'directlyInfluencedBy' },
      { Header: 'Directly Influenced', accessor: 'directlyInfluenced' },
      { Header: 'Cross Influenced By', accessor: 'crossInfluencedBy' },
      { Header: 'Cross Influenced', accessor: 'crossInfluenced' }
    ],
    mobile: [
      { Header: 'Genre', accessor: 'genre' },
      { Header: 'Tradition', accessor: 'tradition' },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Directly Influenced By', accessor: 'directlyInfluencedBy' },
      { Header: 'Directly Influenced', accessor: 'directlyInfluenced' },
      { Header: 'Cross Influenced By', accessor: 'crossInfluencedBy' },
      { Header: 'Cross Influenced', accessor: 'crossInfluenced' }
    ]
  },
  genreMapper: (genre: any) => ({
    tradition: [{ label: genre.tradition?.title }],
    genre: [genreToItem(genre)],
    date: [{ label: genre.display_date }],
    directlyInfluencedBy: genre.influenced_by.map(genreToItem),
    directlyInfluenced: genre.influenced.map(genreToItem),
    crossInfluencedBy: genre.cross_influenced_by.map(genreToItem),
    crossInfluenced: genre.cross_influenced.map(genreToItem)
  })
};
