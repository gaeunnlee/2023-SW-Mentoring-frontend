import ReactPaginate from "react-paginate";
import { NumberLiteralType } from "typescript";

interface PagingProps {
    pageCount: number;
    handlePageClick(event:any): undefined;
}

export default function Paging({pageCount, handlePageClick}: PagingProps) {
  return (
    <ReactPaginate
    previousLabel={"←"}
    nextLabel={"→"}
    pageCount={pageCount}
    onPageChange={handlePageClick}
    containerClassName={"pagination"}
    previousLinkClassName={"pagination__link"}
    nextLinkClassName={"pagination__link"}
    disabledClassName={"pagination__link--disabled"}
    activeClassName={"pagination__link--active"}
    pageRangeDisplayed={4}
    marginPagesDisplayed={0}
  />
  );
}
