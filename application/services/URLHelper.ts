export default class URLHelper {
  public static getUrlQueryParameter({
    name,
  }: {
    name: string;
  }): string | null {
    if (!name || !window) return '';
    const parameters = new URLSearchParams(window.location.search.substring(1));
    return parameters.get(name);
  }
}
