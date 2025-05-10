import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchVal, setSearchVal] = useState("");
  const [filterVal, setFilterVal] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    let apiUrl;
    if (searchVal.trim()) {
      apiUrl = `https://restcountries.com/v2/name/${encodeURIComponent(
        searchVal
      )}`;
    } else if (filterVal) {
      apiUrl = `https://restcountries.com/v2/region/${encodeURIComponent(
        filterVal
      )}`;
    } else {
      apiUrl = "https://restcountries.com/v2/all";
    }

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch countries");
        return res.json();
      })
      .then((data) => {
        const countriesArray = Array.isArray(data) ? data : [];
        setCountries(countriesArray);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setCountries([]);
        setIsLoading(false);
      });
  }, [searchVal, filterVal]);

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterVal(e.target.value);
  };

  const resetFilters = () => {
    setSearchVal("");
    setFilterVal("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by country name..."
          value={searchVal}
          onChange={handleSearch}
          className="flex-1 py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <select
          value={filterVal}
          onChange={handleFilter}
          className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        >
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      {/* Country List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading && (
          <div className="col-span-full text-center text-gray-600">
            <p className="text-xl animate-pulse">Loading countries...</p>
          </div>
        )}
        {error && (
          <div className="col-span-full text-center text-red-600">
            <p className="text-xl">Error: {error}</p>
            <button
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        )}
        {!isLoading && !error && countries.length === 0 && (
          <div className="col-span-full text-center text-gray-600">
            <p className="text-xl">
              No countries found. Try adjusting your search or filter.
            </p>
          </div>
        )}
        {!isLoading &&
          !error &&
          countries.map(
            ({ alpha3Code, flags, name, population, region, capital }) => (
              <CountryCard
                key={alpha3Code}
                id={alpha3Code}
                flag={flags?.svg || "https://via.placeholder.com/150"}
                name={name}
                population={population || 0}
                region={region || "N/A"}
                capital={capital || "N/A"}
              />
            )
          )}
      </div>
    </div>
  );
};

export default CountryList;
