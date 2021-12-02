import React, { useContext } from "react";
import { UilBooks, UilMicrophone } from "@iconscout/react-unicons";
import { Order, SearchContext, SearchContextProvider } from "./SearchContext";
import General from "../../../shared/components/General";

function SearchPage() {
  const {
    setSearchQuery,
    doSearch,
    searchQuery,
    query,
    updateFilters,
    filters,
    orderedItems,
    setOrder,
    order,
  } = useContext(SearchContext);

  const isButtonDisabled: boolean = !filters.type || !searchQuery.length;

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
          disabled={isButtonDisabled}
          role="button"
          type="submit"
          onClick={doSearch}
          className="bg-blue-600 transition-all hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed border-2 px-8 border-blue-600 text-blue-100  uppercase text-xs tracking-wider font-semibold py-2 rounded-md"
        >
          Buscar
        </button>

        {orderedItems.length ? (
          <select
            value={String(order)}
            onChange={(e) => {
              setOrder(() => e.target.value as Order);
            }}
            className="ml-4 border-2 focus:ring-2 focus:ring-blue-600 rounded-md py-2 px-2 min-w-16"
            name="order"
          >
            <option value="asc">Alfabeticamente (A-Z)</option>
            <option value="desc">Alfabeticamente (Z-A)</option>
          </select>
        ) : null}
      </div>

      <div className="grid grid-cols-4 gap-8 p-8">
        {orderedItems.length
          ? orderedItems.map((artist) => (
              <div
                key={artist.uri}
                className="bg-gray-50 flex flex-col items-center p-4 rounded-md"
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
                <h1 className="text-lg font-semibold text-center text-blue-800 max-w-full truncate overflow-ellipsis overflow-hidden">
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
