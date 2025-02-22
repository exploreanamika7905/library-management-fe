import { useNavigate } from "react-router-dom"
import { authService } from "../services/authService";
import { routerPath } from "../constants/routerConstant";

const Logout = (props) => {
    const { btnClass } = props;
    const navigate = useNavigate();
    const onLogout = () => {
        authService.logout();
        navigate(routerPath.LOGIN);
    }
    return (
        <button type="button" onClick={onLogout} className={btnClass}>Logout</button>
    );
}

export default Logout;