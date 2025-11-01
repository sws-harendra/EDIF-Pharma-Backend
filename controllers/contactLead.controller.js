const db = require("../models");
const ContactLead = db.ContactLead;
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// ✅ Create new lead (contact or quote)
exports.createLead = async (req, res) => {
  try {
    const lead = await ContactLead.create(req.body);

    // Send email notification automatically
    await sendEmailNotification(lead);

    res.status(201).json({ message: "Lead submitted successfully", lead });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to submit lead", details: err.message });
  }
};

// ✅ Get all leads
exports.getLeads = async (req, res) => {
  try {
    const leads = await ContactLead.findAll({ order: [["createdAt", "DESC"]] });
    res.json(leads);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch leads", details: err.message });
  }
};

// ✅ Export leads to CSV (without json2csv)
exports.exportToCSV = async (req, res) => {
  try {
    const leads = await ContactLead.findAll();
    const jsonLeads = leads.map((l) => l.toJSON());

    if (!jsonLeads.length) {
      return res.status(404).json({ message: "No leads found to export" });
    }

    // Extract CSV headers
    const headers = Object.keys(jsonLeads[0]);

    // Convert to CSV string
    const csvRows = [];
    csvRows.push(headers.join(",")); // header row
    for (const row of jsonLeads) {
      const values = headers.map((h) => {
        const val = row[h] ?? "";
        // escape commas, quotes, newlines
        return `"${String(val).replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(","));
    }

    const csv = csvRows.join("\n");

    // Send CSV as downloadable response
    res.header("Content-Type", "text/csv");
    res.attachment("contact_leads.csv");
    res.send(csv);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to export leads", details: err.message });
  }
};

// ✅ Helper function for auto email notification
async function sendEmailNotification(lead) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or your custom SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const subject =
    lead.type === "quote"
      ? "New Quote Request Received"
      : "New Contact Form Message";

  const html = `
    <h2>${subject}</h2>
    <p><b>Name:</b> ${lead.name}</p>
    <p><b>Email:</b> ${lead.email}</p>
    <p><b>Company:</b> ${lead.company || "-"}</p>
    <p><b>Product Interest:</b> ${lead.productInterest || "-"}</p>
    <p><b>Message:</b> ${lead.message || "-"}</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject,
    html,
  });
}
