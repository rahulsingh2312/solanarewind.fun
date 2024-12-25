"use client";
import React, { useEffect } from "react";
import { RiPagesFill } from "react-icons/ri";
import Script from "next/script";

const Testimonials = () => {
  useEffect(() => {
    // Check if the Twitter widgets script is already added to avoid reloading
    if (
      !document.querySelector(
        "script[src='https://platform.twitter.com/widgets.js']"
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="z-50 mt-16 px-72 max-md:px-4 max-md:mt-96">
      <p className="bg-white text-black px-4 font-semibold py-1 rounded-xl w-fit flex items-center justify-center mx-auto gap-2">
        <RiPagesFill /> Testimonials
      </p>
      <h1 className="mt-10 text-6xl max-sm:text-4xl">Public Cheers for Us!</h1>
      <p className="mt-2 text-white/60">
        Find out how our users are spreading the word
      </p>
      <div className="grid grid-cols-3 max-md:grid-cols-2 gap-4 md:gap-10 max-sm:grid-cols-1 mt-10 mb-10">
        {/* Add data-theme="dark" for dark mode */}
        <blockquote className="twitter-tweet" data-theme="dark" data-lang="en">
          <a href="https://twitter.com/user/status/1870883389030752446">
            Loading tweet...
          </a>
        </blockquote>
        <blockquote className="twitter-tweet" data-theme="dark" data-lang="en">
          <a href="https://twitter.com/user/status/1871107091328561641">
            Loading tweet...
          </a>
        </blockquote>
        <blockquote className="twitter-tweet" data-theme="dark" data-lang="en">
          <a href="https://twitter.com/user/status/1870888069777232241">
            Loading tweet...
          </a>
        </blockquote>
        <blockquote className="twitter-tweet" data-theme="dark" data-lang="en">
          <a href="https://twitter.com/user/status/1871270749253910801">
            Loading tweet...
          </a>
        </blockquote>
        {/* Using next/script to manage script loading */}
        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="lazyOnload"
        />
      </div>
    </div>
  );
};

export default Testimonials;
