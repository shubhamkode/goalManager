import { useDispatch, useSelector } from "react-redux";
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import { RootState } from "@/features/store";
import { logout } from "@/features/store/auth/authSlice";

export default function Header() {
  const dispatch = useDispatch();

  const { userToken } = useSelector((state: RootState) => state.auth);

  return (
    <div className="w-full py-2 border-b-2 shadow-md">
      <div className="container flex items-center justify-between px-4 py-2 mx-auto">
        <Link to="/" className="text-2xl tracking-wider text-blue-800">
          {" "}
          GoalSetter
        </Link>
        {!userToken ? (
          <ul className="flex items-center space-x-4">
            <li>
              <Link
                className="flex items-center px-5 py-2 space-x-1 text-sm font-bold text-blue-800 duration-200 rounded ring-2 ring-blue-800 hover:scale-105"
                to="/auth/login"
              >
                <FaSignInAlt /> <span>Login</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center px-5 py-2 space-x-1 text-sm font-bold text-white duration-200 bg-blue-800 rounded ring-2 ring-blue-800 hover:scale-105"
                to="/auth/register"
              >
                <FaUser /> <span>Register</span>
              </Link>
            </li>
          </ul>
        ) : (
          <button
            className="flex items-center px-5 py-2 space-x-1 text-sm font-bold text-white duration-200 bg-blue-800 rounded ring-2 ring-blue-800 hover:scale-105"
            onClick={() => dispatch(logout())}
          >
            <FaSignOutAlt /> <span>SignOut</span>
          </button>
        )}
      </div>
    </div>
  );
}
