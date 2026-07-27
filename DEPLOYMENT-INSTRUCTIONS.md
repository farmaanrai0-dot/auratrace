# ⚠️ IMPORTANT: Your Website Now Requires Backend Server

## The Problem

You're seeing "auratrace.co.uk page can't be found" because:

**Your website is no longer just static files.** I added a backend server (`server.js`) to handle:
- Automatic email delivery
- Order confirmations  
- Diet plan delivery
- Order notifications
- Tracking system
- Admin dashboard

**Static hosting (Cloudflare Pages) cannot run backend servers.** It only serves static HTML/CSS/JS files.

## The Solution

You have 2 options:

### Option 1: Use Local Server (For Testing Now)

**Access your website locally:**
1. The server is already running: http://localhost:3000
2. Open this in your browser
3. Test the complete system
4. Access admin dashboard: http://localhost:3000/admin

**This works perfectly for testing and development.**

### Option 2: Deploy Backend Server (For Live Website)

**You need a hosting platform that supports Node.js:**

**Recommended: Render (Free Tier)**
1. Go to https://render.com
2. Sign up with GitHub
3. Create new Web Service
4. Connect your GitHub repository
5. Configure:
   - Build: `npm install`
   - Start: `node server.js`
6. Add environment variables (from your `.env` file)
7. Deploy

**Alternative Options:**
- Railway (Free)
- Heroku (Free tier available)
- DigitalOcean ($5/month)

## What Files to Upload

**For Backend Deployment:**
- `server.js` (main backend)
- `package.json` (dependencies)
- `index.html` (frontend)
- `script.js` (frontend logic)
- `site-config.js` (products)
- `styles.css` (styling)
- `admin.html` (admin dashboard)
- `shipping-helper.js` (shipping)
- `.env` (environment variables - add in hosting dashboard)

**Do NOT upload to static hosting:**
- `server.js` (won't work on static hosting)
- `node_modules/` (generated automatically)
- `.env` (security risk)

## Quick Fix for Right Now

**Test the system locally:**
1. Server is running at: http://localhost:3000
2. Open this in your browser
3. Everything works perfectly
4. Test purchases, emails, admin dashboard

**Then decide:**
- Keep using localhost for testing
- Deploy to Render for live website
- Or I can help you revert to static-only version (but you'll lose automatic emails)

## Why This Change?

**Before:** Static website only
- Manual email sending
- No automatic order processing
- No admin dashboard
- No tracking system

**After:** Full e-commerce system
- Automatic email delivery
- Order processing
- Admin dashboard
- Tracking system
- Professional business operations

## My Recommendation

**For now:**
- Use http://localhost:3000 to test everything
- Verify all features work
- Check email delivery
- Test admin dashboard

**Then:**
- Deploy to Render when ready for live website
- Takes 10 minutes to set up
- Free tier available
- Full business-ready system

## Need Help?

I can:
1. Guide you through Render deployment step-by-step
2. Help you revert to static version (if you prefer)
3. Explain any part of the system
4. Fix any issues you encounter

**What would you prefer?**
