declare module "txt-file-to-json" {
  interface Options {
    rowDelimiter?: string;
    columnDelimiter?: string;
    skipEmptyRows?: boolean;
  }

  export default function txtToJson(
    content: string,
    options?: Options
  ): Array<Record<string, any>>;
}
