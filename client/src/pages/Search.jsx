import { useEffect, useState } from "react";
import ListingItem from "../components/ListingItem";
import { useNavigate, useLocation } from "react-router-dom";
import ShimmerEffect from "../components/ShimmerEffect";

export default function Search() {
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }
    const fetchListings = async () => {
      try {
        setLoading(true);
        setShowMore(false);
        const searchQuery = urlParams;
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        setListings(data);
        setLoading(false);
        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, [location.search]);
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams;
    navigate(`/search?${searchQuery}`);
  };
  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className=" flex flex-col md:flex-row">
      <div className=" p-7 border-b-2  md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className=" flex flex-col gap-8">
          <div className="">
            <label className="input input-bordered flex items-center gap-2 w-fit">
              <input
                type="text"
                className="grow"
                id="searchTerm"
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className=" flex gap-2 flex-wrap items-center">
            <label className=" text-lg font-semibold"> Type :</label>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-info"
                id="all"
                checked={sidebardata.type === "all"}
                onChange={handleChange}
              />
              <label className=" cursor-pointer">Rent & Sale</label>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-info"
                id="rent"
                checked={sidebardata.type === "rent"}
                onChange={handleChange}
              />
              <label className=" cursor-pointer">Rent</label>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-info"
                id="sale"
                checked={sidebardata.type === "sale"}
                onChange={handleChange}
              />
              <label className=" cursor-pointer">Sale</label>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-info"
                id="offer"
                checked={sidebardata.offer}
                onChange={handleChange}
              />
              <label className=" cursor-pointer">Offer</label>
            </div>
          </div>
          <div className=" flex gap-2 flex-wrap items-center">
            <label className=" font-semibold text-lg"> Amenities :</label>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-info"
                onChange={handleChange}
                checked={sidebardata.parking}
                id="parking"
              />
              <label className=" cursor-pointer">Parking</label>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-info"
                id="furnished"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <label className=" cursor-pointer">Furnished</label>
            </div>
          </div>
          <div className="">
            <select
              onChange={handleChange}
              className="select select-info w-full max-w-xs"
              id="sort_order"
              defaultValue={"created_at_desc"}
            >
              <option disabled selected>
                Sort :
              </option>
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className=" bg-sky-500 text-white px-2 py-2 hover:opacity-95 text-lg rounded-lg">
            Search
          </button>
        </form>
      </div>
      <div className=" ">
        <h1 className=" sm:text-2xl text-xl font-semibold p-3 ">
          Listing results :
        </h1>
        <div className="sm:mx-2 mx-24  flex flex-wrap gap-4 ">
          {!loading && listings.length === 0 && (
            <div
              role="alert"
              className="alert alert-info flex  items-center ml-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>No Listing found for you search. Try with new word</span>
            </div>
          )}
          {loading && (
            <div className="">
              <span className="loading loading-spinner text-error size-10 mt-3 mx-5"></span>
              <ShimmerEffect />
            </div>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem
                className="flex flex-col flex-wrap gap-2"
                key={listing._id}
                listing={listing}
              />
            ))}
        </div>
        {showMore && (
          <button
            className=" text-lg font-semibold mx-5 my-4 w-full text-center  text-blue-800 hover:underline"
            onClick={onShowMoreClick}
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}
