import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";
import { createServer as createViteServer } from "vite";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]!,
  );
const cleanField = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";
const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));

  // Request logging
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Health check route
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      env: process.env.NODE_ENV,
      smtpConfigured: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
    });
  });

  // API route for sending emails
  app.post("/api/send-email", async (req, res) => {
    const name = cleanField(req.body.name, 120);
    const email = cleanField(req.body.email, 254);
    const date = cleanField(req.body.date, 32);
    const trip = cleanField(req.body.trip, 160);
    const message = cleanField(req.body.message, 4000);

    if (!name || !email || !trip || !message || !isValidEmail(email)) {
      return res.status(400).json({ error: "Please complete all required fields with a valid email address." });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    // If port is 465, secure should be true by default
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("Missing SMTP configuration:", { 
        host: !!smtpHost, 
        user: !!smtpUser, 
        pass: !!smtpPass 
      });
      return res.status(500).json({ error: "Email service is temporarily unavailable. Please try again later." });
    }

    // Create a transporter using SMTP credentials from environment variables
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      // Add timeout to prevent long hangs
      connectionTimeout: 10000, 
      greetingTimeout: 10000,
    });

    try {
      // Send email
      await transporter.sendMail({
        from: `"Black Eagle Tours & Safaris" <${smtpUser}>`, // sender address
        to: "info@blackeagletour.com", // list of receivers
        replyTo: email,
        subject: `New Safari Inquiry from ${name}`, // Subject line
        text: `Name: ${name}\nEmail: ${email}\nTravel Date: ${date || 'Not specified'}\nTrip Type: ${trip}\n\nMessage:\n${message}`, // plain text body
        html: `
          <h3>New Safari Inquiry</h3>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Travel Date:</strong> ${escapeHtml(date || "Not specified")}</p>
          <p><strong>Trip Type:</strong> ${escapeHtml(trip)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        `, // html body
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "We could not send your enquiry right now. Please try again or contact us by WhatsApp." });
    }
  });

  // Catch-all for API routes that don't exist
  app.all("/api/*", (req, res) => {
    console.log(`404 on API route: ${req.method} ${req.url}`);
    res.status(404).json({ 
      error: "API route not found."
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from the 'dist' directory
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("Registered routes:");
    app._router.stack.forEach((r: any) => {
      if (r.route && r.route.path) {
        console.log(`- ${Object.keys(r.route.methods).join(',').toUpperCase()} ${r.route.path}`);
      }
    });
  });
}

startServer();
