import { SearchItem } from "../../application/models/search/SearchItem";

export default class SortHelper {
  public static sortAscendantByName({
    items,
  }: {
    items: SearchItem[];
  }): SearchItem[] {
    return items.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }

  public static sortDescendantByName({
    items,
  }: {
    items: SearchItem[];
  }): SearchItem[] {
    return items.sort((a, b) => {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    });
  }
}
