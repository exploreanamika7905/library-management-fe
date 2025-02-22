import { useNavigate } from "react-router-dom";
import { routerPath } from "../constants/routerConstant";
import { authService } from "../services/authService";
import MainLayout from "../layout/MainLayout";
import { useEffect } from "react";

const PrivateRoutes = ({children}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!authService.isLoggedIn()) {
            return navigate(routerPath.LOGIN);
        }
    }, [])
    return <MainLayout children={children}/>;
}

export default PrivateRoutes;