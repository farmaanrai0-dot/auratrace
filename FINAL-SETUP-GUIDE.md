# Final Setup & Deployment Guide - Complete Email Delivery System

## ✅ What's Been Completed:

**Backend Server:**
- ✅ Server running locally at http://localhost:3000
- ✅ Email system configured with farmaanrai0@gmail.com
- ✅ Automatic order confirmation emails
- ✅ Instant diet plan delivery via email
- ✅ Order notifications to you
- ✅ Stripe webhook integration
- ✅ Shipping tracking system

**Frontend Updates:**
- ✅ Updated to use backend checkout
- ✅ Fallback to payment links if backend fails
- ✅ Supports single and multiple item purchases

**Files Updated/Created:**
- ✅ `server.js` - Complete backend with email delivery
- ✅ `package.json` - Added nodemailer, dotenv dependencies
- ✅ `.env` - Email credentials configured
- ✅ `script.js` - Updated checkout to use backend
- ✅ `render.yaml` - Render deployment configuration

## 🚀 Deployment Steps:

### Step 1: Deploy to Render (Free Tier)

1. **Create Render Account:**
   - Go to https://render.com
   - Sign up with GitHub (free)
   - Click "New" → "Web Service"

2. **Connect Your Repository:**
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
   Click "Environment" tab and add:
   ```
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   EMAIL_USER=farmaanrai0@gmail.com
   EMAIL_PASS=your_gmail_app_password_here
   PORT=3000
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Copy the deployed URL (e.g., https://auratrace-backend.onrender.com)

### Step 2: Configure Stripe Webhook

1. **Go to Stripe Dashboard:**
   - https://dashboard.stripe.com/acct_1Twdp0Gb6eszdT6d/developers/webhooks

2. **Add Webhook Endpoint:**
   - Click "Add endpoint"
   - Enter your deployed URL: `https://your-app-url.onrender.com/webhook`
   - Select events: `checkout.session.completed`
   - Click "Add endpoint"

3. **Get Webhook Secret:**
   - Click on the newly created webhook
   - Copy the "Signing secret" (starts with `whsec_`)
   - Add to Render environment variables:
     ```
     STRIPE_WEBHOOK_SECRET=whsec_your_copied_secret
     ```

### Step 3: Update Domain (Optional)

If you want to use your own domain:
1. Go to Render dashboard
2. Click "Domains" tab
3. Add your custom domain
4. Update DNS records as instructed

### Step 4: Test the Complete System

**Local Testing (Current Setup):**
1. Open http://localhost:3000 in browser
2. Add items to cart
3. Complete checkout with Stripe
4. Check emails:
   - Customer receives confirmation email
   - Diet plan email (if diet plan purchased)
   - You receive order notification at farmaanrai0@gmail.com

**Live Testing (After Deployment):**
1. Open your deployed URL
2. Repeat the same test
3. Verify all emails work
4. Check Stripe webhook logs in dashboard

## 📧 Email System Features:

**Automatic Emails Sent:**

1. **Order Confirmation (to customer):**
   - Order ID and details
   - Items purchased
   - Total amount
   - Delivery address
   - Contact information

2. **Diet Plan Delivery (to customer):**
   - Immediate delivery after purchase
   - Plan content included in email
   - Support contact information
   - Medical disclaimer

3. **Order Notification (to you):**
   - New order alert
   - Customer details
   - Order items and total
   - Delivery address
   - Action required notification

## 📦 Shipping Tracking System:

**Add Tracking Information:**
```bash
POST /orders/:id/tracking
{
  "trackingNumber": "RM123456789GB",
  "carrier": "Royal Mail"
}
```

**Future Enhancements:**
- Royal Mail API integration
- DPD API integration
- Automatic tracking updates
- Customer shipping notifications

## 🔧 Troubleshooting:

**Server Not Starting:**
- Check Node.js version (requires 16+)
- Run `npm install` again
- Check .env file exists

**Emails Not Sending:**
- Verify Gmail app password is correct
- Check Gmail account security settings
- Check server logs for errors

**Stripe Webhook Failing:**
- Verify webhook URL is correct
- Check webhook secret matches
- Ensure SSL certificate is valid (Render provides this)

**Frontend Not Connecting:**
- Ensure server is running
- Check browser console for errors
- Verify fetch URL is correct

## 📁 Files to Deploy:

**Required Files:**
- `server.js` (backend server)
- `package.json` (dependencies)
- `index.html` (frontend)
- `script.js` (frontend logic)
- `site-config.js` (product data)
- `styles.css` (styling)
- `manifest.json` (PWA)
- `service-worker.js` (PWA)
- `icon-192.png` (app icon)
- `icon-512.png` (app icon)

**Environment Variables (in Render, not in files):**
- STRIPE_SECRET_KEY
- EMAIL_USER
- EMAIL_PASS
- STRIPE_WEBHOOK_SECRET
- PORT

**Do NOT Deploy:**
- `.env` file (contains sensitive data)
- `node_modules` folder
- `.git` folder

## 🎯 Current Status:

**Local Server:** ✅ Running at http://localhost:3000
**Email System:** ✅ Configured and ready
**Frontend:** ✅ Updated to use backend
**Deployment:** ⏳ Ready for cloud deployment

## 🚀 Quick Start (Local Testing):

1. **Server is already running** at http://localhost:3000
2. **Open browser** to http://localhost:3000
3. **Test purchase** any product
4. **Check emails** at farmaanrai0@gmail.com
5. **Verify** all three emails are received

## 📱 After Cloud Deployment:

1. **Update any hardcoded URLs** in frontend to use new domain
2. **Test complete order flow** on live site
3. **Monitor email delivery** for first few orders
4. **Check Stripe webhook logs** regularly
5. **Set up order monitoring** for business operations

## 💡 Important Notes:

- **Email Limits:** Gmail has daily sending limits (consider SendGrid for high volume)
- **Webhook Security:** Keep webhook secret secure
- **SSL Required:** Stripe webhooks require SSL (Render provides this)
- **Database:** Currently using in-memory storage (consider MongoDB/PostgreSQL for production)
- **Backup:** Regular backups of order data recommended

## 🎉 You're Ready!

The system is fully functional locally. Deploy to Render following the steps above, and you'll have a complete automated order and email delivery system.

**For any issues, check:**
- Server logs in Render dashboard
- Stripe webhook logs
- Gmail sent folder
- Browser console for frontend errors
