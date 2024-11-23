export default function Search() {
  return (
    <div className=" flex flex-col md:flex-row">
      <div className=" p-7 border-b-2  md:border-r-2 md:min-h-screen">
        <form className=" flex flex-col gap-8">
          <div className="">
            <label className="input input-bordered flex items-center gap-2 w-fit">
              Name :
              <input type="text" className="grow" id="searchTerm" />
            </label>
          </div>
          <div className=" flex gap-2 flex-wrap items-center">
            <label className=" text-lg font-semibold"> Type :</label>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-info"
                id="all"
              />
              <label htmlFor="all" className=" cursor-pointer">
                Rent & Sale
              </label>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-info"
                id="rent"
              />
              <label htmlFor="rent" className=" cursor-pointer">
                Rent
              </label>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-info"
                id="sale"
              />
              <label htmlFor="sale" className=" cursor-pointer">
                Sale
              </label>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-info"
                id="offer"
              />
              <label htmlFor="offer" className=" cursor-pointer">
                Offer
              </label>
            </div>
          </div>
          <div className=" flex gap-2 flex-wrap items-center">
            <label className=" font-semibold text-lg"> Amenities :</label>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-info"
                id="parking"
              />
              <label htmlFor="all" className=" cursor-pointer">
                Parking
              </label>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-info"
                id="furnished"
              />
              <label htmlFor="rent" className=" cursor-pointer">
                Furnished
              </label>
            </div>
          </div>
          <div className="">
            <select
              className="select select-info w-full max-w-xs"
              id="sort_order"
            >
              <option disabled selected>
                Sort :
              </option>
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className=" bg-sky-500 text-white px-2 py-2 hover:opacity-95 text-lg rounded-lg">
            Search
          </button>
        </form>
      </div>
      <div className=" ">
        <h1 className=" sm:text-2xl text-xl p-3 font-semibold  mt-5">
          Listing results :
        </h1>
      </div>
    </div>
  );
}
