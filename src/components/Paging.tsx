import ReactPaginate from "react-paginate";
interface PagingProps {
    pageCount: number;
    handlePageClick(event:any): undefined;
    show: boolean;
    initialPage?: number;
}

export default function Paging({pageCount, handlePageClick, show, initialPage}: PagingProps) {
  return (
    <ReactPaginate
    previousLabel={"←"}
    nextLabel={"→"}
    pageCount={pageCount}
    onPageChange={handlePageClick}
    containerClassName={show?"pagination":"pagination hidden"}
    previousLinkClassName={"pagination__link"}
    nextLinkClassName={"pagination__link"}
    disabledClassName={"pagination__link--disabled"}
    activeClassName={"pagination__link--active"}
    pageRangeDisplayed={4}
    marginPagesDisplayed={0}
    initialPage={initialPage}
  />
  );
}
