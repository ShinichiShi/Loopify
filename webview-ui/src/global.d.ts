export {};

export type Config = {
  colors: any;
  letterSpacings: Record<string, string>;
  lineHeights: Record<string | number, string | number>;
  fontWeights: Record<string, number>;
  fontSizes: Record<string, string>;
};

declare global {
  interface Window {
    config: Config;
  }
}
