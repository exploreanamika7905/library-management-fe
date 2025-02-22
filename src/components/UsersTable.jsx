import { NavLink } from "react-router-dom";
import { routerPath } from "../constants/routerConstant";

const UsersTable = (props) => {
    const {users, cardTableClass}  = props;
    return (
        <div className={`card card-table ${cardTableClass}`}>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">User Name</th>
                        <th scope="col">User Email</th>
                        <th scope="col">Details Link</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length ?
                        <>
                            {
                                users.map((user, key) => {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{key + 1}</th>
                                            <td className="text-capitalize">{user.name}</td>
                                            <td>{user.email}</td>
                                            <td><NavLink className="btn btn-sm btn-success" to={`${routerPath.USERS}/${user._id}`}>View Details</NavLink></td>
                                        </tr>
                                    );
                                })
                            }
                        </>
                        :
                        <tr><td colSpan={4} className="text-center">No Users Found</td></tr>}
                </tbody>
            </table>
        </div>
    );
}

export default UsersTable;