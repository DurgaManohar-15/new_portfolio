import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const OWNER_EMAIL = "durgamanoharmallelli@gmail.com";

const Contact = () => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setSendSuccess(false);
    setSendError(false);

    // Get form data
    const formData = new FormData(formRef.current);
    const name = formData.get("from_name");
    const email = formData.get("from_email");
    const message = formData.get("message");

    // Create mailto link as fallback
    const subject = `Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Try EmailJS first, fallback to mailto
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (
      serviceId &&
      templateId &&
      publicKey &&
      serviceId !== "your_service_id_here" &&
      templateId !== "your_template_id_here" &&
      publicKey !== "your_public_key_here"
    ) {
      // Use EmailJS
      emailjs
        .sendForm(serviceId, templateId, formRef.current, publicKey)
        .then(
          (result) => {
            console.log("SUCCESS!", result.text);
            setSendSuccess(true);
            formRef.current.reset();
          },
          (error) => {
            console.log("FAILED...", error.text);
            setSendError(true);
          }
        )
        .finally(() => {
          setIsSending(false);
        });
    } else {
      // Fallback to mailto
      window.location.href = mailtoLink;
      setSendSuccess(true);
      formRef.current.reset();
      setIsSending(false);
    }
  };

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      elevation={0}
      sx={{ p: { xs: 2, sm: 4 }, my: 4, background: "transparent" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Typography variant="h2" component="h2" gutterBottom align="center">
          Contact Me
        </Typography>
      </motion.div>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          maxWidth: 720,
          width: "100%",
          mx: "auto",
        }}
      >
        {/* Contact Form Only */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1.5, sm: 2 },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.7 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "inherit",
                }}
              >
                {/* Hidden field to set recipient email */}
                <input type="hidden" name="to_email" value={OWNER_EMAIL} />

                <TextField
                  label="Your Name"
                  variant="filled"
                  name="from_name"
                  required
                  fullWidth
                />
                <TextField
                  label="Your Email"
                  variant="filled"
                  type="email"
                  name="from_email"
                  required
                  fullWidth
                />
                <TextField
                  label="Your Message"
                  variant="filled"
                  name="message"
                  required
                  multiline
                  rows={4}
                  fullWidth
                />
                <Box sx={{ position: "relative" }}>
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSending}
                      sx={{ width: "100%" }}
                    >
                      Send Message
                    </Button>
                  </motion.div>
                  {isSending && (
                    <CircularProgress
                      size={24}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  )}
                </Box>
                {sendSuccess && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    Thank you for your message! I'll get back to you soon.
                  </Alert>
                )}
                {sendError && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    Something went wrong. Please try again later or contact me
                    directly at{" "}
                    <a
                      href={`mailto:${OWNER_EMAIL}`}
                      style={{ color: "inherit" }}
                    >
                      {OWNER_EMAIL}
                    </a>
                  </Alert>
                )}
              </form>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Contact;
