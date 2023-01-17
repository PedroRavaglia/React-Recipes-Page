import ReactPaginate from 'react-paginate';

export default function Pagination({ currentPage, setCurrentPage, currentPageRef, pageCount }) {
    const paginate = (event) => {
      const pageNumber = event.selected + 1;
      if (currentPage > pageNumber) {
        currentPageRef.current.style.animation = "prevPage .8s forwards";
      } 
      else {
        currentPageRef.current.style.animation = "nextPage .8s forwards";
      }
      setCurrentPage(pageNumber);
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };

    return (
      <ReactPaginate
        previousLabel="&laquo;"
        nextLabel="&raquo;"
        pageClassName="page-item" // 	The classname on tag li of each page element.
        pageLinkClassName="page-link" // The classname on tag a of each page element.
        previousClassName="page-item" // The classname on tag li of the previous button.
        previousLinkClassName="page-link" // The classname on tag a of the previous button.
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={paginate}
        containerClassName="pagination"
        activeClassName="active"
      />
    );
}