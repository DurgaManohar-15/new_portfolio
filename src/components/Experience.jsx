import React from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkIcon from "@mui/icons-material/Work";
import { motion } from "framer-motion";

// SVG Placeholder Logo for HCL Tech
const hclLogo = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='2048'%20height='2048'%20viewBox='0%200%202048%202048'%20xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3clinearGradient%20id='bgGradient'%20x1='0'%20y1='2048'%20x2='2048'%20y2='0'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0%25'%20stop-color='%237A00C8'/%3e%3cstop%20offset='35%25'%20stop-color='%235F1EBE'/%3e%3cstop%20offset='68%25'%20stop-color='%232D6BFF'/%3e%3cstop%20offset='100%25'%20stop-color='%236FAED9'/%3e%3c/linearGradient%3e%3cradialGradient%20id='purpleGlow'%20cx='0'%20cy='0'%20r='1'%20gradientUnits='userSpaceOnUse'%20gradientTransform='translate(250%201750)%20scale(900)'%3e%3cstop%20offset='0%25'%20stop-color='%23B000FF'%20stop-opacity='0.85'/%3e%3cstop%20offset='100%25'%20stop-color='%23B000FF'%20stop-opacity='0'/%3e%3c/radialGradient%3e%3cradialGradient%20id='topGlow'%20cx='0'%20cy='0'%20r='1'%20gradientUnits='userSpaceOnUse'%20gradientTransform='translate(300%20250)%20scale(700)'%3e%3cstop%20offset='0%25'%20stop-color='%23B08EDB'%20stop-opacity='0.38'/%3e%3cstop%20offset='100%25'%20stop-color='%23B08EDB'%20stop-opacity='0'/%3e%3c/radialGradient%3e%3cradialGradient%20id='cyanGlow'%20cx='0'%20cy='0'%20r='1'%20gradientUnits='userSpaceOnUse'%20gradientTransform='translate(1850%20250)%20scale(800)'%3e%3cstop%20offset='0%25'%20stop-color='%237FC8E8'%20stop-opacity='0.42'/%3e%3cstop%20offset='100%25'%20stop-color='%237FC8E8'%20stop-opacity='0'/%3e%3c/radialGradient%3e%3c/defs%3e%3c!--%20Gradient%20background%20--%3e%3crect%20width='2048'%20height='2048'%20fill='url(%23bgGradient)'/%3e%3crect%20width='2048'%20height='2048'%20fill='url(%23purpleGlow)'/%3e%3crect%20width='2048'%20height='2048'%20fill='url(%23topGlow)'/%3e%3crect%20width='2048'%20height='2048'%20fill='url(%23cyanGlow)'/%3e%3c!--%20Perfectly%20centered%20uploaded%20SVG%20logo%20--%3e%3cg%20transform='translate(324.0,895.9035929480027)%20scale(3.1243026110243246)'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%23D9D9D9;}%20%3c/style%3e%3cmetadata%3e%3csfw%20xmlns='ns_sfw;'%3e%3cslices%3e%3c/slices%3e%3csliceSourceBounds%20bottomLeftOrigin='true'%20height='82'%20width='448.1'%20x='-147.5'%20y='-27'%3e%3c/sliceSourceBounds%3e%3c/sfw%3e%3c/metadata%3e%3cg%3e%3cg%3e%3cg%3e%3cpath%20class='st0'%20d='M62.4,0.9v80H45.1V47.4H17.1v33.5H0v-80h17.1v31.8h27.9V0.9H62.4z'%3e%3c/path%3e%3cpath%20class='st0'%20d='M71.7,40.9C71.7,13.9,89.1,0,109,0c18.7,0,32.4,11.4,34.4,28.7h-16.7c-1.1-8.3-8.4-13.9-17.8-13.9%20c-12,0-21.3,9-21.3,26.2c0,17.1,9.3,26,21.3,26c9.6,0,16.9-5.6,18.2-13.8h15.9C141.7,70.2,128,81.8,109,81.8%20C88.8,81.8,71.7,67.8,71.7,40.9L71.7,40.9z'%3e%3c/path%3e%3cpath%20class='st0'%20d='M229.2,15.9h-23.7V1.1H270v14.7h-23.7v65.2h-17.1L229.2,15.9L229.2,15.9z'%3e%3c/path%3e%3cpath%20class='st0'%20d='M319,61.6C316.7,74,305.8,82,291.6,82C272,82,262,66.7,262,52.2s8.9-29.6,28.5-29.6%20c19.5,0,28.5,15,28.5,28.1c0,2.2-0.1,3.9-0.2,5.1h-41.4c1.1,8.1,6.3,13.1,14.3,13.1c6.4,0,10.6-2.5,11.9-7.4L319,61.6L319,61.6z%20M277.5,45.8H303c-0.5-6.4-4.9-11.5-12.6-11.5C283.2,34.3,278.9,37.8,277.5,45.8z'%3e%3c/path%3e%3cpath%20class='st0'%20d='M326.4,52.3c0-16.8,11.9-29.7,29.7-29.7c15.1,0,27.1,9.1,28.1,22.5h-16c-0.9-5.1-5.8-8.9-11.7-8.9%20c-8.6,0-13.6,6.7-13.6,16.1s5.1,16,13.8,16c5.8,0,10.5-3.5,11.7-8.7h16.2C383,72.4,371.1,82,356.1,82%20C338.3,82,326.4,69.1,326.4,52.3L326.4,52.3z'%3e%3c/path%3e%3cpath%20class='st0'%20d='M393.2,1h15.9v30.5c3.3-5.6,9.6-8.9,17.6-8.9c12.9,0,21.4,9.4,21.4,22.6v35.9h-15.9V48.8c0-7-4.6-12-11.2-12%20c-7,0-11.9,5.4-11.9,12.8v31.5h-15.9V1z'%3e%3c/path%3e%3cpath%20class='st0'%20d='M170.7,66V0.9h-17.1v64.7c0,9.9,5.4,15.3,15.3,15.3h36.6V66H170.7z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";

