# Diet Plan Delivery Guide

## Manual Diet Plan Delivery Workflow

Since you're using static hosting, diet plans will be delivered manually after purchase. Here's the complete workflow:

## Step 1: Monitor for Diet Plan Purchases

**Check Stripe Dashboard:**
1. Go to https://dashboard.stripe.com/acct_1Twdp0Gb6eszdT6d/payments
2. Look for payments with product IDs 2001-2012
3. Note the customer's email address and purchased plan

**Product ID Reference:**
- 2001: Underweight to Healthy Weight Plan (Vegetarian) - £2.99
- 2002: Underweight to Healthy Weight Plan (Non-Vegetarian) - £2.99
- 2003: Overweight Weight Loss Plan (Vegetarian) - £2.99
- 2004: Overweight Weight Loss Plan (Non-Vegetarian) - £2.99
- 2005: Obese Weight Loss Plan (Vegetarian) - £2.99
- 2006: Obese Weight Loss Plan (Non-Vegetarian) - £2.99
- 2007: DASH Diet Plan for Hypertension (Vegetarian) - £5.99
- 2008: DASH Diet Plan for Hypertension (Non-Vegetarian) - £5.99
- 2009: Diabetes Management Plan (Vegetarian) - £5.99
- 2010: Diabetes Management Plan (Non-Vegetarian) - £5.99
- 2011: Anti-Inflammatory Arthritis Plan (Vegetarian) - £5.99
- 2012: Anti-Inflammatory Arthritis Plan (Non-Vegetarian) - £5.99

## Step 2: Prepare Diet Plan Files

Each diet plan is stored in the website's JavaScript. To deliver them:

1. **Access the diet plan data:**
   - Open `script.js` file
   - Find the `dietPlans` object (around line 23)
   - Locate the specific plan by ID

2. **Create delivery format:**
   - Copy the meal plans and shopping list
   - Format as a clean PDF or document
   - Include the 7-day meal schedule
   - Include the shopping list
   - Add preparation tips

## Step 3: Send Diet Plan to Customer

**Email Delivery (Recommended):**
1. Use hello@auratrace.co.uk
2. Subject: "Your AuraTrace Diet Plan - [Plan Name]"
3. Attach the formatted diet plan
4. Include:
   - Thank you message
   - Plan overview
   - How to use the plan
   - Contact information for questions

**WhatsApp Delivery (Alternative):**
1. Use +447575630141
2. Send formatted text version
3. Include meal schedule and shopping list
4. Offer to send PDF via email if preferred

## Step 4: Record Delivery

**Track Deliveries:**
- Maintain a simple spreadsheet
- Record: Date, Customer Email, Plan ID, Delivery Method, Status
- This helps with customer service and follow-ups

## Email Template

**Subject:** Your AuraTrace Diet Plan - [Plan Name]

**Body:**
```
Dear Customer,

Thank you for purchasing the [Plan Name] from AuraTrace!

Your diet plan is attached to this email. It includes:

- 7-day detailed meal schedule
- Complete shopping list
- Preparation tips
- Nutritional guidance

How to use your plan:
1. Review the meal schedule for the week
2. Use the shopping list to purchase ingredients
3. Follow the meal timing suggestions
4. Adjust portions based on your hunger and energy levels

Important Notes:
- This plan supports healthy eating habits
- Consult a healthcare provider for medical conditions
- Stay hydrated and listen to your body
- Adjust as needed based on your preferences

If you have any questions about your plan, please contact us:
- WhatsApp: +447575630141
- Email: hello@auratrace.co.uk

We hope you achieve your health goals with this plan!

Best regards,
AuraTrace Team
```

## WhatsApp Template

```
Hello! Thank you for purchasing the [Plan Name] from AuraTrace.

Your diet plan includes:
📅 7-day meal schedule
🛒 Complete shopping list
💡 Preparation tips

I can send you the detailed PDF version via email, or share the plan details here. Which would you prefer?

For questions: +447575630141 or hello@auratrace.co.uk
```

## Automation Options (Future)

If you want to automate this process in the future, you'll need:

1. **Backend Server** - To process webhooks from Stripe
2. **Email Service** - Like SendGrid or Mailgun
3. **Database** - To track orders and deliveries
4. **PDF Generation** - To automatically create diet plan PDFs

For now, the manual workflow works perfectly for starting your business.

## Quality Control

**Before sending:**
- Verify the correct plan for the customer
- Check customer email address
- Ensure file is properly formatted
- Test attachment size (keep under 10MB)

**After sending:**
- Mark as delivered in your tracking
- Follow up after 1 week for feedback
- Address any customer questions promptly
