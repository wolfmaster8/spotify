import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { spotifyApi } from "../../services/axiosInstances/spotifyApi";

type SearchContextType = {
  query: any;
  doSearch: () => void;
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
    console.log(router.query);
    if (!router.query) return;
    if (typeof router.query.q === "string") {
      setSearchQuery(router.query.q);
    }
    if (router.query.type && typeof router.query.type === "string") {
      setFilters({ ...filters, type: router.query.type });
    }

    if (router.query.q && router.query.type) {
      search();
    }
  }, [router.query]);

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
    console.log(searchQuery);
    await handleUpdateQuery({
      queryParameter: {
        q: searchQuery,
        ...filters,
      },
    });
  };

  const search = async () => {
    try {
      const queryStrigified = new URLSearchParams(router.query).toString();
      console.log(queryStrigified);
      const { data } = await spotifyApi.get(`/search?${queryStrigified}`);

      if (router.query.type === "artist") {
        setItems(data.artists.items);
      }

      if (router.query.type === "album") {
        setItems(data.albums.items);
      }
      console.log(data.artists.items);
    } catch (e) {
      console.log(e);
    }
  };

  console.log({ items });

  return (
    <SearchContext.Provider
      value={{
        setSearchQuery,
        doSearch,
        query: router.query,
        setFilters,
        filters,
        items,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
