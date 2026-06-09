import React from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  useTheme,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { motion } from "framer-motion";

// Certificate images
import microsoftai from "../assets/certificates/Microsoft_Ai_workshop.png";
import infosysjava from "../assets/certificates/infosys_java.png";
import infosysdsa from "../assets/certificates/infosys_dsa.png";
import hpaibeginners from "../assets/certificates/hp_ai_for_beginners.png";
import genai from "../assets/certificates/gen_ai_simplylearn.png";
import deldataanl from "../assets/certificates/deloitte_data_analytics_for_job_stimulation.png";
import deljob from "../assets/certificates/deloitte_tech_job_stimulation.png";
import mallareddy from "../assets/certificates/malla_reddy_hackathon_2k25.jpg";
import eduskillsjava from "../assets/certificates/eduskills_java_full_stack.png";
import awsCloudPractitioner from "../assets/certificates/aws_cloud_practitioner_essentials.png";
import awsAcademyCloudFoundations from "../assets/certificates/aws_academy_cloud_foundations.png";
import agentathon2025 from "../assets/certificates/agentathon_2025.png";
import trailblizTopPerformer from "../assets/certificates/trailbliz_top_performer.png";
import nptelSoftwareProjectManagement from "../assets/certificates/nptel_software_project_management.png";
import cs50Sql from "../assets/certificates/cs50_sql.png";

// Certificate PDFs
import microsoftaiPdf from "../assets/certificates/Microsoft_Ai_workshop.pdf";
import infosysjavaPdf from "../assets/certificates/infosys java.pdf";
import infosysdsaPdf from "../assets/certificates/infosys DSA.pdf";
import hpaibeginnerspdf from "../assets/certificates/hp_ai_for_beginners.pdf";
import genaipdf from "../assets/certificates/generativeAi.pdf";
import deldataanlpdf from "../assets/certificates/data analysis.pdf";
import deljobpdf from "../assets/certificates/Deloitte.pdf";
import mallareddyPdf from "../assets/certificates/malla_reddy_hackathon_2k25.pdf";
import eduskillsjavaPdf from "../assets/certificates/eduskills_java_full_stack.pdf";
import awsCloudPractitionerPdf from "../assets/certificates/aws_cloud_practitioner_essentials.pdf";
import awsAcademyCloudFoundationsPdf from "../assets/certificates/aws_academy_cloud_foundations.pdf";
import agentathon2025Pdf from "../assets/certificates/agentathon_2025.pdf";
import trailblizTopPerformerPdf from "../assets/certificates/trailbliz_top_performer.pdf";
import nptelSoftwareProjectManagementPdf from "../assets/certificates/nptel_software_project_management.pdf";
import cs50SqlPdf from "../assets/certificates/cs50_sql.pdf";

const certifications = [
  {
    title: "Malla Reddy University - Hackathon 2K25",
    organization: "Malla Reddy University",
    issue_date: "February 2025",
    image: mallareddy,
    file: mallareddyPdf,
  },
  {
    title: "AWS - AWS Cloud Practitioner Essentials",
    organization: "Amazon Web Services (AWS)",
    issue_date: "February 2026",
    image: awsCloudPractitioner,
    file: awsCloudPractitionerPdf,
  },
  {
    title: "AWS Academy - Cloud Foundations",
    organization: "AWS Academy",
    issue_date: "March 2026",
    image: awsAcademyCloudFoundations,
    file: awsAcademyCloudFoundationsPdf,
  },
  {
    title: "GDG Hyderabad - Agentathon 2025 (Largest Agentic AI Hackathon)",
    organization: "Google Developer Groups (GDG) Hyderabad",
    issue_date: "December 2025",
    image: agentathon2025,
    file: agentathon2025Pdf,
  },
  {
    title: "Trailbliz - Top Performer Certification",
    organization: "Trailbliz",
    issue_date: "December 2025",
    image: trailblizTopPerformer,
    file: trailblizTopPerformerPdf,
  },
  {
    title: "NPTEL - Software Project Management (Elite Certification)",
    organization: "NPTEL (IIT Kharagpur / Skill India)",
    issue_date: "October 2025",
    image: nptelSoftwareProjectManagement,
    file: nptelSoftwareProjectManagementPdf,
  },
  {
    title: "EduSkills - Java Full Stack Internship",
    organization: "EduSkills Academy",
    issue_date: "March 2026",
    image: eduskillsjava,
    file: eduskillsjavaPdf,
  },
  {
    title: "Microsoft AI workshop",
    organization: "Microsoft",
    issue_date: "July 2025",
    image: microsoftai,
    file: microsoftaiPdf,
  },
  {
    title: "Infosys -  Programming using Java",
    organization: "Infosys",
    issue_date: "July 2025",
    image: infosysjava,
    file: infosysjavaPdf,
  },
  {
    title: "Infosys -  DSA using Java",
    organization: "Infosys",
    issue_date: "July 2025",
    image: infosysdsa,
    file: infosysdsaPdf,
  },
  {
    title: "HP -  AI for Beginners",
    organization: "HP",
    issue_date: "June 2025",
    image: hpaibeginners,
    file: hpaibeginnerspdf,
  },
  {
    title: "SimplyLearn -  Gen-AI for Beginners",
    organization: "SimplyLearn",
    issue_date: "June 2025",
    image: genai,
    file: genaipdf,
  },
  {
    title: "Deloitte -   Technology	Job	Simulation",
    organization: "Deloitte",
    issue_date: "June 2025",
    image: deljob,
    file: deljobpdf,
  },
  {
    title: "Deloitte -    Data	Analytics	Job	Simulation",
    organization: "Deloitte",
    issue_date: "June 2025",
    image: deldataanl,
    file: deldataanlpdf,
  },
  {
    title: "CS50's Introduction to Databases with SQL",
    organization: "Harvard University",
    issue_date: "October 2025",
    image: cs50Sql,
    file: cs50SqlPdf,
  },
];

