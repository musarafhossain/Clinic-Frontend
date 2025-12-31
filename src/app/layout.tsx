'use client';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReactQueryProvider, ReactReduxProvider, ReactHotToastProvider } from '@/providers';
import "./globals.css";

const theme = createTheme({
  defaultColorScheme: 'light',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#9d27b0",
          light: "#9d27b088",
          lighter: "#9d27b033",
        },
        success: {
          main: "#4caf50",
          light: "#4caf5088",
          lighter: "#4caf5033",
        },
        error: {
          main: "#f44336",
          light: "#f4433688",
          lighter: "#f4433633",
        },
        warning: {
          main: "#ff9800",
          light: "#ff980088",
          lighter: "#ff980033",
        },
        info: {
          main: "#2196f3",
          light: "#2196f388",
          lighter: "#2196f333",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#bc68c8",
          light: "#bc68c888",
          lighter: "#bc68c81d",
        },
        success: {
          main: "#4caf50",
          light: "#4caf5088",
          lighter: "#4caf5033",
        },
        error: {
          main: "#f44336",
          light: "#f4433688",
          lighter: "#f4433633",
        },
        warning: {
          main: "#ff9800",
          light: "#ff980088",
          lighter: "#ff980033",
        },
        info: {
          main: "#2196f3",
          light: "#2196f388",
          lighter: "#2196f333",
        },
      },
    },
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ReactHotToastProvider>
              <ReactQueryProvider>
                <ReactReduxProvider>
                  {children}
                </ReactReduxProvider>
              </ReactQueryProvider>
            </ReactHotToastProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
