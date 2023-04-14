import { render, screen, fireEvent } from "@testing-library/react";
import ResultsDisplay from "./ResultsDisplay";

describe("ResultsDisplay component", () => {
  it("should filter items based on the search term", () => {
    const items = [{ text: "Anna", date: '2022-01-01', year: 2022}, { text: "Betty", date: '2022-01-01', year: 2022 }, { text: "Charles", date: '2022-01-01', year: 2022 }];
    let likesMap = {};
    const setLikesMap = (value: any) => {
        likesMap = value;
    }
    render(<ResultsDisplay items={items} likesMap={{}} setLikesMap={setLikesMap} isResultsLoading={false} />);

    // search for 'a'
    const searchInput = screen.getByLabelText("Search:");
    fireEvent.change(searchInput, { target: { value: "a" } });

    expect(screen.getAllByTestId("listitem")).toHaveLength(2);

    // search for 'an'
    fireEvent.change(searchInput, { target: { value: "an" } });

    expect(screen.getAllByTestId("listitem")).toHaveLength(1);
    expect(screen.getByText("Anna")).toBeInTheDocument();
  });

  it("should render the loading spinner when isResultsLoading is true", () => {
    const items = [{ text: "Anna", date: '2022-01-01', year: 2022}, { text: "Betty", date: '2022-01-01', year: 2022 }, { text: "Charles", date: '2022-01-01', year: 2022 }];
    let likesMap = {};
    const setLikesMap = (value: any) => {
        likesMap = value;
    }
    render(<ResultsDisplay items={items} likesMap={{}} setLikesMap={setLikesMap} isResultsLoading={true} />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should not render the loading spinner when isResultsLoading is false", () => {
    const items = [{ text: "Anna", date: '2022-01-01', year: 2022}, { text: "Betty", date: '2022-01-01', year: 2022 }, { text: "Charles", date: '2022-01-01', year: 2022 }];
    let likesMap = {};
    const setLikesMap = (value: any) => {
        likesMap = value;
    }
    render(<ResultsDisplay items={items} likesMap={{}} setLikesMap={setLikesMap} isResultsLoading={false} />);

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("should render no data to display when items is empty", () => {
    const items: any[] = [];
    let likesMap = {};
    const setLikesMap = (value: any) => {
        likesMap = value;
    }
    render(<ResultsDisplay items={items} likesMap={{}} setLikesMap={setLikesMap} isResultsLoading={false} />);

    expect(screen.getByText("No data to display")).toBeInTheDocument();
  });

});