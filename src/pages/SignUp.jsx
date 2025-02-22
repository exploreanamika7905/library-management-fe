import { useState } from "react";
import FormInput from "../components/FormInput";
import { role } from "../constants/userConstants";
import { validateEmail } from "../utils/validation";
import { createUser } from "../services/userService";
import AutoDismissToast from "../components/AutoDismissToast";
import { routerPath } from "../constants/routerConstant";
import { NavLink, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

const SignUp = () => {
    const userPayloadInit = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userPayload, setUserPayload] = useState(userPayloadInit);
    const [error, setError] = useState({
        nameErr: '',
        emailErr: '',
        passwordErr: '',
        confirmPasswordErr: ''
    });
    const [isSignUpToast, setIsSignUpToast] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFirstNameBlur = (value) => {
        if (!value) {
            setError({ ...error, nameErr: 'Please enter firstname' });
        } else {
            setError({ ...error, nameErr: '' });
        }
    }

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

    const handlePasswordBlur = (value) => {
        if (!value) {
            setError({ ...error, passwordErr: 'Please enter password' });
        } else {
            setError({ ...error, passwordErr: '' });
        }
    }

    const handleConfirmPasswordBlur = (value) => {
        if (!value) {
            setError({ ...error, confirmPasswordErr: 'Please enter confirm password' });
        } else if (userPayload.password !== value) {
            setError({ ...error, confirmPasswordErr: 'Confirm password mis-match' });
        } else {
            setError({ ...error, confirmPasswordErr: '' });
        }
    }

    const handleDisabled = () => {
        return error.emailErr.length || error.passwordErr.length || !firstName.length || !userPayload.email.length ||
            !userPayload.password.length || !userPayload.confirmPassword.length || loading;
    }

    const handleSignUp = async () => {
        let _userPayload = { ...userPayload };
        let payload = {};
        payload.name = (`${firstName} ${lastName}`).trim();
        payload.email = _userPayload.email.trim();
        payload.password = _userPayload.password.trim();
        payload.role = role.STUDENT;
        setLoading(true);
        try {
            const res = await createUser(payload);
            console.log(res);
            setIsSignUpToast(true);
            setFirstName('');
            setLastName('');
            setUserPayload(userPayloadInit);
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
        <div className="page-signup">
            <div className="page-box">
                <div className="container">
                    <h1 className="fs-3 text-center">
                        {authService.isLoggedIn() ? 'Add User' : 'Sign Up'}
                    </h1>
                    <FormInput type="text" label={'First Name'} value={firstName} handleChange={(e) => setFirstName(e.target.value)} required={true}
                        validationMessage={error.nameErr} handleOnBlur={() => handleFirstNameBlur(firstName)} />
                    <FormInput type="text" label={'Last Name'} value={lastName} handleChange={(e) => setLastName(e.target.value)} />
                    <FormInput type="email" label={'Email'} value={userPayload.email} handleChange={(e) => setUserPayload({ ...userPayload, email: e.target.value })}
                        required={true} validationMessage={error.emailErr} handleOnBlur={() => handleEmailBlur(userPayload.email)} />
                    <FormInput type="password" label={'Password'} value={userPayload.password} handleChange={(e) => setUserPayload({ ...userPayload, password: e.target.value })}
                        required={true} validationMessage={error.passwordErr} handleOnBlur={() => handlePasswordBlur(userPayload.password)} />
                    <FormInput type="password" label={'Confirm Password'} value={userPayload.confirmPassword}
                        handleChange={(e) => setUserPayload({ ...userPayload, confirmPassword: e.target.value })}
                        required={true} validationMessage={error.confirmPasswordErr} handleOnBlur={() => handleConfirmPasswordBlur(userPayload.confirmPassword)} />
                    <div className="text-center">
                        <button type="button" onClick={handleSignUp} className="btn btn-success" disabled={handleDisabled()}>
                            {authService.isLoggedIn() ? 'Add User' : 'Sign Up'}
                        </button>
                        {authService.isLoggedIn() ? <button type="button" className="btn btn-outline-success ms-3" onClick={handleGoBack}>Go Back</button> : <p className="pt-3 mb-0">Already a member? <NavLink to={routerPath.LOGIN}>Login</NavLink></p>}
                    </div>
                    {isSignUpToast && <AutoDismissToast message={'Sing Up Success'} showToast={isSignUpToast} setShowToast={setIsSignUpToast} />}
                </div>
            </div>
        </div>
    );
}

export default SignUp;