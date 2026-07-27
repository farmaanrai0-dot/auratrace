# Backend Server Setup Guide for Automatic Email Delivery

## Problem Solved:
This backend server will automatically:
- Send order confirmation emails to customers
- Deliver diet plans via email immediately after purchase
- Send you notifications when orders come in
- Enable shipping tracking system
- Handle Stripe webhooks for real-time order processing

## Important: Hosting Change Required
**This requires moving from static Cloudflare Pages to a backend hosting service:**
- Options: Heroku, Render, Railway, DigitalOcean, Vercel (backend)
- Your current static hosting cannot run this server

## Setup Steps:

### Step 1: Install Dependencies (Fix PowerShell Issue)

**Option A: Enable PowerShell Scripts (One-time)**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Then run: `npm install`

**Option B: Use Command Prompt instead of PowerShell**
1. Open Command Prompt (cmd)
2. Navigate to your folder: `cd c:\Users\Shadow\AuraTrace`
3. Run: `npm install`

**Option C: Manual Installation**
```powershell
npm install express stripe nodemailer dotenv --save
```

### Step 2: Set Up Gmail App Password

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification if not enabled
3. Search for "App Passwords"
4. Create new app password named "AuraTrace"
5. Copy the 16-character password (format: xxxx xxxx xxxx xxxx)
6. Create `.env` file with:
```
EMAIL_USER=hello@auratrace.co.uk
EMAIL_PASS=your_16_char_app_password_here
```

### Step 3: Configure Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/webhook`
3. Select events: `checkout.session.completed`
4. Copy the webhook signing secret
5. Add to `.env`:
```
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### Step 4: Deploy Backend Server

**Recommended: Render (Free tier available)**
1. Go to https://render.com
2. Create new Web Service
3. Connect your GitHub repository
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add environment variables from your `.env` file
7. Deploy

**Alternative: Heroku**
1. Install Heroku CLI
2. `heroku create`
3. `heroku addons:create heroku-postgresql`
4. `heroku config:set EMAIL_USER=hello@auratrace.co.uk`
5. `heroku config:set EMAIL_PASS=your_password`
6. `git push heroku main`

### Step 5: Update Frontend to Use Backend

**Update script.js checkout section:**
```javascript
// Replace the current Stripe checkout with backend call
fetch('/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    items: cart,
    customerName,
    customerEmail,
    deliveryAddress,
    notes
  })
})
```

### Step 6: Test the System

1. Start server locally: `npm start`
2. Make a test purchase
3. Check:
   - Customer receives confirmation email
   - Diet plan email is sent (if diet plan purchased)
   - You receive order notification email
   - Order appears in `/orders` endpoint

## Files Modified/Created:

**Updated:**
- `server.js` - Added email delivery, webhooks, tracking
- `package.json` - Added nodemailer, dotenv dependencies

**Created:**
- `.env.example` - Template for environment variables
- `BACKEND-SETUP-GUIDE.md` - This guide

## How It Works:

**Order Flow:**
1. Customer purchases via Stripe
2. Stripe sends webhook to your server
3. Server processes order and sends emails:
   - Order confirmation to customer
   - Diet plan (if purchased) to customer
   - Order notification to you
4. You can add tracking via `/orders/:id/tracking` endpoint

**Diet Plan Delivery:**
- Automatic email with plan content
- Currently sends placeholder (needs full content extraction)
- Customer receives immediately after payment

**Shipping Tracking:**
- POST to `/orders/:id/tracking` with tracking number
- Customer can be notified of shipping status
- Integration with Royal Mail/DPD tracking APIs possible

## Next Steps:

1. Complete npm dependency installation
2. Set up Gmail App Password
3. Choose backend hosting platform
4. Deploy server
5. Configure Stripe webhook
6. Test with real purchase
7. Update frontend to use backend instead of payment links

## Cost Considerations:

**Free Options:**
- Render (Free tier available)
- Railway (Free tier available)
- Heroku (Free tier available)

**Paid Options (Better performance):**
- DigitalOcean ($5/month)
- AWS (Free tier available)
- Google Cloud (Free tier available)

## Important Notes:

- This replaces your current static hosting approach
- You'll need a domain that points to your backend server
- SSL certificate is required for Stripe webhooks (provided by most hosting)
- Email sending limits: Gmail has daily sending limits
- Consider transactional email service (SendGrid, Mailgun) for high volume
