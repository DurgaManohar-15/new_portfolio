import React, { useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#06b6d4" },
          secondary: { main: "#2dd4bf" },
          background: { default: "#cefcff", paper: "#ffffff" },
          text: { primary: "#0F172A", secondary: "#475569" },
        }
      : {
          primary: { main: "#00bcd4" },
          secondary: { main: "#ff9800" },
          background: { default: "#0a1929", paper: "#132040" },
          text: { primary: "#f3f6fb", secondary: "#b6c2d1" },
        }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: "3.5rem", fontWeight: 700, letterSpacing: "-0.01562em" },
    h2: { fontSize: "2.5rem", fontWeight: 600, letterSpacing: "-0.00833em" },
    h3: { fontSize: "2rem", fontWeight: 600, letterSpacing: "0em" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          fontWeight: 700,
          paddingLeft: 14,
          paddingRight: 14,
        },
        contained: {
          color: "#fff",
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
          backgroundImage:
            mode === "light"
              ? "linear-gradient(90deg, #00bcd4, #2dd4bf)"
              : "linear-gradient(90deg, #00bcd4, #ff9800)",
          "&:hover": {
            filter: "brightness(0.95)",
            boxShadow: "0 10px 24px rgba(0,0,0,0.16)",
          },
        },
        outlined: {
          borderWidth: 2,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: "1px solid",
          borderColor: mode === "light" ? "#a5f3fc" : "#22304a",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 10px 26px 0 rgba(0,0,0,0.12)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid",
          borderColor: mode === "light" ? "#a5f3fc" : "#22304a",
          borderRadius: 14,
          boxShadow:
            mode === "light"
              ? "0 6px 18px rgba(0,0,0,0.08)"
              : "0 6px 18px rgba(0,0,0,0.3)",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },
    MuiTypography: {
      styleOverrides: {
        h2: {
          letterSpacing: "-0.5px",
        },
      },
    },
  },
});

function App() {
  const [mode, setMode] = useState("dark");
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Sidebar toggleTheme={toggleTheme} mode={mode} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, md: 4 },
            pl: { sm: "96px" },
            background: (theme) =>
              theme.palette.mode === "light"
                ? "linear-gradient(180deg, #e6fdff 0%, #ffffff 35%, #ffffff 100%)"
                : "linear-gradient(180deg, #081524 0%, #0a1929 35%, #0a1929 100%)",
          }}
        >
          <div id="hero">
            <Hero />
          </div>
          <div id="skills">
            <Skills />
          </div>
          <div id="projects">
            <Projects />
          </div>
          <div id="certifications">
            <Certifications />
          </div>
          <div id="contact">
            <Contact />
          </div>
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
