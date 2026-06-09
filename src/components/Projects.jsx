import React, { useState, useMemo, useEffect } from "react";
import {
  Typography,
  Paper,
  Box,
  useTheme,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  useMediaQuery,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MonitorIcon from "@mui/icons-material/Monitor";
import FilterListIcon from "@mui/icons-material/FilterList";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion, AnimatePresence } from "framer-motion";

// Project image assets
import staysync from "../assets/projects/Stay_Sync.jpg";
import libraryManagementSystem from "../assets/projects/library_management_system.png";
import developerPortfolio from "../assets/projects/developer_portfolio.png";
import seasonguard from "../assets/projects/seasonguard.png";

const projectsData = [
  {
    id: 1,
    title: "Stay Sync",
    description:
      "Developed a full-stack web application, Stay Sync, to streamline hostel and PG search for students. Implemented secure login/signup with MySQL, an intuitive search system for institutions, and categorized hostel listings with detailed views. Built separate dashboards for admins and students, enabling hostel owners to manage listings and students to explore and book accommodations, with integrated email notifications for bookings.",
    image: staysync,
    link: "https://github.com/DurgaManohar-15/StaySync",
    category: "Full-Stack Development",
    tags: ["React", "Node.js", "Express", "MySQL", "Full-Stack"],
    features: [
      "Intuitive hostel and PG search and filtering tools.",
      "Role-based secure dashboard for students and hostel owners.",
      "Interactive booking system with automated email alerts.",
      "Complete database schema mapping for listing persistence."
    ]
  },
  {
    id: 2,
    title: "Smart Lib - Library Management System",
    description:
      "Developed a comprehensive full-stack library management system featuring dedicated portal dashboards for administrators and students. Built robust systems to manage catalog stock, member registrations, active checkouts, and transaction logs. Integrated quick book issuing through student email & ISBN code mapping, and provided students with real-time digital tracking of historically and currently borrowed books alongside automatic outstanding fine calculations.",
    image: libraryManagementSystem,
    link: "https://github.com/DurgaManohar-15/LibraryManagementSystem",
    category: "Database Systems",
    tags: ["React", "Node.js", "Express", "MySQL", "MERN", "LMS"],
    features: [
      "Dedicated portal dashboards for administrators and students.",
      "ISBN-mapped catalog management and transaction log tracking.",
      "Automatic fine calculation and borrowing history logs.",
      "Fast search and instant book check-in/check-out logs."
    ]
  },
  {
    id: 3,
    title: "Personal Portfolio Website",
    description:
      "Designed and developed a premium, responsive personal portfolio website showcasing my engineering projects, skill sets, and certifications. Built with React and styled elegantly utilizing Material-UI and Framer Motion for rich animations and seamless transitions. The website incorporates light and dark mode styling, customized interactive components, and dynamic WebGL 3D views for visual appeal.",
    image: developerPortfolio,
    link: "https://github.com/DurgaManohar-15/Portfolio",
    category: "Frontend Development",
    tags: ["React", "Material-UI", "Framer Motion", "Three.js", "Vite"],
    features: [
      "Interactive 3D Three.js tech stack coins.",
      "Custom glassmorphism floating sidebar drawer.",
      "Snappy pre-loading bounce state and lazy rendering observer.",
      "Form validation pre-loaded with direct mailto fallback."
    ]
  },
  {
    id: 4,
    title: "SeasonGuard - Seasonal Disease Prevention & Care System",
    description:
      "Developed SeasonGuard, a web application dedicated to seasonal health management, helping users prevent and manage seasonal diseases. The platform provides detailed precautions and preventive guidelines, alongside medicine prescriptions for illnesses that commonly occur in different seasons (Winter, Summer, and Rainy). Built using modern web technologies to ensure clear health advisory layouts and user-friendly interaction.",
    image: seasonguard,
    link: "https://github.com/DurgaManohar-15/Season-Guard",
    category: "Web Applications",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    features: [
      "Categorized health advisors for Winter, Summer, and Monsoon seasons.",
      "Symptom tracking tables and disease prevention guides.",
      "Interactive UI layouts optimized for clear advisory scanning.",
      "Lightweight, dependency-free execution for instant page loading."
    ]
  }
];

