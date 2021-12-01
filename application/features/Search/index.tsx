import React, { useContext } from "react";
import { SearchContext, SearchContextProvider } from "./SearchContext";

function SearchPage() {
  const { setSearchQuery, doSearch, query, setFilters, filters, items } =
    useContext(SearchContext);

  return (
    <>
      <div className="m-16 flex justify-center">
        <input
          placeholder="Busca..."
          defaultValue={query.q}
          className="border-2 focus:ring-2 focus:ring-blue-600 rounded-md py-2 px-2 mr-4"
          type="search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={doSearch}
          className="bg-blue-600 active:bg-blue-700 hover:bg-blue-500 border-2 border-blue-600 text-blue-100  uppercase text-xs tracking-wider font-semibold py-2 px-2 rounded-md"
        >
          Buscar
        </button>
      </div>
      <div>
        <p>Filtros:</p>
        <div>
          <input
            onChange={(e) =>
              setFilters((prevState) => ({
                ...prevState,
                type: e.target.value,
              }))
            }
            defaultChecked={query.type === "album" || filters.type === "album"}
            // checked={query.type === "album" || filters.type === "album"}
            type="radio"
            id="album"
            name="type"
            value="album"
          />
          <label htmlFor="album">Album</label>
        </div>
        <div>
          <input
            onChange={(e) =>
              setFilters((prevState) => ({
                ...prevState,
                type: e.target.value,
              }))
            }
            defaultChecked={
              query.type === "artist" || filters.type === "artist"
            }
            // checked={query.type === "artist" || filters.type === "artist"}
            type="radio"
            id="artist"
            name="type"
            value="artist"
          />
          <label htmlFor="artist">Artista</label>
        </div>
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
