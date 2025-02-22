import { useState } from "react";
import FormInput from "../components/FormInput";
import AutoDismissToast from "../components/AutoDismissToast";
import { useNavigate } from "react-router-dom";
import { createBook } from "../services/bookService";

const AddBook = () => {
    const bookInit = {
        title: '',
        bookId: '',
        author: '',
        genre: '',
        publicationYear: 0,
        imgURL: ''
    }
    const [book, setBook] = useState(bookInit);
    const [error, setError] = useState({
        titleErr: '',
        bookIdErr: '',
        authorErr: '',
    });
    const [isSuccessToast, successToast] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleTitleBlur = (value) => {
        if (!value) {
            setError({ ...error, titleErr: 'Please enter title' });
        } else {
            setError({ ...error, titleErr: '' });
        }
    }

    const handleBookIdBlur = (value) => {
        if (!value) {
            setError({ ...error, bookIdErr: 'Please enter book id' });
        } else {
            setError({ ...error, bookIdErr: '' });
        }
    }

    const handleAuthorlur = (value) => {
        if (!value) {
            setError({ ...error, authorErr: 'Please enter author name' });
        } else {
            setError({ ...error, authorErr: '' });
        }
    }

    const handleDisabled = () => {
        return !book.title || !book.bookId || !book.author || loading;
    }

    const handleAddBook = async () => {
        let _book = { ...book };
        let payload = {};
        payload.title = _book.title.trim();
        payload.bookId = _book.bookId.trim();
        payload.author = _book.author.trim();
        payload.genre = _book.genre.trim();
        payload.publicationYear = _book.publicationYear.trim();
        payload.imgURL = _book.imgURL.trim();
        setLoading(true);
        try {
            const res = await createBook(payload);
            console.log(res);
            successToast(true);
            setBook(bookInit);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <div className="page-box">
            <div className="container">
                <h1 className="fs-3 text-center">
                    Add Book
                </h1>
                <FormInput type="text" label={'Book Title'} value={book.title} handleChange={(e) => setBook({ ...book, title: e.target.value })} required={true}
                    validationMessage={error.titleErr} handleOnBlur={() => handleTitleBlur(book.title)} />
                <FormInput type="text" label={'Book ID'} value={book.bookId} handleChange={(e) => setBook({ ...book, bookId: e.target.value })}
                    required={true} validationMessage={error.bookIdErr} handleOnBlur={() => handleBookIdBlur(book.bookId)} />
                <FormInput type="text" label={'Author Name'} value={book.author} handleChange={(e) => setBook({ ...book, author: e.target.value })}
                    required={true} validationMessage={error.authorErr} handleOnBlur={() => handleAuthorlur(book.author)} />
                <FormInput type="text" label={'Genre'} value={book.genre} handleChange={(e) => setBook({ ...book, genre: e.target.value })} />
                <FormInput type="number" label={'Publication Year'} value={book.publicationYear} handleChange={(e) => setBook({ ...book, publicationYear: e.target.value })} />
                <FormInput type="text" label={'Image Name'} value={book.imgURL} handleChange={(e) => setBook({ ...book, imgURL: e.target.value })} />
                <div className="text-center">
                    <button type="button" onClick={handleAddBook} className="btn btn-success" disabled={handleDisabled()}>
                        Add Book
                    </button>
                    <button type="button" className="btn btn-outline-success ms-3" onClick={handleGoBack}>Go Back</button>
                </div>
                {isSuccessToast && <AutoDismissToast message={'Book Added Successfylly'} position="bottom-end" showToast={isSuccessToast} setShowToast={successToast} />}
            </div>
        </div>
    );
}

export default AddBook;