const categories = ["All", "Full-Stack Development", "Database Systems", "Frontend Development", "Web Applications"];

const Projects = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCardId, setExpandedCardId] = useState(null);

  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const isFilterMenuOpen = Boolean(filterAnchorEl);

  useEffect(() => {
    setExpandedCardId(null);
  }, [selectedCategory, searchQuery]);

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    handleFilterClose();
  };

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts = { All: projectsData.length };
    projectsData.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <Paper
      elevation={0}
      component={motion.div}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      sx={{
        p: { xs: 2, md: 4 },
        my: 4,
        background: "transparent",
        border: "none",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          align="center"
          sx={{ fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" }, mb: 4 }}
        >
          Projects
        </Typography>
      </motion.div>

      {/* Search and Filters */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mb: 6,
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 1, sm: 2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            width: "100%",
            maxWidth: 700,
            mx: "auto",
          }}
        >
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 50,
                borderRadius: "50px",
                background: isDark ? "rgba(19, 32, 64, 0.8)" : "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease-in-out",
                border: "1px solid",
                borderColor: isDark ? "rgba(0, 188, 212, 0.2)" : "rgba(165, 243, 252, 0.5)",
                boxShadow: isDark
                  ? "0 4px 20px 0 rgba(0,0,0,0.15)"
                  : "0 4px 15px 0 rgba(0, 151, 167, 0.05)",
                "&:hover": {
                  borderColor: "#00bcd4",
                },
                "&.Mui-focused": {
                  boxShadow: isDark
                    ? "0 0 15px 2px rgba(0, 188, 212, 0.2)"
                    : "0 0 15px 2px rgba(0, 188, 212, 0.15)",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#00bcd4", ml: 1 }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchQuery("")} edge="end" size="small">
                    <CloseIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <IconButton
            onClick={handleFilterClick}
            sx={{
              display: { xs: "flex", md: "none" },
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: isDark ? "rgba(19, 32, 64, 0.8)" : "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid",
              borderColor: selectedCategory !== "All"
                ? "#00bcd4"
                : isDark ? "rgba(0, 188, 212, 0.2)" : "rgba(165, 243, 252, 0.5)",
              color: selectedCategory !== "All"
                ? "#00bcd4"
                : isDark ? "text.secondary" : "text.primary",
              boxShadow: isDark
                ? "0 4px 20px 0 rgba(0,0,0,0.15)"
                : "0 4px 15px 0 rgba(0, 151, 167, 0.05)",
              "&:hover": {
                borderColor: "#00bcd4",
                color: "#00bcd4",
                transform: "scale(1.05)",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Box>

        <Menu
          anchorEl={filterAnchorEl}
          open={isFilterMenuOpen}
          onClose={handleFilterClose}
          elevation={0}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          slotProps={{
            paper: {
              sx: {
                mt: 1.5,
                borderRadius: "16px",
                background: isDark ? "rgba(19, 32, 64, 0.95)" : "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(15px)",
                border: "1px solid",
                borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 151, 167, 0.15)",
                boxShadow: isDark
                  ? "0 10px 30px rgba(0,0,0,0.4)"
                  : "0 10px 25px rgba(0, 151, 167, 0.1)",
                p: 1,
                minWidth: 240,
              }
            }
          }}
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            const count = categoryCounts[category] || 0;
            return (
              <MenuItem
                key={category}
                onClick={() => handleCategorySelect(category)}
                sx={{
                  borderRadius: "10px",
                  py: 1.2,
                  px: 2,
                  my: 0.5,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  fontFamily: '"Outfit", sans-serif',
                  color: isActive
                    ? "#00bcd4"
                    : isDark ? "text.secondary" : "text.primary",
                  background: isActive
                    ? isDark ? "rgba(0, 188, 212, 0.12)" : "rgba(0, 151, 167, 0.08)"
                    : "transparent",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: isDark
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 151, 167, 0.04)",
                    color: "#00bcd4",
                  },
                }}
              >
                <span>{category}</span>
                <Chip
                  label={count}
                  size="small"
                  sx={{
                    ml: 2,
                    height: 20,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    fontFamily: '"Outfit", sans-serif',
                    background: isActive
                      ? "#00bcd4"
                      : isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                    color: isActive ? "#fff" : "text.secondary",
                  }}
                />
              </MenuItem>
            );
          })}
        </Menu>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 1.5,
            py: 1,
          }}
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            const count = categoryCounts[category] || 0;
            return (
              <Chip
                key={category}
                label={`${category} (${count})`}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  py: 2.2,
                  px: 1.5,
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  fontWeight: 600,
                  fontFamily: '"Outfit", sans-serif',
                  cursor: "pointer",
                  borderRadius: "20px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  background: isActive
                    ? "linear-gradient(90deg, #00bcd4, #0097a7)"
                    : isDark
                      ? "rgba(19, 32, 64, 0.8)"
                      : "rgba(255, 255, 255, 0.85)",
                  color: isActive
                    ? "#fff"
                    : isDark
                      ? "text.secondary"
                      : "text.primary",
                  border: "1px solid",
                  borderColor: isActive
                    ? "transparent"
                    : isDark
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 151, 167, 0.2)",
                  boxShadow: isActive
                    ? "0 8px 25px rgba(0,188,212,0.25)"
                    : "none",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    background: isActive
                      ? "linear-gradient(90deg, #00d4ff, #00bcd4)"
                      : isDark
                        ? "rgba(19, 32, 64, 0.95)"
                        : "rgba(255, 255, 255, 1)",
                    borderColor: isActive ? "transparent" : "#00bcd4",
                    boxShadow: isActive ? "0 10px 30px rgba(0,188,212,0.45)" : "none",
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>

      {/* Grid Container */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 1, sm: 2 } }}>
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <Box
              component={motion.div}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              sx={{
                textAlign: "center",
                py: 10,
                background: isDark ? "rgba(19, 32, 64, 0.2)" : "rgba(255, 255, 255, 0.4)",
                borderRadius: "16px",
                border: "1px dashed",
                borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                No projects matched your search criteria.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                maxHeight: { xs: "580px", sm: "680px", md: "none" },
                overflowY: { xs: "auto", sm: "auto", md: "visible" },
                overflowX: "hidden",
                pr: { xs: 1, sm: 2, md: 0 },
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Box
                component={motion.div}
                layout
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(2, 1fr)",
                  },
                  gap: 4,
                  pt: 1,
                  pb: 2,
                }}
              >
                {filteredProjects.map((project) => {
                  const isCardExpanded = !isMobile || expandedCardId === project.id;
                  return (
                    <Box
                      key={project.id}
                      component={motion.div}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      whileHover={{ y: -6 }}
                    >
                      <Card
                        onClick={() => {
                          if (isMobile) {
                            setExpandedCardId(expandedCardId === project.id ? null : project.id);
                          }
                        }}
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          cursor: isMobile ? "pointer" : "default",
                          background: isDark ? "rgba(19, 32, 64, 0.8)" : "rgba(255, 255, 255, 0.9)",
                          backdropFilter: "blur(10px)",
                          borderRadius: "16px",
                          overflow: "hidden",
                          border: "1px solid",
                          borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 151, 167, 0.2)",
                          boxShadow: isDark
                            ? "0 4px 30px rgba(0, 0, 0, 0.2)"
                            : "0 4px 20px rgba(0, 151, 167, 0.05)",
                          transition: "box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease",
                          "&:hover": {
                            borderColor: "#00bcd4",
                            boxShadow: isDark
                              ? `0 10px 30px rgba(0, 188, 212, 0.15)`
                              : `0 10px 25px rgba(0, 151, 167, 0.1)`,
                            "& .project-card-img": {
                              transform: "scale(1.05)",
                            },
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            overflow: "hidden",
                            height: 240,
                            background: isDark ? "rgba(10, 25, 41, 0.2)" : "rgba(0, 0, 0, 0.01)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 2,
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={project.image}
                            alt={project.title}
                            className="project-card-img"
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              transition: "transform 0.4s ease, box-shadow 0.4s ease",
                              borderRadius: "8px",
                              boxShadow: isDark
                                ? "0 8px 24px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.2)"
                                : "0 8px 20px rgba(0,151,167,0.1), 0 2px 6px rgba(0,0,0,0.05)",
                              border: "1px solid",
                              borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,151,167,0.15)",
                            }}
                          />

                          <Chip
                            label={project.category}
                            size="small"
                            sx={{
                              position: "absolute",
                              top: 12,
                              left: 12,
                              fontWeight: 700,
                              fontSize: "0.7rem",
                              fontFamily: '"Outfit", sans-serif',
                              background: "linear-gradient(90deg, #00bcd4, #0097a7)",
                              color: "#fff",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            }}
                          />
                        </Box>

                        <CardContent
                          sx={{
                            flexGrow: 1,
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <MonitorIcon
                            sx={{
                              position: "absolute",
                              right: -15,
                              top: -15,
                              fontSize: { xs: 80, md: 100 },
                              opacity: 0.05,
                              transform: "rotate(-15deg)",
                              color: "text.primary",
                              pointerEvents: "none",
                              zIndex: 0,
                            }}
                          />

                          <Box sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                              }}
                            >
                              <Typography
                                variant="h5"
                                component="h3"
                                sx={{
                                  fontWeight: 700,
                                  fontFamily: '"Outfit", sans-serif',
                                  fontSize: "1.25rem",
                                  lineHeight: 1.3,
                                }}
                              >
                                {project.title}
                              </Typography>
                              {isMobile && (
                                <Box
                                  component={motion.div}
                                  animate={{ rotate: isCardExpanded ? 90 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  sx={{ display: "flex", color: "#00bcd4" }}
                                >
                                  <ArrowForwardIcon sx={{ fontSize: 18 }} />
                                </Box>
                              )}
                            </Box>

                            <AnimatePresence initial={false}>
                              {isCardExpanded && (
                                <Box
                                  component={motion.div}
                                  initial={isMobile ? { height: 0, opacity: 0 } : false}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={isMobile ? { height: 0, opacity: 0 } : false}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  style={{
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                    flexGrow: 1,
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                      mt: 2,
                                      mb: 3,
                                      lineHeight: 1.6,
                                    }}
                                  >
                                    {project.description}
                                  </Typography>

                                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                                    {project.tags.map((tag) => (
                                      <Chip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                        sx={{
                                          fontSize: "0.75rem",
                                          fontWeight: 600,
                                          fontFamily: '"Outfit", sans-serif',
                                          background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                                          color: isDark ? "#b6c2d1" : "#475569",
                                        }}
                                      />
                                    ))}
                                  </Box>

                                  <Box sx={{ mb: 3, flexGrow: 1 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, fontFamily: '"Outfit", sans-serif', fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: 0.5 }}>
                                      Key Features:
                                    </Typography>
                                    <ul style={{ margin: 0, paddingLeft: 16, fontSize: "0.85rem", color: isDark ? "#b6c2d1" : "#475569" }}>
                                      {project.features.map((feat, fIdx) => (
                                        <li key={fIdx} style={{ marginBottom: 4 }}>{feat}</li>
                                      ))}
                                    </ul>
                                  </Box>

                                  <CardActions sx={{ px: 0, pt: 1, pb: 0, mt: "auto" }}>
                                    <Button
                                      size="small"
                                      variant="outlined"
                                      color="primary"
                                      href={project.link}
                                      target="_blank"
                                      startIcon={<GitHubIcon />}
                                      sx={{
                                        fontWeight: 700,
                                        borderRadius: "8px",
                                        borderColor: isDark ? "rgba(0, 188, 212, 0.4)" : "rgba(0, 151, 167, 0.4)",
                                        textTransform: "uppercase",
                                        fontSize: "0.75rem",
                                        px: 2,
                                        "&:hover": {
                                          borderColor: "#00bcd4",
                                          background: "rgba(0, 188, 212, 0.05)",
                                        }
                                      }}
                                    >
                                      View Code
                                    </Button>
                                  </CardActions>
                                </Box>
                              )}
                            </AnimatePresence>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </Paper>
  );
};

export default Projects;
