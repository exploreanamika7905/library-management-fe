import { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import Loader from "../components/Loader";
import { bookImg } from "../constants/imgConst";
import { routerPath } from "../constants/routerConstant";
import { NavLink } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            setError(null); // Reset error state before fetching
            try {
                const result = await getBooks();
                if (result.success) {
                    console.log(result.data);
                    setBooks(result.data);
                } else {
                    setError(result.message);
                }
            } catch (error) {
                setError('Failed to fetch books');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="page-books">
            <div className="container">
                <PageHeader title="Books" actions={
                    <NavLink className="btn btn-success" to={routerPath.ADD_BOOK}>Add Book</NavLink>} />
                {
                    books.length ?
                        <div className="row">
                            {
                                books.map((book, key) => {
                                    return (
                                        <div key={key} className="col-lg-6 mb-3">
                                            <div className="card book-card">
                                                <div className="book-wrap">
                                                    <div className="book-img">
                                                        {Object.keys(bookImg).includes(book.imgURL) && <img className="img-fluid" src={bookImg[book.imgURL]} />}
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <h3 className="fs-4">{book.title}</h3>
                                                    <div className="book-desc-wrap">
                                                        <h6 className="fs-6 mb-0">Book Code</h6>
                                                        <p className="mb-0 fw-semibold">{book.bookId}</p>
                                                    </div>
                                                    {
                                                        book.genre &&
                                                        <div className="book-desc-wrap">
                                                            <h6 className="fs-6 mb-0">Genre</h6>
                                                            <p className="mb-0">{book.genre}</p>
                                                        </div>
                                                    }
                                                    {
                                                        book.publicationYear &&
                                                        <div className="book-desc-wrap">
                                                            <h6 className="fs-6 mb-0">Publication year</h6>
                                                            <p className="mb-0">{book.publicationYear}</p>
                                                        </div>
                                                    }
                                                    <div className="book-desc-wrap">
                                                        <h6 className="fs-6 mb-0">Book Availability</h6>
                                                        <p className={`mb-0 fw-semibold ${book.available ? 'text-success' : 'text-danger'}`}>{book.available ? 'Yes' : 'No'}</p>
                                                    </div>
                                                    <div className="book-desc-wrap mb-0 mt-3">
                                                        <NavLink className="btn btn-sm btn-success" to={`${routerPath.BOOKS}/${book._id}`}>View Details</NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        :
                        <div>
                            <p className="mb-0">No Books Found</p>
                        </div>
                }
            </div>
        </div>
    );
}

export default Books;