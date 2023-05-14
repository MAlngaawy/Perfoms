import { useState, useEffect, Dispatch, SetStateAction } from "react";
import ReactPaginate from "react-paginate";

type PagenationProps = {
  pageCount: number | undefined;
  setPage: Dispatch<SetStateAction<number | undefined>>;
  searchInputValue?: string;
};

function Pagenation({ pageCount, searchInputValue, setPage }: PagenationProps) {
  const [currentSearchInputValue, setCurrentSearchInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);

  useEffect(() => {
    // Reset the current page to 1 when the search input value changes
    setCurrentPage(1);
    setCurrentSearchInputValue(searchInputValue || "");
  }, [searchInputValue]);

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected + 1);
    setCurrentPage(event.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel=".."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={(pageCount && pageCount > 1 && pageCount) || 0}
      previousLabel="<"
      renderOnZeroPageCount={null}
      className="flex justify-center items-center gap-4 "
      pageLinkClassName="w-6 flex justify-center items-center rounded-full hover:bg-blue-400 hover:pointer"
      activeLinkClassName="bg-perfBlue rounded-full text-white hover:bg-perfBlue"
      nextLinkClassName="bg-gray-200 w-6 flex justify-center items-center rounded-full pointer transform hover:scale-105"
      previousLinkClassName="bg-gray-200 w-6 flex justify-center items-center rounded-full pointer transform hover:scale-105"
      forcePage={
        currentSearchInputValue === searchInputValue
          ? (currentPage || 0) - 1
          : 0
      }
    />
  );
}

export default Pagenation;
