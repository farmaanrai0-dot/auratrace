# Backend Server Deployment Guide

## Current Status:
✅ Server is running locally on http://localhost:3000
✅ Email configuration set up with farmaanrai0@gmail.com
✅ Dependencies installed
⏳ Ready for deployment

## Deployment Options:

### Option 1: Render (Recommended - Free Tier)

**Manual Deployment Steps:**

1. **Create Render Account:**
   - Go to https://render.com
   - Sign up with GitHub
   - Create new Web Service

2. **Connect Repository:**
   - Connect your GitHub repository containing AuraTrace
   - Select the repository
   - Click "Connect"

3. **Configure Service:**
   - **Name:** auratrace-backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Free (or $7/month for better performance)

4. **Add Environment Variables:**
   ```
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   EMAIL_USER=farmaanrai0@gmail.com
   EMAIL_PASS=your_gmail_app_password_here
   PORT=3000
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Copy the deployed URL

### Option 2: Railway (Free Tier)

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your repository
5. Add environment variables (same as above)
6. Deploy

### Option 3: Heroku (Free Tier)

1. Install Heroku CLI
2. Run: `heroku create auratrace-backend`
3. Run: `heroku config:set STRIPE_SECRET_KEY=your_stripe_secret_key_here`
4. Run: `heroku config:set EMAIL_USER=farmaanrai0@gmail.com`
5. Run: `heroku config:set EMAIL_PASS="your_gmail_app_password_here"`
6. Run: `git push heroku main`

## After Deployment:

### Step 1: Configure Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Enter your deployed URL: `https://your-app-url.onrender.com/webhook`
4. Select events: `checkout.session.completed`
5. Copy the webhook signing secret
6. Add to your hosting environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_copied_secret
   ```

### Step 2: Update Frontend

**Update script.js to use backend:**

Replace the current Stripe checkout section with:
```javascript
// Use backend checkout instead of payment links
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
.then(response => response.json())
.then(data => {
  if (data.url) {
    window.location.href = data.url;
  }
})
```

### Step 3: Test the System

1. Make a test purchase
2. Check emails:
   - Customer receives confirmation
   - Diet plan email (if purchased)
   - You receive order notification
3. Verify webhook works in Stripe Dashboard

## Files Ready for Deployment:

**Required Files:**
- `server.js` (updated with email system)
- `package.json` (with dependencies)
- `.env` (environment variables - don't commit to Git)
- `index.html` (frontend)
- `script.js` (frontend)
- `site-config.js` (product data)
- `styles.css` (styling)

**Important:**
- Don't commit `.env` file to GitHub
- Add environment variables in hosting platform
- Keep your Stripe webhook secret secure

## Current Local Server:

Your server is running locally at: http://localhost:3000

You can test it locally by:
1. Opening http://localhost:3000 in browser
2. Making a test purchase
3. Checking emails from farmaanrai0@gmail.com

## Next Steps:

1. Choose hosting platform (Render recommended)
2. Follow deployment steps above
3. Configure Stripe webhook
4. Update frontend to use backend
5. Test complete order flow
