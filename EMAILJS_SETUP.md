# EmailJS Setup Instructions

To make the contact form work properly, you need to set up EmailJS. Follow these steps:

## 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## 3. Create an Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}} ({{from_email}})
Message: {{message}}

Reply to: {{from_email}}
```

4. Save the template and note down your **Template ID**

## 4. Get Your Public Key

1. Go to "Account" in your dashboard
2. Find your **Public Key** in the API Keys section

## 5. Create Environment Variables

Create a `.env` file in your project root with:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_CONTACT_EMAIL=yourgmail@gmail.com
```

Replace the placeholder values with your actual values.

## 6. Restart Your Development Server

After creating the `.env` file, restart your development server:

```bash
npm run dev
```

## Troubleshooting

- Make sure all environment variables are set correctly
- Check that your email service is active in EmailJS
- Verify that your template uses the correct variable names
- Check the browser console for any error messages

## Fallback

If EmailJS is not configured, the contact form will show a direct email link as a fallback.

