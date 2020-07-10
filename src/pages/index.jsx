import ImageFixed from "../components/imageFixed";
import { Link } from "gatsby";
import React from "react";
export default () => (
  <>
    <div className="container">
      <div className="mx-auto grid grid-cols-12 col-gap-2 row-gap-2 py-5">
        <div className="col-span-12 text-center">
          <h1 className="text-xl">👋 Dennis, wähle ein Template aus</h1>
        </div>
        <div className="col-span-4">
          <Link to="template/quoteWithImage">
            <ImageFixed
              name="quoteWithImage.jpg"
              className="hover:opacity-75 transition-all ease-in-out duration-200"
            />
          </Link>
        </div>
        <div className="col-span-4">
          <Link to="template/news">
            <ImageFixed
              name="news.jpg"
              className="hover:opacity-75 transition-all ease-in-out duration-200"
            />
          </Link>
        </div>
        <div className="col-span-4">
          <Link to="template/quote">
            <ImageFixed
              name="quote.jpg"
              className="hover:opacity-75 transition-all ease-in-out duration-200"
            />
          </Link>
        </div>
        <div className="col-span-4">
          <Link to="template/image">
            <ImageFixed
              name="call.jpg"
              className="hover:opacity-75 transition-all ease-in-out duration-200"
            />
          </Link>
        </div>
        <div className="col-span-4">
          <Link to="template/notifaction">
            <ImageFixed
              name="info.jpg"
              className="hover:opacity-75 transition-all ease-in-out duration-200"
            />
          </Link>
        </div>
      </div>
    </div>
  </>
);
