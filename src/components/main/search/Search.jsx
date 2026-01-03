import React, { useEffect, useRef, useState } from "react";
import searchIcon from "../../../assets/images/icon-search.svg";
import { useDebounce } from "../../../hooks/useDebounce";
import { highlightText } from "../../../utils/text";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

const Search = ({ onLocationChoose }) => {
  const citySearchInputRef = useRef(null);
  const citySearchDropdownRef = useRef(null);

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput, 300);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultDropdownIsOpen, setSearchResultDropdownIsOpen] =
    useState(true);

  useEffect(() => {
    const fetchcities = async () => {
      try {
        setSearchResultsLoading(true);
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${debouncedSearchInput}&count=5&language=en&format=json`
        );

        const data = await res.json();
        setSearchResults(data?.results ?? []);
      } catch (error) {
        console.log(error);
      } finally {
        setSearchResultsLoading(false);
      }
    };

    if (debouncedSearchInput.length > 2) {
      fetchcities();
    }

    if (debouncedSearchInput.length < 3) {
      setSearchResults([]);
      setSearchResultsLoading(false);
      return;
    }
  }, [debouncedSearchInput]);

  useOutsideClick([citySearchDropdownRef, citySearchInputRef], () => {
    setSearchResultDropdownIsOpen(false);
  });

  return (
    <div className="sm:mt-10 mt-8 flex justify-center flex-col sm:flex-row gap-3 relative">
      <div className="sm:max-w-100 max-w-full w-full relative">
        <img
          src={searchIcon}
          alt="search"
          className={`absolute top-1/2 -translate-y-1/2 left-5 `}
        />
        <input
          ref={citySearchInputRef}
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for a place..."
          className="bg-primary w-full h-10 px-4 py-5 pl-14 rounded-lg placeholder:font-semibold"
          onClick={() => {
            if (debouncedSearchInput) {
              setSearchResultDropdownIsOpen(true);
            }
          }}
        />
        {debouncedSearchInput && searchResultDropdownIsOpen && (
          <div
            className="max-w-100 w-full absolute bg-primary top-0 translate-y-12.5 right-1/2 translate-x-1/2 rounded-lg overflow-hidden p-2 z-40"
            ref={citySearchDropdownRef}
          >
            {/* Input too short */}
            {debouncedSearchInput.length < 3 && (
              <div className="p-3 text-sm opacity-70">
                Type at least 3 characters
              </div>
            )}

            {/* Loading */}
            {debouncedSearchInput.length >= 3 && searchResultsLoading && (
              <div className="p-3 text-sm opacity-70">Searching...</div>
            )}

            {/* Results */}
            {debouncedSearchInput.length >= 3 &&
              !searchResultsLoading &&
              searchResults?.length > 0 &&
              searchResults?.map((location) => (
                <div
                  key={location.id}
                  className="p-3 hover:bg-secondary cursor-pointer rounded-lg font-thin"
                  onClick={() => {
                    onLocationChoose({
                      lat: location.latitude,
                      lon: location.longitude,
                      city: location.name,
                      country: location.country,
                      admin1: location.admin1,
                    });
                    setSearchResultDropdownIsOpen(false);
                  }}
                >
                  {highlightText(location.name, searchInput)}, {location.admin1}
                  , {location.country}
                </div>
              ))}

            {/* No results */}
            {debouncedSearchInput.length >= 3 &&
              !searchResultsLoading &&
              searchResults?.length === 0 && (
                <div className="p-3 text-sm opacity-70">No results found</div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
