import React from "react";
import CountryList from "./CountryList";

const Main = () => {
  return (
    <main className="pt-40 pb-16 px-4 bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3 animate__animated animate__fadeInDown">
            Explore Countries Around the World
          </h1>
          <p className="text-lg text-gray-600 animate__animated animate__fadeInUp">
            Browse through a list of countries with key facts and details.
          </p>
        </div>

        {/* Country List */}
        <section className="animate__animated animate__fadeInUp">
          <CountryList />
        </section>
      </div>
    </main>
  );
};

export default Main;
