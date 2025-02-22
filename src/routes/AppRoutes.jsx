import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp"
import { routerPath } from "../constants/routerConstant";
import PrivateRoutes from "./PrivateRoutes";
import Users from "../pages/Users";
import { authService } from "../services/authService";
import Books from "../pages/Books";
import BookOperations from "../pages/BookOperations";
import UserDetails from "../pages/UserDetails";
import BookDetails from "../pages/BookDetails";
import AddBook from "../pages/AddBook";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Default Routes */}
            <Route path={routerPath.DEFAULT} element={authService.isLoggedIn() ? <Navigate to={routerPath.BOOKS} /> : <Navigate to={routerPath.LOGIN} />} />
            {/* Public Routes */}
            <Route path={routerPath.LOGIN} element={<Login />} />
            <Route path={routerPath.SIGN_UP} element={<SignUp />} />
            {/* Private Routes */}
            <Route path={routerPath.USERS}
                element={<PrivateRoutes children={<Users />} />} />
            <Route path={`${routerPath.USERS}/:id`}
                element={<PrivateRoutes children={<UserDetails />} />} />
            <Route path={routerPath.BOOKS}
                element={<PrivateRoutes children={<Books />} />} />
            <Route path={routerPath.ADD_BOOK}
                element={<PrivateRoutes children={<AddBook />} />} />
            <Route path={`${routerPath.BOOKS}/:id`}
                element={<PrivateRoutes children={<BookDetails />} />} />
            <Route path={routerPath.BOOK_OPERATIONS}
                element={<PrivateRoutes children={<BookOperations />} />} />
            {/* Handling Fallback routes */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;