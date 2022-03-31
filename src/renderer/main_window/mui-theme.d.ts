export {};
declare module "@mui/material/styles/createTheme" {}

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    dark?: string;
    light?: string;
    emphasis?: {
      A?: string;
      B?: string;
    };
  }
}
