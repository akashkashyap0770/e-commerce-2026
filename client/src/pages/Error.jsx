import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="h-screen flex flex-col gap-2 justify-center items-center text-4xl tracking-wide">
      <p>404 page not found?</p>
      <p className="tracking-tighter text-xl">
        Back to &nbsp;
        <Link
          to="/"
          className="font-semibold text-blue-600 hover:text-blue-500"
        >
          Home
        </Link>
      </p>
    </div>
  );
}

export default Error;
