import { NavLink, useParams } from "react-router-dom";
import { getBookById } from "../services/bookService";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { bookImg } from "../constants/imgConst";
import { getUserById } from "../services/userService";
import UsersTable from "../components/UsersTable";
import { routerPath } from "../constants/routerConstant";
import { formatDate } from "../utils/formateDate";

const BookDetails = () => {
    const { id } = useParams(); // Get the id from the route parameters
    const [book, setBook] = useState(null);
    const [issuedTo, setIssuedTo] = useState(null);
    const [reservedBy, setReservedBy] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await getBookById(id);
                if (result.success) {
                    setBook(result.data);
                    if (result.data.issuedTo) {
                        const userDetails = await fetchUserDetails(result.data.issuedTo);
                        setIssuedTo(userDetails);
                    }
                    if (result.data.reservedBy.length) {
                        // Fetch all users details reserved by in parallel
                        const userDetailsPromises = result.data.reservedBy.map(bookId => fetchUserDetails(bookId));
                        const usersDetails = await Promise.all(userDetailsPromises);

                        // Update state with reserved by users details
                        setReservedBy(usersDetails);
                    }
                } else {
                    setError(result.message);
                }
            } catch (error) {
                setError('Failed to fetch book details');
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetail();
    }, [id]);

    const fetchUserDetails = async (id) => {
        try {
            const res = await getUserById(id);
            return res.data;
        } catch (error) {
            console.error(error.message);
        }
    }

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="page-book-details">
            <div className="container">
                {book ? (
                    <>
                        <h1 className="fs-3 mb-3 mb-md-4">Book Details</h1>
                        <div className="row">
                            <div className="col-md-5">
                                <figure className="img-holder">
                                    {Object.keys(bookImg).includes(book.imgURL) && <img className="img-fluid" src={bookImg[book.imgURL]} alt={book.imgURL} />}
                                </figure>
                            </div>
                            <div className="col-md-7">
                                <div className="row mb-3 align-items-center">
                                    <div className="col-md-6">
                                        <h2 className="fs-6 mb-md-0">Book Name</h2>
                                    </div>
                                    <div className="col-md-6">
                                        {book.title}
                                    </div>
                                </div>
                                <div className="row mb-3 align-items-center">
                                    <div className="col-md-6">
                                        <h2 className="fs-6 mb-md-0">Book Id</h2>
                                    </div>
                                    <div className="col-md-6">
                                        {book.bookId}
                                    </div>
                                </div>
                                {book.dueDate &&
                                    <div className="row mb-3 align-items-center">
                                        <div className="col-md-6">
                                            <h2 className="fs-6 mb-md-0">Book Due Date</h2>
                                        </div>
                                        <div className="col-md-6">
                                            {formatDate(book.dueDate, 'DD/MM/YYYY')}
                                        </div>
                                    </div>
                                }
                                <div className="row mb-3 align-items-center">
                                    <div className="col-md-6">
                                        <h2 className="fs-6 mb-md-0">Book Issued to</h2>
                                    </div>
                                    <div className="col-md-6">
                                        {
                                            book.issuedTo ?
                                                <NavLink className="text-capitalize" to={`${routerPath.USERS}/${issuedTo._id}`}>{issuedTo.name}</NavLink>
                                                :
                                                <p className="mb-0">Not Assingned</p>
                                        }
                                    </div>
                                </div>
                                <h2 className="fs-6">Book Reserved by</h2>
                                {
                                    book.reservedBy.length ?
                                        <UsersTable users={reservedBy} cardTableClass="mb-3" />
                                        :
                                        <p>Not Reserved</p>
                                }
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Book not found</p>
                )}
            </div>
        </div>
    );
}

export default BookDetails;