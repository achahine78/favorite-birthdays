import React from 'react';
import { render, screen } from '@testing-library/react';
import LikesDisplay from './LikesDisplay';

describe('LikesDisplay', () => {
  const likesMap = {
    '2022-01-01': { date: '2022-01-01', text: 'Liked item 1', year: 2022 },
    '2022-01-02': { date: '2022-01-02', text: 'Liked item 2', year: 2022  },
    '2022-01-03': { date: '2022-01-02', text: 'Liked item 3', year: 2022  },
  };

  it('renders a list of likes by date', () => {
    render(<LikesDisplay likesMap={likesMap} />);

    expect(screen.getByText('2022-01-01')).toBeInTheDocument();
    expect(screen.getByText('2022-01-02')).toBeInTheDocument();

    expect(screen.getByText('Liked item 1')).toBeInTheDocument();
    expect(screen.getByText('Liked item 2')).toBeInTheDocument();
    expect(screen.getByText('Liked item 3')).toBeInTheDocument();
  });

  it("should render no likes yet when likes is empty", () => {

    render(<LikesDisplay likesMap={{}} />)

    expect(screen.getByText("No likes yet")).toBeInTheDocument();
  });

});