import React from 'react';

export const PaginationWrapper = ({children, currentPage, totalPages, onPrevClick,
                               onNextClick, handleLastPage, handleFirstPage}) => {

    const handleNextClick = () => {
        if (currentPage + 1 <= totalPages) {
            onNextClick && onNextClick(currentPage + 1)
        }
    }

    const handlePrevClick = () => {
        if (currentPage - 1 > 0) {
            onPrevClick && onPrevClick(currentPage - 1)
        }
    }

    const handleLastPageClick = () => {
        handleLastPage && handleLastPage(totalPages)
    }

    const handleFirstPageClick = () => {
        handleFirstPage && handleFirstPage(1)

    }


    return (
        <div>
            <button disabled={currentPage === 1} onClick={handleFirstPageClick}>first page</button>
            <button disabled = {currentPage - 1 === 0} onClick={handlePrevClick}>prev page</button>
            <span>{currentPage} of {totalPages}</span>
            <button disabled={currentPage + 1 > totalPages} onClick={handleNextClick}>next page</button>
            <button disabled={currentPage === totalPages} onClick={handleLastPageClick}>last page</button>


            {children}
        </div>
    )
}