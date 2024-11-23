{loading && (

<div className="flex w-full justify-center py-10">
<span className="loading loading-spinner text-error size-12 "></span>
</div>
)}

      {error && (
        <div className=" flex w-full justify-center cursor-pointer py-10">
          <div role="alert" className="alert alert-error w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Something went wrong!</span>
          </div>
        </div>
      )}

₹
/search?searchTerm=ts&type=rent&parking=false&furnished=false&offer=false&sort=createdAt&order=desc
/search?searchTerm=ts&type=all&parking=false&furnished=false&offer=false&sort=created_at&order=desc
