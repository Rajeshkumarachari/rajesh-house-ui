import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { VscDebugStart } from "react-icons/vsc";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log("saleListings->", offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className=" flex flex-col gap-6 pt-28 pb-10 px-3 max-w-6xl mx-auto">
        <h1 className=" text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className=" text-slate-500">perfect</span> <br />
          place with ease
        </h1>
        <div className=" text-gray-400 text-xs sm:text-sm">
          <span className=" text-gray-700 font-semibold">rajeshbnb</span> is the
          best place to find your next perfect place to live.
          <br /> We have a wide range of properties for you to choose from.
        </div>
        <Link
          className="text-xs gap-1 flex sm:text-sm hover:bg-blue-100 w-fit p-3 rounded-md text-blue-800 font-bold hover:underline"
          to={"/search"}
        >
          Let's get started... <VscDebugStart className=" size-6 " />
        </Link>
      </div>
      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* offer &  sale & rent */}
      <div className=" max-w-6xl mx-auto p-3 flex flex-col gap-7 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className=" text-xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className=" text-sm text-blue-800 hover:underline"
                to={`/search?offer=true`}
              >
                Show more offers
              </Link>
            </div>
            <div className=" flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className=" text-xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className=" text-sm text-blue-800 hover:underline"
                to={`/search?type=rent`}
              >
                Show more places for rent
              </Link>
            </div>
            <div className=" flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className=" text-xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className=" text-sm text-blue-800 hover:underline"
                to={`/search?type=sale`}
              >
                Show more places for sale
              </Link>
            </div>
            <div className=" flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
