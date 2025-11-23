# Contact Form Setup Guide

Your contact form is ready but needs to be connected to receive emails. Here's how:

## Option 1: Formspree (Easiest - FREE)

1. **Sign up at [Formspree.io](https://formspree.io)**
   - Create a free account
   - You get 50 submissions per month for free

2. **Create a new form**
   - Click "New Form"
   - Enter your email: **jippropainting@gmail.com**
   - Copy the form ID (looks like: `xpzbkdqw`)

3. **Update your website**
   - Open `index.html`
   - Find line 816: `action="https://formspree.io/f/YOUR_FORM_ID"`
   - Replace `YOUR_FORM_ID` with your actual form ID
   - Example: `action="https://formspree.io/f/xpzbkdqw"`

4. **Test it!**
   - Open your website
   - Fill out the contact form
   - You'll receive the submission at jippropainting@gmail.com

## Option 2: EmailJS (Also Free)

1. Sign up at [EmailJS.com](https://www.emailjs.com/)
2. Follow their setup guide
3. Update the JavaScript in `js/script.js`

## Option 3: Netlify Forms (If hosting on Netlify)

1. Add `netlify` attribute to the form tag:
   ```html
   <form netlify name="contact" method="POST">
   ```
2. Deploy to Netlify
3. Forms automatically work!

## Current Behavior

Right now, the form shows a success message but doesn't actually send emails. Once you complete any of the options above, it will start working!

## Form Fields Included

- Name
- Email
- Phone
- Service Type (dropdown)
- Project Details (text area)

All submissions will go to: **jippropainting@gmail.com**

---

**Recommended:** Use Formspree - it's the fastest and easiest setup!
