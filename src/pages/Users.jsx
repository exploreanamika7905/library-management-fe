import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import Loader from "../components/Loader";
import UsersTable from "../components/UsersTable";
import PageHeader from "../components/PageHeader";
import { NavLink } from "react-router-dom";
import { routerPath } from "../constants/routerConstant";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null); // Reset error state before fetching
            try {
                const result = await getUsers();
                if (result.success) {
                    console.log(result.data);
                    setUsers(result.data);
                } else {
                    setError(result.message);
                }
            } catch (error) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <Loader/>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="page-user">
            <div className="container">
                <PageHeader title="Users" actions={
                    <NavLink className="btn btn-success" to={routerPath.SIGN_UP}>Add User</NavLink>
                } />
                <UsersTable users={users} />
            </div>
        </div>
    );
}

export default Users;