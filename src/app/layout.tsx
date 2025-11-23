'use client';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { ReactQueryProvider, ReactReduxProvider, ReactHotToastProvider } from '@/providers';
import "./globals.css";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  colorSchemes: {
    light: true,
    dark: true,
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ReactHotToastProvider>
            <ReactQueryProvider>
              <ReactReduxProvider>
                {children}
              </ReactReduxProvider>
            </ReactQueryProvider>
          </ReactHotToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
