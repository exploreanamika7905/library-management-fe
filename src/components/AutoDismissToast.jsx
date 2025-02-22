import { useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const AutoDismissToast = (props) => {
    const { message, showToast, setShowToast, position } = props;
    useEffect(() => {
        let timerid = setTimeout(() => {
            setShowToast(false);
        }, 1000);

        return () => {
            clearTimeout(timerid)
        }
    }, [])
    return (
        <ToastContainer position={ position ? position : 'top-end'} className="p-3">
            <Toast show={showToast} onClose={() => setShowToast(false)}>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default AutoDismissToast;