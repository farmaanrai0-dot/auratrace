# AuraTrace Deployment Guide

## Prerequisites
- Node.js installed locally
- Git account
- Hosting platform account (choose one below)

## Hosting Options

### Option 1: Railway (Recommended - Free tier available)
1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub repository
4. Railway will detect Node.js automatically
5. Add environment variables in Railway dashboard:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `SESSION_SECRET` (generate random string)
6. Click "Deploy"

### Option 2: Heroku
1. Install Heroku CLI: `npm install -g heroku`
2. Login: `heroku login`
3. Create app: `heroku create auratrace`
4. Set environment variables:
   ```bash
   heroku config:set STRIPE_SECRET_KEY=your_key
   heroku config:set STRIPE_WEBHOOK_SECRET=your_secret
   heroku config:set EMAIL_USER=farmaanrai0@gmail.com
   heroku config:set EMAIL_PASS=your_app_password
   heroku config:set SESSION_SECRET=random_secret_string
   ```
5. Deploy: `git push heroku main`

### Option 3: Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel`
4. Add environment variables in Vercel dashboard
5. Redeploy: `vercel --prod`

## Environment Variables Required

Copy `.env.example` to `.env` and fill in:
- `STRIPE_SECRET_KEY` - From Stripe Dashboard
- `STRIPE_WEBHOOK_SECRET` - From Stripe Webhooks settings
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASS` - Gmail App Password (not regular password)
- `SESSION_SECRET` - Random string for session security
- `PORT` - Usually set by hosting platform

## Stripe Webhook Setup

After deployment:
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-domain.com/stripe-webhook`
3. Select events: `checkout.session.completed`
4. Copy webhook secret to environment variables

## Testing After Deployment

1. Visit your live URL
2. Test user registration
3. Test login
4. Add item to cart
5. Test checkout with Stripe
6. Verify email delivery
7. Check admin dashboard

## Admin Credentials

- Email: farmaanrai0@gmail.com
- Password: admin123 (change this in production!)

## Security Notes

⚠️ **Important for Production:**
1. Change admin password in `server.js`
2. Use strong SESSION_SECRET
3. Enable HTTPS (most platforms do this automatically)
4. Set up proper CORS if needed
5. Consider using a real database instead of in-memory storage
