import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { spotifyApi } from "../../services/axiosInstances/spotifyApi";
import URLHelper from "../../../shared/utils/URLHelper";
import { SearchItem } from "../../models/search/SearchItem";
import SortHelper from "../../../shared/utils/SortHelper";

/* Tipagem do retorno do SearchContextProvider */
type SearchContextType = {
  query: any;
  doSearch: () => void;
  updateFilters: ({ param, value }: { param: string; value: string }) => void;
  setSearchQuery: React.Dispatch<SetStateAction<string>>;
  setOrder: React.Dispatch<SetStateAction<Order>>;
  filters: Filters;
  orderedItems: SearchItem[];
  searchQuery: string;
  order: Order | null;
};

/* Criação do Contexto */
export const SearchContext = createContext({} as SearchContextType);

/* Tipagem das props que recebe o SearchContextProvider */
type SearchContextProps = {
  children: ReactNode;
};

/* Tipagem do conteúdo do SearchContextProvider */
type Filters = {
  type?: string;
};

export type Order = "asc" | "desc";

export function SearchContextProvider({ children }: SearchContextProps) {
  const router = useRouter();

  /* Parametro de busca */
  const [searchQuery, setSearchQuery] = useState("");

  /* Filtros disponíveis na API do Spotify */
  const [filters, setFilters] = useState({} as Filters);

  /* Estado de ordenamento */
  const [order, setOrder] = useState<Order>("asc");

  /* Lista dos elementos */
  const [orderedItems, setOrderedItems] = useState<SearchItem[]>([]);

  /* Executado só uma vez depois da primeira renderização */
  useEffect(() => {
    /** Vemos si window.location existe. Evitamos o erro caso a tela tente se renderizar no servidor.
     *  No servidor não temos acesso à API do navegador.
     *  */
    if (!window.location) return;

    /* Pegamos os parâmetros de busca da URL */
    const searchParam = URLHelper.getUrlQueryParameter({ name: "q" });
    const typeParam = URLHelper.getUrlQueryParameter({ name: "type" });
    const orderParam = URLHelper.getUrlQueryParameter({ name: "order" });

    /* Setamos o estado de cada parâmetro.
     * Isso porque devemos setar o estado inicial da nossa tela para setar os valores dos inputs.
     *  */
    if (searchParam) {
      setSearchQuery(searchParam);
    }

    if (typeParam) {
      setFilters({ ...filters, type: typeParam });
    }

    /* Se os parâmetros obrigatórios existem, fazemos a busca */
    if (searchParam && typeParam) {
      search();
    }

    if (orderParam) {
      setOrder(orderParam as Order);
    }
  }, []);

  /* Atualiza a URL com os parâmetros que passemos */
  const handleUpdateQuery = async ({
    queryParameter,
  }: {
    queryParameter: any;
  }) => {
    await router.push(
      {
        pathname: "/search",
        query: { ...router.query, ...queryParameter },
      },
      undefined,
      { scroll: false, shallow: true }
    );
  };

  /* Atualiza a URL removendo os parâmetros que passemos. */
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

  /* Faz a busca quando é clicado o botão de Buscar. */
  const doSearch = async () => {
    if (!searchQuery || !filters.type) return;
    search();
  };

  /* Função genêrica para setar os filtros. */
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

  /* Faz a busca na API. Por comôdidade, pegamos a string dos parâmetros de busca (o que está depois do -> ?)*/
  const search = async () => {
    try {
      const queryStrigified = new URLSearchParams(
        window.location.search
      ).toString();

      const { data } = await spotifyApi.get(`/search?${queryStrigified}`);
      const typeParam = URLHelper.getUrlQueryParameter({ name: "type" });
      if (typeParam) {
        const pluralTypeParam = `${typeParam}s`;
        await orderList({ itemsToOrder: data[pluralTypeParam].items });
      }
    } catch (e) {
      console.log(e);
    }
  };

  /* Assim que o usuário peça para ordenar a lista, executamos os algoritmos de ordenação. */
  useEffect(() => {
    orderList({ itemsToOrder: orderedItems });
  }, [order]);

  /* Atualiza a URL com os parâmetros à medida que o usuário vá mexendo na tela */
  useEffect(() => {
    if (order && filters.type && searchQuery) {
      handleUpdateQuery({
        queryParameter: {
          q: searchQuery,
          order,
          ...filters,
        },
      });
    }
  }, [order, filters.type, searchQuery]);

  /* Ordena a lista, dependendo do tipo de ordenação selecionado */
  const orderList = async ({
    itemsToOrder,
  }: {
    itemsToOrder: SearchItem[];
  }) => {
    setOrderedItems([]);
    if (!order || (order !== "asc" && order !== "desc")) {
      await handleRemoveQuery({ queryParameter: ["order"] });
      return;
    }

    let reorderedItems: SearchItem[] = [];

    if (order === "asc") {
      reorderedItems = SortHelper.sortAscendantByName({ items: itemsToOrder });
    }

    if (order === "desc") {
      reorderedItems = SortHelper.sortDescendantByName({ items: itemsToOrder });
    }

    setOrderedItems([...reorderedItems]);
  };

  return (
    <SearchContext.Provider
      value={{
        setSearchQuery,
        doSearch,
        query: router.query,
        filters,
        orderedItems,
        searchQuery,
        updateFilters,
        setOrder,
        order,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