const experiences = [
  {
    id: 1,
    role: "ACADEMIC TRAINEE",
    company: "HCL TECH",
    duration: "Apr 16, 2026 - Present",
    location: "Bengaluru, India",
    description:
      "Currently undergoing internship training at HCLTech with a focus on building expertise in enterprise technologies, software development practices, and corporate workflows within a professional learning environment.",
    skills: ["Enterprise Tech", "Software Dev", "Workflows", "Corporate Culture"],
    logo: hclLogo,
  },
];

const Experience = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      elevation={0}
      component={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      sx={{
        p: { xs: 2, sm: 3, md: 6 },
        my: 2,
        background: "transparent",
        border: "none",
        position: "relative",
      }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          align="center"
          sx={{ fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" } }}
        >
          Professional Journey
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 900, mx: "auto", position: "relative", mt: 4 }}>
        {/* Vertical Timeline Center Line */}
        <Box
          sx={{
            position: "absolute",
            left: { xs: "20px", md: "calc(50% - 2px)" },
            width: "4px",
            height: "100%",
            background: `linear-gradient(to bottom, ${theme.palette.primary.main}, transparent)`,
            borderRadius: "4px",
            opacity: 0.3,
          }}
        />

        {experiences.map((exp, index) => (
          <Box
            key={exp.id}
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "center" },
              alignItems: "center",
              width: "100%",
              mb: { xs: 2, md: 4 },
              position: "relative",
            }}
          >
            {/* Timeline node */}
            <Box
              component={motion.div}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              sx={{
                position: "absolute",
                top: "calc(50% - 10px)",
                left: { xs: "10px", md: "calc(50% - 10px)" },
                width: 20,
                height: 20,
                borderRadius: "50%",
                bgcolor: theme.palette.primary.main,
                border: `4px solid ${isDark ? "#0a1929" : "#e0f7fa"}`,
                boxShadow: `0 0 15px ${theme.palette.primary.main}`,
                zIndex: 2,
              }}
            />

            {/* Side Logo for Desktop */}
            {exp.logo && isMdUp && (
              <Box
                component={motion.img}
                src={exp.logo}
                alt={`${exp.company} logo`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                sx={{
                  position: "absolute",
                  top: "calc(50% - 50px)",
                  left: index % 2 !== 0 ? "calc(50% + 40px)" : "auto",
                  right: index % 2 === 0 ? "calc(50% + 40px)" : "auto",
                  width: 220,
                  height: 100,
                  objectFit: "contain",
                  borderRadius: 3,
                  overflow: "hidden",
                  p: "6px",
                  bgcolor: isDark ? "rgba(255,255,255,0.06)" : "#fff",
                  border: `1px solid ${
                    isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)"
                  }`,
                  boxShadow: isDark
                    ? "0 4px 20px rgba(0,0,0,0.3)"
                    : "0 4px 20px rgba(0,0,0,0.08)",
                }}
              />
            )}

            {/* Experience Card */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: isMdUp ? (index % 2 === 0 ? 50 : -50) : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{
                width: { xs: "calc(100% - 60px)", sm: "calc(100% - 80px)", md: "45%" },
                ml: { xs: "60px", sm: "80px", md: index % 2 === 0 ? "55%" : "0" },
                mr: { md: index % 2 === 0 ? "0" : "55%" },
                p: 0.5,
                borderRadius: 6,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22)`,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  borderRadius: 5.5,
                  background: isDark ? "rgba(19, 32, 64, 0.8)" : "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${
                    isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
                  }`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Background watermark icon */}
                <WorkIcon
                  sx={{
                    position: "absolute",
                    right: -20,
                    top: -20,
                    fontSize: { xs: 80, md: 120 },
                    opacity: 0.05,
                    transform: "rotate(-15deg)",
                  }}
                />

                <Box sx={{ position: "relative", zIndex: 1 }}>
                  {/* Job Role */}
                  <Typography
                    variant="h5"
                    component="h3"
                    fontWeight={800}
                    color="primary.main"
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", sm: "1.15rem", md: "1.5rem" } }}
                  >
                    {exp.role}
                  </Typography>

                  {/* Company Info with Logo (for mobile only) */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                    {exp.logo && !isMdUp && (
                      <Box
                        component={motion.img}
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        sx={{
                          width: { xs: 36, sm: 44 },
                          height: { xs: 36, sm: 44 },
                          objectFit: "contain",
                          borderRadius: 1.5,
                          border: `1px solid ${
                            isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"
                          }`,
                          p: "4px",
                          bgcolor: isDark ? "rgba(255,255,255,0.05)" : "#fff",
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <Typography
                      variant="h6"
                      component="h4"
                      fontWeight={600}
                      sx={{ opacity: 0.9, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" } }}
                    >
                      {exp.company}
                    </Typography>
                  </Box>

                  {/* Duration and Location */}
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 1, sm: 2 }, mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <CalendarTodayIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        {exp.duration}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <LocationOnIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        {exp.location}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 1.5, opacity: 0.5 }} />

                  {/* Description */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.8,
                      mb: 2,
                      fontSize: { xs: "0.78rem", sm: "0.85rem", md: "0.875rem" },
                    }}
                  >
                    {exp.description}
                  </Typography>

                  {/* Skills tags */}
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {exp.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          borderRadius: 1.5,
                          fontWeight: 600,
                          fontSize: "0.65rem",
                          bgcolor: isDark ? "rgba(0,188,212,0.1)" : "rgba(0,188,212,0.05)",
                          color: "primary.main",
                          border: `1px solid ${theme.palette.primary.main}33`,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Experience;
