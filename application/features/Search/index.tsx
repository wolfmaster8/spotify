import React, { useContext } from "react";
import { UilMicrophone, UilBooks } from "@iconscout/react-unicons";
import { SearchContext, SearchContextProvider } from "./SearchContext";
import General from "../../../shared/components/General";

function SearchPage() {
  const { setSearchQuery, doSearch, query, updateFilters, filters, items } =
    useContext(SearchContext);

  console.log("->", filters);

  return (
    <>
      <div className="m-16 flex justify-center">
        <General.SelectButton
          selectedValue={filters.type}
          title="Artista"
          icon={<UilMicrophone />}
          id="artist"
          onClick={() => updateFilters({ value: "artist", param: "type" })}
        />
        <General.SelectButton
          selectedValue={filters.type}
          title="Albums"
          icon={<UilBooks />}
          id="album"
          onClick={() => updateFilters({ value: "album", param: "type" })}
        />
        <input
          required
          placeholder="Busca..."
          defaultValue={query.q}
          className="border-2 focus:ring-2 focus:ring-blue-600 rounded-md py-2 px-2 mr-4"
          type="search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          onClick={doSearch}
          className="bg-blue-600 active:bg-blue-700 hover:bg-blue-500 border-2 border-blue-600 text-blue-100  uppercase text-xs tracking-wider font-semibold py-2 px-2 rounded-md"
        >
          Buscar
        </button>
      </div>

      <div className="grid grid-cols-4 gap-8 p-8">
        {items
          ? items.map((artist) => (
              <div
                key={artist.name}
                className="bg-gray-100 flex flex-col items-center p-4 rounded-md"
              >
                <img
                  className="mb-4"
                  src={
                    artist.images[0]?.url ??
                    "https://via.placeholder.com/200x200"
                  }
                  width={200}
                  height={200}
                  alt={artist.name}
                />
                <h1 className="text-2xl text-center text-blue-800 max-w-full truncate overflow-ellipsis overflow-hidden">
                  {artist.name}
                </h1>
              </div>
            ))
          : null}
      </div>
    </>
  );
}

const SearchWrapper = () => (
  <SearchContextProvider>
    <SearchPage />
  </SearchContextProvider>
);

export default SearchWrapper;
