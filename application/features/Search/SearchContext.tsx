import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { spotifyApi } from "../../services/axiosInstances/spotifyApi";
import URLHelper from "../../services/URLHelper";

type SearchContextType = {
  query: any;
  doSearch: () => void;
  updateFilters: ({ param, value }: { param: string; value: string }) => void;
  setFilters: React.Dispatch<SetStateAction<Filters>>;
  setSearchQuery: React.Dispatch<SetStateAction<string>>;
  filters: Filters;
  items: Item[];
};

export const SearchContext = createContext({} as SearchContextType);

type SearchContextProps = {
  children: ReactNode;
};

type Filters = {
  type?: string;
};

type Item = {
  name: string;
  images: [
    {
      url: string;
    }
  ];
};

export function SearchContextProvider({ children }: SearchContextProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({} as Filters);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    console.log(window.location.href);
    if (!window.location) return;
    const searchParam = URLHelper.getUrlQueryParameter({ name: "q" });
    const typeParam = URLHelper.getUrlQueryParameter({ name: "type" });
    // const yearParam = URLHelper.getUrlQueryParameter({ name: "year" });
    console.log(searchParam, typeParam);
    if (searchParam) {
      setSearchQuery(searchParam);
    }

    // const filters = { type: typeParam, year: yearParam };

    // console.log(filters);

    if (typeParam) {
      setFilters({ ...filters, type: typeParam });
    }

    if (searchParam && typeParam) {
      search();
    }
  }, []);

  const handleUpdateQuery = async ({
    queryParameter,
  }: {
    queryParameter: any;
  }) => {
    console.log({ queryParameter });
    await router.push(
      {
        pathname: "/search",
        query: { ...router.query, ...queryParameter },
      },
      undefined,
      { scroll: false, shallow: true }
    );
  };

  const handleRemoveQuery = async ({
    queryParameter,
  }: {
    queryParameter: string[];
  }) => {
    const queryParams = { ...router.query };
    queryParameter.forEach((parameter) => {
      delete queryParams[parameter];
    });
    await router.push(
      {
        pathname: "/search",
        query: { ...queryParams },
      },
      undefined,
      { scroll: false, shallow: true }
    );
  };

  const doSearch = async () => {
    if (!searchQuery) return;
    await handleUpdateQuery({
      queryParameter: {
        q: searchQuery,
        ...filters,
      },
    });
    search();
  };

  const search = async () => {
    try {
      const queryStrigified = new URLSearchParams(
        window.location.search
      ).toString();

      const { data } = await spotifyApi.get(`/search?${queryStrigified}`);
      const typeParam = URLHelper.getUrlQueryParameter({ name: "type" });
      if (typeParam) {
        const pluralTypeParam = `${typeParam}s`;
        console.log(data);
        setItems(data[pluralTypeParam].items);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateFilters = ({
    param,
    value,
  }: {
    param: string;
    value: string;
  }) => {
    setFilters((prevState) => ({
      ...prevState,
      [param]: value,
    }));
  };

  // console.log({ items });

  return (
    <SearchContext.Provider
      value={{
        setSearchQuery,
        doSearch,
        query: router.query,
        setFilters,
        filters,
        items,
        updateFilters,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
