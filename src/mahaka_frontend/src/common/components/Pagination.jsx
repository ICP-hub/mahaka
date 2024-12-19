import { useDispatch } from "react-redux";
import {
  decrementPage,
  incrementPage,
  setPage,
} from "../../redux/reducers/paginationReducer/paginationReducer";

const Pagination = ({ totalPage = 0, currentPage = 0, base }) => {
  const dispatch = useDispatch();

  const handlePageChange = (event) => {
    const selectedPage = parseInt(event.target.value);
    dispatch(setPage({ key: base, value: selectedPage }));
  };

  return (
    <div className="flex justify-center items-center px-4 py-2 space-x-4">
      <button
        className="px-4 py-2 border rounded bg-card border-border hover:bg-hover"
        onClick={() => dispatch(decrementPage({ key: base }))}
      >
        Previous
      </button>
      <div className="flex items-center space-x-2">
        <div className="text-sm">Page</div>
        <select
          className="w-16 p-2 border-border border bg-card rounded text-center"
          value={currentPage}
          onChange={handlePageChange}
        >
          {Array.from({ length: totalPage }, (_, index) => index + 1).map(
            (page) => (
              <option key={page} value={page}>
                {page}
              </option>
            )
          )}
        </select>
      </div>
      <div className="text-sm">
        Page {currentPage} of {totalPage}
      </div>
      <button
        className="px-4 py-2 border rounded bg-card border-border hover:bg-hover"
        onClick={() => dispatch(incrementPage({ key: base }))}
        disabled={currentPage === totalPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
