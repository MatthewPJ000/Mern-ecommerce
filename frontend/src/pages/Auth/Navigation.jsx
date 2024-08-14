import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className='sticky flex justify-around top-0 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-rose-900/10 dark:border-rose-50/[0.06] bg-rose-400 supports-backdrop-blur:bg-rose/60 dark:bg-transparent '      
      >
        <h3 className="head_text"><span className="blue_gradient">Shopping Site</span></h3>
       <nav className="hidden flex-col gap-20 text-lg font-medium md:flex md:flex-row md:items-center md:gap-15 lg:gap-20 dark:border-slate-50/[0.06] py-4">
        <Link
          to="/"
          className="text-foreground transition-colors hover:bg-rose-500  flex"
        >
          <AiOutlineHome className="mr-2 mt-[1rem]" size={26} />
          <span className="hidden nav-item-name mt-[1rem]">HOME</span>{" "}
        </Link>

        <Link
          to="/shop"
          className="text-foreground transition-colors hover:bg-rose-500 flex"
        >
          <AiOutlineShopping className="mr-2 mt-[1rem]" size={26} />
          <span className="hidden nav-item-name mt-[1rem]">SHOP</span>{" "}
        </Link>

        <Link to="/cart" className="flex relative">
          <div className="text-foreground transition-colors hover:bg-rose-500 flex ">
            <AiOutlineShoppingCart className="mt-[1rem] mr-2" size={26} />
            <span className="hidden nav-item-name mt-[1rem]">Cart</span>{" "}
          </div>

          <div className="absolute top-30">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>

        <Link to="/favorite" className="flex relative">
          <div className="text-foreground transition-colors hover:bg-rose-500 flex">
            <FaHeart className="mt-[1rem] mr-2" size={20} />
            <span className="hidden nav-item-name mt-[1rem]">
              Favorites
            </span>{" "}
            <FavoritesCount />
          </div>
        </Link>
      </nav>

      
      <div className="relative flex">

        <button
          onClick={toggleDropdown}
          className="flex items-center text-amber-800 focus:outline-none"
        >
          {userInfo ? (
            <h3 className="text-white">{userInfo.username}</h3>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute left-20 mt-2 mr-14 space-y-2 bg-white text-amber-600 ${
              !userInfo.isAdmin ? "-back-20" : "-back-80"
            } `}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-amber-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-amber-100"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-amber-100"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-amber-100"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-amber-100"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-amber-100">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-amber-100"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
        {!userInfo && (
          <ul className="flex gap-20">
            <li>
              <Link
                to="/login"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                <span className="hidden nav-item-name">LOGIN</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={26} />
                <span className="hidden nav-item-name">REGISTER</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
