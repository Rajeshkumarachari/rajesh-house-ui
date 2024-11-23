import { useEffect, useState } from "react";
import logo from "../assets/bnb.png";
import { GrSearch } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className=" bg-slate-100 shadow-md">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <div className=" flex cursor-pointer rounded-md w-fit gap-2">
            <img src={logo} alt="logo" className=" size-7" />
            <h1 className=" text-rose-500 text-lg sm:text-2xl font-medium">
              rajeshbnb
            </h1>
          </div>
        </Link>
        <form
          onSubmit={handleSubmit}
          className=" bg-slate-50 px-3  rounded-3xl flex "
        >
          <input
            type="text"
            placeholder="Search destinations"
            className=" bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className=" cursor-pointer">
            <GrSearch className=" size-11 rounded-full text-white bg-rose-500 p-3" />
          </button>
        </form>
        <ul className=" flex text-lg font-normal ">
          <Link
            to="/"
            className=" hidden sm:inline hover:bg-slate-200 hover:underline p-2 cursor-pointer rounded-lg"
          >
            <li>Home</li>
          </Link>
          <Link
            to="/about"
            className=" hidden sm:inline hover:bg-slate-200 hover:underline p-2 cursor-pointer rounded-lg"
          >
            <li>About</li>
          </Link>
          {currentUser ? (
            <Link to="/profile" className=" p-2">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                  <img src={currentUser?.avatar} />
                </div>
              </div>
            </Link>
          ) : (
            <Link to="/sign-in" className=" p-2">
              <li className=" ">Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
