import React, { useState } from "react";
import {
  Typography,
  Paper,
  Box,
  useTheme,
  useMediaQuery,
  Collapse,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import Carousel from "./Carousel";
import staysync from "../assets/projects/Stay_Sync.jpg";
import libraryManagementSystem from "../assets/projects/library_management_system.png";
import developerPortfolio from "../assets/projects/developer_portfolio.png";
import seasonguard from "../assets/projects/seasonguard.png";
// import heartDiseaseImg from "../assets/projects/Heart_Disease_Prediction2.png";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Stay Sync",
    description:
      "Developed a full-stack web application, Stay Sync, to streamline hostel and PG search for students. Implemented secure login/signup with MySQL, an intuitive search system for institutions, and categorized hostel listings with detailed views. Built separate dashboards for admins and students, enabling hostel owners to manage listings and students to explore and book accommodations, with integrated email notifications for bookings.",
    image: staysync,
    link: "https://github.com/DurgaManohar-15/StaySync",
  },
  {
    id: 2,
    title: "Smart Lib - Library Management System",
    description:
      "Developed a comprehensive full-stack library management system featuring dedicated portal dashboards for administrators and students. Built robust systems to manage catalog stock, member registrations, active checkouts, and transaction logs. Integrated quick book issuing through student email & ISBN code mapping, and provided students with real-time digital tracking of historically and currently borrowed books alongside automatic outstanding fine calculations.",
    image: libraryManagementSystem,
    link: "https://github.com/DurgaManohar-15/LibraryManagementSystem",
  },
  {
    id: 3,
    title: "Personal Portfolio Website",
    description:
      "Designed and developed a premium, responsive personal portfolio website showcasing my engineering projects, skill sets, and certifications. Built with React and styled elegantly utilizing Material-UI and Framer Motion for rich animations and seamless transitions. The website incorporates light and dark mode styling, customized interactive components, and dynamic carousel views for visual appeal.",
    image: developerPortfolio,
    link: "https://github.com/DurgaManohar-15/Portfolio",
  },
  {
    id: 4,
    title: "SeasonGuard - Seasonal Disease Prevention & Care System",
    description:
      "Developed SeasonGuard, a web application dedicated to seasonal health management, helping users prevent and manage seasonal diseases. The platform provides detailed precautions and preventive guidelines, alongside medicine prescriptions for illnesses that commonly occur in different seasons (Winter, Summer, and Rainy). Built using modern web technologies to ensure clear health advisory layouts and user-friendly interaction.",
    image: seasonguard,
    link: "https://github.com/DurgaManohar-15/Season-Guard",
  },
];

const Projects = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [expanded, setExpanded] = useState({});

  const handleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  let carouselHeight;

  if (isMdUp) {
    carouselHeight = 670;
  }

  return (
    <Paper
      elevation={0}
      component={motion.div}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      sx={{
        p: { xs: 2, md: 4 },
        my: 4,
        background: "transparent",
        border: "none",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Typography variant="h2" component="h2" gutterBottom align="center">
          My Projects
        </Typography>
      </motion.div>
      {isMdUp ? (
        <Box
          sx={{
            mt: 4,
            maxWidth: { md: 800 },
            mx: "auto",
          }}
        >
          <Carousel items={projectsData} baseHeight={carouselHeight} />
        </Box>
      ) : (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 500,
            mx: "auto",
          }}
        >
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
              style={{ width: "100%" }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: 3,
                    background:
                      theme.palette.mode === "dark" ? "#232b3b" : "#f8fafc",
                    border: (theme) =>
                      `1.5px solid ${
                        theme.palette.mode === "dark"
                          ? theme.palette.primary.main
                          : "#e0e7ef"
                      }`,
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={project.image}
                    alt={project.title}
                    sx={{
                      width: "100%",
                      height: 140,
                      objectFit: "contain",
                      background: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => handleExpand(project.id)}
                  />
                  <CardContent
                    sx={{
                      pb: 1,
                      pt: 2,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => handleExpand(project.id)}
                  >
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {project.title}
                    </Typography>
                  </CardContent>
                  <Collapse
                    in={!!expanded[project.id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent sx={{ pt: 0, textAlign: "center" }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {project.description}
                      </Typography>
                      <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                        <Button
                          size="small"
                          href={project.link}
                          target="_blank"
                          startIcon={<FaGithub />}
                          variant="outlined"
                          color="primary"
                        >
                          View Project
                        </Button>
                      </CardActions>
                    </CardContent>
                  </Collapse>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default Projects;
