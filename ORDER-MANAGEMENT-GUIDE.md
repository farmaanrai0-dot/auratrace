# AuraTrace Order Management Guide

## Order Notification Setup

### 1. Stripe Email Notifications
1. Go to https://dashboard.stripe.com/acct_1Twdp0Gb6eszdT6d/settings/notifications
2. Enable email notifications for:
   - Successful payments
   - Payment failures
   - Disputes
3. Add your email: farmaanrai0@gmail.com

### 2. WhatsApp Business Setup
1. Download WhatsApp Business app
2. Set up business profile with AuraTrace details
3. Use number: +447733341867 for notifications
4. Enable WhatsApp Business API for automated messages (optional)

### 3. SMS Notifications (Alternative)
1. Use Twilio or similar service
2. Configure webhook from Stripe to send SMS
3. Set up alerts for new orders to +447733341867

## Shipping Label Generation

### Royal Mail Click & Drop (Recommended)
1. Register at https://www.royalmail.com/click-and-drop
2. Connect your Stripe account
3. Automatic order import
4. Print labels at home
5. Schedule collection or drop off

### Alternative Shipping Providers
- **DPD Online**: For larger parcels
- **Hermes**: Budget option
- **ShipStation**: Professional platform with multiple carriers

## Order Processing Workflow

1. **Order Received**
   - Check Stripe Dashboard for payment
   - Check WhatsApp/Email for manual orders
   - Verify customer details

2. **Order Confirmation**
   - Send confirmation email to customer
   - Send WhatsApp message with order details
   - Update order status to "Processing"

3. **Shipping**
   - Generate shipping label
   - Package products
   - Dispatch order
   - Send tracking number to customer

4. **Order Completion**
   - Mark as "Shipped" in Stripe
   - Send delivery confirmation
   - Request customer feedback

## Essential E-commerce Features Implemented

✅ **Payment Processing**
- Stripe integration with payment links
- Bank transfer option
- WhatsApp/Email order support

✅ **Order Management**
- Order tracking in Stripe Dashboard
- Customer data collection
- Order history in localStorage

✅ **Customer Communication**
- WhatsApp support (+447575630141)
- Email support (hello@auratrace.co.uk)
- Order confirmation messages

✅ **Discount System**
- 15% first-order discount (WELCOME15)
- Automatic discount application
- Customer tracking for repeat orders

✅ **Mobile Optimization**
- Responsive design
- Mobile menu improvements
- Touch-friendly interface

## Additional Features to Consider

### Backend Server Required For:
- Real-time inventory management
- Automated email notifications
- SMS notifications
- Advanced order tracking
- Customer accounts
- Subscription management

### Manual Solutions Available:
- Order tracking via Stripe Dashboard
- Manual email notifications
- WhatsApp Business for customer communication
- Royal Mail Click & Drop for shipping labels

## Order Status Tracking

Use these order statuses in your communications:
- **Pending**: Order received, awaiting payment
- **Processing**: Payment confirmed, preparing for shipment
- **Shipped**: Order dispatched with tracking
- **Delivered**: Order successfully delivered
- **Cancelled**: Order cancelled by customer or merchant

## Customer Support

**Primary Contact:**
- WhatsApp: +447575630141
- Email: hello@auratrace.co.uk

**Owner Contact:**
- Phone: +447733341867
- Email: farmaanrai0@gmail.com

## Business Operations

**Daily Tasks:**
1. Check Stripe Dashboard for new orders
2. Check WhatsApp/Email for manual orders
3. Process and ship orders
4. Update order status
5. Handle customer inquiries

**Weekly Tasks:**
1. Review sales performance
2. Update inventory if needed
3. Plan marketing activities
4. Handle returns/refunds

**Monthly Tasks:**
1. Financial reconciliation
2. Business performance review
3. Product planning
4. Customer feedback analysis
