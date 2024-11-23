import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
export default function ListingItem({ listing }) {
  return (
    <div className=" bg-white shadow-md hover:shadow-lg flex transition-shadow overflow-hidden rounded-lg w-[320px] sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing?.imageUrls[0] ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt="listing_cover"
          className=" h-[250px] ms:h-[200px] sm:w-full  w-full  object-cover hover:scale-105 transition-scale duration-300'"
        />
        <div className="p-3 w-full  ">
          <p className=" text-lg font-semibold text-slate-700 truncate line-clamp-1">
            {listing?.name}
          </p>
          <div className="p-2 flex gap-1 items-center ">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className=" text-xs ">{listing?.address} </p>
          </div>
          <p className=" line-clamp-3 text-base">{listing?.description} </p>
          <p className=" text-slate-500 mt-2 font-semibold">
            ₹
            {listing?.offer
              ? listing?.discountPrice.toLocaleString("en-US")
              : listing?.regularPrice.toLocaleString("en-US")}
            {listing?.type === "rent" && " / month"}
          </p>
          <div className="flex gap-3 mt-2 text-slate-700">
            <div className=" font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing?.bedrooms} beds `
                : `${listing?.bedrooms} bed`}
            </div>
            <div className=" font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing?.bathrooms} baths `
                : `${listing?.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
