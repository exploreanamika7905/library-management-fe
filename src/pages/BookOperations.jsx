import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import FormInput from "../components/FormInput";
import { validateEmail } from "../utils/validation";
import { bookIssue, bookRenew, bookReturn } from "../services/bookOperationsService";
import AutoDismissToast from "../components/AutoDismissToast";

const BookOperations = () => {
    const errorInit = {
        emailErr: '',
        bookIdErr: '',
        errMsg: ''
    }
    const [key, setKey] = useState('bookIssue');
    const [email, setEmail] = useState('');
    const [bookId, setBookId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(errorInit);
    const [isSuccessToast, setSuccessToast] = useState(false);

    const handleEmailBlur = (value) => {
        if (!value) {
            setError({ ...error, emailErr: 'Please enter email' });
            return;
        };
        if (!validateEmail(value)) {
            setError({ ...error, emailErr: 'Please enter valid email' });
        } else {
            setError({ ...error, emailErr: '' });
        }
    }

    const handleBookIdBlur = (value) => {
        if (!value) {
            setError({ ...error, bookIdErr: 'Please enter book id' });
        } else {
            setError({ ...error, bookIdErr: '' });
        }
    }

    const ontabSelect = (eventKey) => {
        setKey(eventKey);
        setError(errorInit);
        setEmail('');
        setBookId('');
    }

    const handleOnClick = async (operationType) => {
        setLoading(true);
        let res;
        try {
            if (operationType === 'issue') {
                res = await bookIssue(email, bookId);
            } else if (operationType === 'return') {
                res = await bookReturn(email, bookId);
            } else {
                res = await bookRenew(email, bookId);
            }
            console.log(res);
            setEmail('');
            setBookId('');
            setSuccessToast(true);
        } catch (err) {
            console.log(err.message);
            setError({ ...error, errMsg: "Email or Book Id didn't matched" });
        } finally {
            setLoading(false);
        }
    }

    const handleDisabled = () => {
        return error.emailErr.length || error.bookIdErr.length || !email.length || !bookId.length || loading;
    }

    const operationJSx = (operationType) => <div className="operation-wrap">
        <FormInput type="email" label={'Email'} value={email} handleChange={(e) => setEmail(e.target.value)} required={true}
            validationMessage={error.emailErr} handleOnBlur={() => handleEmailBlur(email)} />
        <FormInput type="text" label={'Book Id'} value={bookId} handleChange={(e) => setBookId(e.target.value)} required={true}
            validationMessage={error.bookIdErr} handleOnBlur={() => handleBookIdBlur(bookId)} />
        <div className="mt-4">
            <button type="button" className="btn btn-success" onClick={() => handleOnClick(operationType)} disabled={handleDisabled()}>Book Issue</button>
        </div>
    </div>

    return (
        <div className="page-books">
            <div className="container">
                <h1 className="fs-3 mb-4">Book Operations</h1>
                <Tabs
                    id="controlled-tab"
                    activeKey={key}
                    onSelect={(eventKey) => ontabSelect(eventKey)}
                    className="mb-3"
                >
                    <Tab eventKey="bookIssue" title="Book Issue">
                        {operationJSx('issue')}
                    </Tab>
                    <Tab eventKey="bookReturn" title="Book Return">
                        {operationJSx('return')}
                    </Tab>
                    <Tab eventKey="bookRenew" title="Book Renew">
                        {operationJSx('renew')}
                    </Tab>
                </Tabs>
                {isSuccessToast && <AutoDismissToast message={'Book Operation Success'} position="bottom-end" showToast={isSuccessToast} setShowToast={setSuccessToast} />}
            </div>
        </div>
    );
}

export default BookOperations;