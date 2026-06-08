import React from "react";
import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaGithub,
  FaPython,
  FaJava,
} from "react-icons/fa";
import { SiMysql } from "react-icons/si";

const skills = [
  {
    name: "Python",
    icon: <FaPython size="1.5em" />,
    color: "#3776AB",
    percentage: 50,
  },
  {
    name: "Java",
    icon: <FaJava size="1.5em" />,
    color: "#007396",
    percentage: 75,
  },
  {
    name: "HTML",
    icon: <FaHtml5 size="1.5em" />,
    color: "#E34F26",
    percentage: 90,
  },
  {
    name: "CSS",
    icon: <FaCss3Alt size="1.5em" />,
    color: "#1572B6",
    percentage: 70,
  },
  {
    name: "JavaScript",
    icon: <FaJsSquare size="1.5em" />,
    color: "#F7DF1E",
    percentage: 70,
  },
  {
    name: "React",
    icon: <FaReact size="1.5em" />,
    color: "#61DAFB",
    percentage: 70,
  },
  {
    name: "MySQL",
    icon: <SiMysql size="1.5em" />,
    color: "#4479A1",
    percentage: 75,
  },
  {
    name: "Git",
    icon: <FaGithub size="1.5em" />,
    color: "#181717",
    percentage: 60,
  },
];

const Skills = () => {
  const theme = useTheme();

  return (
    <Paper
      component={motion.section}
      elevation={0}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      sx={{ p: 4, my: 4, background: "transparent", border: "none" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Typography variant="h2" component="h2" gutterBottom align="center">
          Technical Skills
        </Typography>
        <Typography variant="body1" align="center" sx={{ opacity: 0.8, mb: 4 }}>
          My proficiency levels in various technologies
        </Typography>
      </motion.div>

      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 2,
                background: (theme) =>
                  theme.palette.mode === "light"
                    ? "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))"
                    : "linear-gradient(135deg, rgba(19,32,64,0.9), rgba(19,32,64,0.7))",
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "light" ? "#a5f3fc" : "#22304a",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      color: skill.color,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {skill.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {skill.name}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 700,
                    color: skill.color,
                    fontSize: "1.1rem",
                  }}
                >
                  {skill.percentage}%
                </Typography>
              </Box>
              <Box sx={{ position: "relative" }}>
                <LinearProgress
                  variant="determinate"
                  value={skill.percentage}
                  sx={{
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light" ? "#e2e8f0" : "#334155",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 6,
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}CC)`,
                      boxShadow: `0 2px 8px ${skill.color}40`,
                    },
                  }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{
                    duration: 1.5,
                    delay: idx * 0.1 + 0.3,
                    ease: "easeOut",
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}CC)`,
                    borderRadius: 6,
                    boxShadow: `0 2px 8px ${skill.color}40`,
                  }}
                />
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Paper>
  );
};

export default Skills;
