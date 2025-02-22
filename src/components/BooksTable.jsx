import { NavLink } from "react-router-dom";
import { routerPath } from "../constants/routerConstant";

const BooksTable = (props) => {
    const {books, cardTableClass}  = props;
    return (
        <div className={`card card-table ${cardTableClass}`}>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Book Title</th>
                        <th scope="col">Book Code</th>
                        <th scope="col">Details Link</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length ?
                        <>
                            {
                                books.map((book, key) => {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{key + 1}</th>
                                            <td className="text-capitalize">{book.title}</td>
                                            <td>{book.bookId}</td>
                                            <td><NavLink className="btn btn-sm btn-success" to={`${routerPath.BOOKS}/${book._id}`}>View Details</NavLink></td>
                                        </tr>
                                    );
                                })
                            }
                        </>
                        :
                        <tr><td colSpan={4} className="text-center">No Books Found</td></tr>}
                </tbody>
            </table>
        </div>
    );
}

export default BooksTable;