const parseDate = (dateStr) => {
  const [month, year] = dateStr.split(" ");
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthIdx = months.findIndex((m) => m === month);
  return year
    ? new Date(parseInt(year), monthIdx === -1 ? 0 : monthIdx)
    : new Date(dateStr);
};

const sortedCerts = certifications
  .slice()
  .sort((a, b) => parseDate(b.issue_date) - parseDate(a.issue_date));

const Certifications = () => {
  const theme = useTheme();

  const CertificationCard = ({ cert, idx }) => (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(idx * 0.1, 0.5) }}
      sx={{ width: '100%', display: 'flex' }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "stretch",
          width: "100%",
          p: { xs: 0.5, sm: 1.5 },
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          background: theme.palette.mode === "dark" ? "rgba(19, 32, 64, 0.8)" : "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.8)"}`,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": { 
            transform: "translateY(-3px)", 
            boxShadow: theme.palette.mode === "dark" ? "0 12px 40px rgba(0,0,0,0.5)" : "0 12px 40px rgba(0,0,0,0.15)" 
          },
          gap: { xs: 0, sm: 2 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <EmojiEventsIcon
          sx={{
            position: "absolute",
            right: -15,
            top: -15,
            fontSize: 100,
            opacity: 0.04,
            transform: "rotate(-10deg)",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            flex: { xs: "unset", sm: "0 0 280px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.02)" : "#fff",
            borderRadius: { xs: 3, sm: 3 },
            border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
            minHeight: { xs: 160, sm: "auto" }
          }}
        >
          <Box
            component="img"
            src={cert.image}
            alt={cert.title}
            sx={{
              width: "100%",
              height: { xs: 140, sm: 160 },
              objectFit: "contain",
              filter: theme.palette.mode === "light" ? "drop-shadow(0 4px 12px rgba(0,0,0,0.08))" : "none"
            }}
          />
        </Box>
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", sm: "flex-start" },
            p: { xs: 2, sm: 3 },
            "&:last-child": { pb: { xs: 2, sm: 3 } }
          }}
        >
          <Typography
            variant="h5"
            component="h3"
            fontWeight={700}
            gutterBottom
            sx={{ textAlign: { xs: "center", sm: "left" }, fontSize: { xs: '1.1rem', sm: '1.3rem' } }}
          >
            {cert.title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            color="primary.main"
            fontWeight={600}
            sx={{ textAlign: { xs: "center", sm: "left" }, mb: 1 }}
          >
            {cert.organization}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: { xs: "center", sm: "left" }, mb: 3 }}
          >
            Issued: {cert.issue_date}
          </Typography>
          <Box sx={{ mt: 'auto', alignSelf: { xs: "center", sm: "flex-start" } }}>
            <Button
              variant="outlined"
              size="small"
              href={cert.file}
              target="_blank"
              startIcon={<PictureAsPdfIcon />}
              sx={{ borderRadius: 2, px: 3, borderWidth: 1.5, "&:hover": { borderWidth: 1.5 } }}
            >
              View PDF
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, my: 4, background: "transparent", border: "none" }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" fontWeight={800} gutterBottom>
            Certifications
          </Typography>
          <Typography variant="subtitle1" component="p" color="text.secondary">
            A collection of my professional achievements and skill validations.
          </Typography>
        </motion.div>
      </Box>

      <Box
        sx={{
          maxWidth: 960,
          mx: "auto",
          maxHeight: 750,
          overflowY: "auto",
          overflowX: "hidden",
          pr: { xs: 1, sm: 2 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
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
        {sortedCerts.map((cert, idx) => (
          <CertificationCard key={idx} cert={cert} idx={idx} />
        ))}
      </Box>
    </Paper>
  );
};

export default Certifications;
