declare module '*.svg';

declare module 'use-csv-downloader' {
  export default (parseOpts: { [key: string]: string }) => (
    data: Array<{ [key: string]: string | number }>,
    filename: string
  ): void => {};
}
