const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const { generateShippingLabelData, generateLabelPrintout } = require('./shipping-helper');

const app = express();
const PORT = process.env.PORT || 3000;

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'farmaanrai0@gmail.com',
    pass: process.env.EMAIL_PASS // Use Gmail App Password
  }
});

app.use(express.json());
app.use(express.static('.'));

// Store orders in memory (in production, use a database)
const orders = [];

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, customerName, customerEmail, deliveryAddress, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name,
          description: item.category || 'AuraTrace product',
        },
        unit_amount: Math.round(Number(item.price || 0) * 100),
      },
      quantity: Math.max(1, Number(item.quantity || 1)),
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerEmail || undefined,
      success_url: `${req.protocol}://${req.get('host')}/?success=true`,
      cancel_url: `${req.protocol}://${req.get('host')}/?canceled=true`,
      metadata: {
        order_id: Date.now().toString(),
        customer_name: customerName || '',
        customer_email: customerEmail || '',
        delivery_address: deliveryAddress || '',
        notes: notes || '',
        items: JSON.stringify(items)
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Stripe webhook for order completion
app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await handleOrderCompletion(session);
    }
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

async function handleOrderCompletion(session) {
  const { metadata, customer_email, customer_details } = session;
  
  try {
    const order = {
      id: metadata.order_id,
      customerName: metadata.customer_name || customer_details?.name,
      customerEmail: metadata.customer_email || customer_email,
      deliveryAddress: metadata.delivery_address,
      notes: metadata.notes,
      items: JSON.parse(metadata.items || '[]'),
      total: session.amount_total / 100,
      status: 'paid',
      createdAt: new Date().toISOString()
    };

    orders.push(order);

    // Check if order contains diet plans
    const dietPlanItems = order.items.filter(item => item.id >= 2001 && item.id <= 2012);
    const physicalItems = order.items.filter(item => item.id < 2001);

    // Send order confirmation email
    await sendOrderConfirmation(order);

    // Send diet plans if purchased
    if (dietPlanItems.length > 0) {
      await sendDietPlans(order, dietPlanItems);
    }

    // Send notification to owner
    await sendOwnerNotification(order);
    
    console.log(`Order ${order.id} processed successfully`);
  } catch (error) {
    console.error('Error processing order:', error);
    throw error;
  }
}

async function sendOrderConfirmation(order) {
  const dietPlanItems = order.items.filter(item => item.id >= 2001 && item.id <= 2012);
  const physicalItems = order.items.filter(item => item.id < 2001);
  
  const mailOptions = {
    from: 'farmaanrai0@gmail.com',
    to: order.customerEmail,
    subject: `Order Confirmation - AuraTrace #${order.id}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2d5a27; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 5px; }
          .order-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
          .item { padding: 10px; border-bottom: 1px solid #eee; }
          .total { font-size: 18px; font-weight: bold; color: #2d5a27; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          .button { background: #2d5a27; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>AuraTrace</h1>
            <p>Premium Herbal Wellness</p>
          </div>
          <div class="content">
            <h2>Order Confirmation</h2>
            <p>Thank you for your order! We've received it and will begin processing shortly.</p>
            
            <div class="order-details">
              <h3>Order Details</h3>
              <p><strong>Order ID:</strong> #${order.id}</p>
              <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> <span class="total">£${order.total.toFixed(2)}</span></p>
            </div>
            
            <div class="order-details">
              <h3>Items Ordered</h3>
              ${order.items.map(item => `
                <div class="item">
                  <strong>${item.name}</strong><br>
                  Price: £${item.price.toFixed(2)} x ${item.quantity}<br>
                  Subtotal: £${(item.price * item.quantity).toFixed(2)}
                </div>
              `).join('')}
            </div>
            
            ${dietPlanItems.length > 0 ? `
              <div class="order-details" style="background: #e8f5e9;">
                <h3>📧 Digital Products</h3>
                <p>Your diet plan(s) will be delivered to this email address shortly.</p>
                <p><strong>Diet Plans:</strong> ${dietPlanItems.map(item => item.name).join(', ')}</p>
              </div>
            ` : ''}
            
            ${physicalItems.length > 0 ? `
              <div class="order-details">
                <h3>📦 Shipping Information</h3>
                <p><strong>Delivery Address:</strong><br>${order.deliveryAddress.replace(/\n/g, '<br>')}</p>
                <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
                <p>We'll send you tracking information once your order is dispatched.</p>
              </div>
            ` : ''}
            
            <div class="order-details">
              <h3>💳 Payment</h3>
              <p>Payment processed securely via Stripe</p>
              <p>Status: <strong>Paid</strong></p>
            </div>
            
            <p><strong>Need Help?</strong></p>
            <p>Email: hello@auratrace.co.uk<br>WhatsApp: +447575630141</p>
            
            <p>Thank you for choosing AuraTrace for your wellness journey!</p>
          </div>
          <div class="footer">
            <p>© 2026 AuraTrace. All rights reserved.</p>
            <p>This is an automated email. Please do not reply directly.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation sent to ${order.customerEmail}`);
  } catch (error) {
    console.error('Error sending order confirmation:', error);
    throw error;
  }
}

async function sendDietPlans(order, dietPlanItems) {
  for (const item of dietPlanItems) {
    try {
      const planId = item.id.toString();
      const planContent = getDietPlanContent(planId);
      
      const mailOptions = {
        from: 'farmaanrai0@gmail.com',
        to: order.customerEmail,
        subject: `Your Diet Plan - ${item.name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #2d5a27; color: white; padding: 20px; text-align: center; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 5px; }
              .plan-content { background: white; padding: 20px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #2d5a27; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>AuraTrace</h1>
                <p>Your Personalized Diet Plan</p>
              </div>
              <div class="content">
                <h2>🎉 Your Diet Plan is Ready!</h2>
                <p>Thank you for purchasing <strong>${item.name}</strong></p>
                <p>Order ID: #${order.id}</p>
                
                <div class="plan-content">
                  <h3>📋 Your 7-Day Diet Plan</h3>
                  ${planContent}
                </div>
                
                <div class="plan-content" style="background: #fff3e0;">
                  <h3>💡 Important Guidelines</h3>
                  <ul>
                    <li>Follow the meal timing suggestions for best results</li>
                    <li>Stay hydrated - drink at least 8 glasses of water daily</li>
                    <li>Adjust portions based on your hunger and energy levels</li>
                    <li>These plans support healthy eating habits</li>
                    <li>Consult a healthcare provider for medical conditions</li>
                  </ul>
                </div>
                
                <div class="plan-content">
                  <h3>📞 Support & Questions</h3>
                  <p>If you have any questions about your plan:</p>
                  <p><strong>Email:</strong> hello@auratrace.co.uk<br>
                  <strong>WhatsApp:</strong> +447575630141</p>
                </div>
                
                <p>Please save this email for future reference. Your diet plan is now available!</p>
              </div>
              <div class="footer">
                <p>© 2026 AuraTrace. All rights reserved.</p>
                <p>This is an automated email. Please do not reply directly.</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`Diet plan sent to ${order.customerEmail} for ${item.name}`);
    } catch (error) {
      console.error(`Error sending diet plan for ${item.name}:`, error);
      // Continue with other diet plans even if one fails
    }
  }
}

async function sendOwnerNotification(order) {
  const dietPlanItems = order.items.filter(item => item.id >= 2001 && item.id <= 2012);
  const physicalItems = order.items.filter(item => item.id < 2001);
  
  const mailOptions = {
    from: 'farmaanrai0@gmail.com',
    to: 'farmaanrai0@gmail.com',
    subject: `🔔 NEW ORDER - #${order.id} - £${order.total.toFixed(2)}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #ff6b6b; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 5px; }
          .urgent { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 15px 0; }
          .order-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
          .item { padding: 10px; border-bottom: 1px solid #eee; }
          .total { font-size: 20px; font-weight: bold; color: #2d5a27; }
          .action-box { background: #2d5a27; color: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 NEW ORDER RECEIVED</h1>
            <p>Action Required</p>
          </div>
          <div class="content">
            <div class="urgent">
              <h3>⚡ URGENT: Process This Order</h3>
              <p>A new order has been received and needs immediate processing.</p>
            </div>
            
            <div class="order-details">
              <h3>📋 Order Information</h3>
              <p><strong>Order ID:</strong> #${order.id}</p>
              <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Total:</strong> <span class="total">£${order.total.toFixed(2)}</span></p>
            </div>
            
            <div class="order-details">
              <h3>👤 Customer Details</h3>
              <p><strong>Name:</strong> ${order.customerName}</p>
              <p><strong>Email:</strong> <a href="mailto:${order.customerEmail}">${order.customerEmail}</a></p>
              <p><strong>Delivery Address:</strong><br>${order.deliveryAddress.replace(/\n/g, '<br>')}</p>
              ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ''}
            </div>
            
            <div class="order-details">
              <h3>📦 Items Ordered</h3>
              ${order.items.map(item => `
                <div class="item">
                  <strong>${item.name}</strong><br>
                  Price: £${item.price.toFixed(2)} x ${item.quantity}<br>
                  Subtotal: £${(item.price * item.quantity).toFixed(2)}
                </div>
              `).join('')}
            </div>
            
            ${dietPlanItems.length > 0 ? `
              <div class="order-details" style="background: #e8f5e9;">
                <h3>📧 Digital Products (Auto-Delivered)</h3>
                <p>Diet plans have been automatically delivered to customer.</p>
                <p><strong>Plans:</strong> ${dietPlanItems.map(item => item.name).join(', ')}</p>
              </div>
            ` : ''}
            
            ${physicalItems.length > 0 ? `
              <div class="order-details">
                <h3>🚚 Physical Products (Shipping Required)</h3>
                <p><strong>Items to ship:</strong> ${physicalItems.length}</p>
                <p><strong>Shipping carrier options:</strong></p>
                <ul>
                  <li>Royal Mail Click & Drop</li>
                  <li>DPD Online</li>
                  <li>Hermes</li>
                  <li>ShipStation</li>
                </ul>
              </div>
            ` : ''}
            
            <div class="action-box">
              <h3>🎯 Required Actions</h3>
              <ol>
                ${physicalItems.length > 0 ? `
                  <li><strong>Package items</strong> - Prepare order for shipping</li>
                  <li><strong>Create shipping label</strong> - Use preferred carrier</li>
                  <li><strong>Add tracking</strong> - Update order with tracking number</li>
                  <li><strong>Dispatch order</strong> - Ship to customer address</li>
                ` : ''}
                <li><strong>Monitor delivery</strong> - Track until customer receives</li>
                ${physicalItems.length > 0 ? `
                  <li><strong>Notify customer</strong> - Send tracking information</li>
                ` : ''}
              </ol>
            </div>
            
            <div class="order-details">
              <h3>📞 Quick Contact</h3>
              <p><strong>Email Customer:</strong> <a href="mailto:${order.customerEmail}">${order.customerEmail}</a></p>
              <p><strong>WhatsApp Support:</strong> +447575630141</p>
            </div>
            
            <p><em>This is an automated notification. Please process this order promptly.</em></p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Owner notification sent for order ${order.id}`);
  } catch (error) {
    console.error('Error sending owner notification:', error);
    throw error;
  }
}

async function sendTrackingNotification(order) {
  const mailOptions = {
    from: 'farmaanrai0@gmail.com',
    to: order.customerEmail,
    subject: `🚚 Your Order Has Been Shipped - #${order.id}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2d5a27; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 5px; }
          .tracking-info { background: white; padding: 20px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #2d5a27; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>AuraTrace</h1>
            <p>Your Order is on the Way!</p>
          </div>
          <div class="content">
            <h2>🚚 Shipping Update</h2>
            <p>Great news! Your order has been shipped and is on its way to you.</p>
            
            <div class="tracking-info">
              <h3>📦 Tracking Information</h3>
              <p><strong>Order ID:</strong> #${order.id}</p>
              <p><strong>Carrier:</strong> ${order.carrier}</p>
              <p><strong>Tracking Number:</strong> <strong>${order.trackingNumber}</strong></p>
              <p><strong>Shipped Date:</strong> ${new Date(order.shippedAt).toLocaleDateString()}</p>
            </div>
            
            <div class="tracking-info">
              <h3>📍 Track Your Package</h3>
              <p>You can track your package using the tracking number above on the carrier's website.</p>
              ${order.carrier === 'Royal Mail' ? '<p><a href="https://www.royalmail.com/track-your-item">Track on Royal Mail</a></p>' : ''}
              ${order.carrier === 'DPD' ? '<p><a href="https://www.dpd.co.uk/service/">Track on DPD</a></p>' : ''}
            </div>
            
            <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
            <p><strong>Delivery Address:</strong><br>${order.deliveryAddress.replace(/\n/g, '<br>')}</p>
            
            ${order.shippingNotes ? `<p><strong>Additional Notes:</strong> ${order.shippingNotes}</p>` : ''}
            
            <p><strong>Need Help?</strong></p>
            <p>Email: hello@auratrace.co.uk<br>WhatsApp: +447575630141</p>
          </div>
          <div class="footer">
            <p>© 2026 AuraTrace. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Tracking notification sent to ${order.customerEmail}`);
  } catch (error) {
    console.error('Error sending tracking notification:', error);
    throw error;
  }
}

async function sendDeliveryConfirmation(order) {
  const mailOptions = {
    from: 'farmaanrai0@gmail.com',
    to: order.customerEmail,
    subject: `✅ Order Delivered - #${order.id}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2d5a27; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 5px; }
          .delivery-info { background: #e8f5e9; padding: 20px; margin: 15px 0; border-radius: 5px; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>AuraTrace</h1>
            <p>Order Successfully Delivered</p>
          </div>
          <div class="content">
            <h2>✅ Delivery Confirmation</h2>
            <p>Your order has been successfully delivered!</p>
            
            <div class="delivery-info">
              <h3>📦 Order Details</h3>
              <p><strong>Order ID:</strong> #${order.id}</p>
              <p><strong>Delivered Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p><strong>Total:</strong> £${order.total.toFixed(2)}</p>
            </div>
            
            <p>We hope you're enjoying your AuraTrace products! If you have any questions or feedback, please don't hesitate to reach out.</p>
            
            <p><strong>Need Help?</strong></p>
            <p>Email: hello@auratrace.co.uk<br>WhatsApp: +447575630141</p>
            
            <p>Thank you for choosing AuraTrace for your wellness journey!</p>
          </div>
          <div class="footer">
            <p>© 2026 AuraTrace. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Delivery confirmation sent to ${order.customerEmail}`);
  } catch (error) {
    console.error('Error sending delivery confirmation:', error);
    throw error;
  }
}

async function sendCancellationNotification(order) {
  const mailOptions = {
    from: 'farmaanrai0@gmail.com',
    to: order.customerEmail,
    subject: `Order Cancelled - #${order.id}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #ff6b6b; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 5px; }
          .cancel-info { background: #fff3cd; padding: 20px; margin: 15px 0; border-radius: 5px; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>AuraTrace</h1>
            <p>Order Cancellation Notice</p>
          </div>
          <div class="content">
            <h2>Order Cancelled</h2>
            <p>Your order has been cancelled.</p>
            
            <div class="cancel-info">
              <h3>📋 Order Details</h3>
              <p><strong>Order ID:</strong> #${order.id}</p>
              <p><strong>Cancelled Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p><strong>Total:</strong> £${order.total.toFixed(2)}</p>
              ${order.statusNotes ? `<p><strong>Reason:</strong> ${order.statusNotes}</p>` : ''}
            </div>
            
            <p>If you have any questions about this cancellation, please contact our support team.</p>
            
            <p><strong>Need Help?</strong></p>
            <p>Email: hello@auratrace.co.uk<br>WhatsApp: +447575630141</p>
          </div>
          <div class="footer">
            <p>© 2026 AuraTrace. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Cancellation notification sent to ${order.customerEmail}`);
  } catch (error) {
    console.error('Error sending cancellation notification:', error);
    throw error;
  }
}

function getDietPlanContent(planId) {
  // Map plan IDs to diet plan content from script.js
  const planIdMap = {
    '2001': 'bmi-underweight-veg',
    '2002': 'bmi-underweight-nonveg',
    '2003': 'bmi-overweight-veg',
    '2004': 'bmi-overweight-nonveg',
    '2005': 'bmi-obese-veg',
    '2006': 'bmi-obese-nonveg',
    '2007': 'condition-hypertension-veg',
    '2008': 'condition-hypertension-nonveg',
    '2009': 'condition-diabetes-veg',
    '2010': 'condition-diabetes-nonveg',
    '2011': 'condition-arthritis-veg',
    '2012': 'condition-arthritis-nonveg'
  };

  const planKey = planIdMap[planId];
  if (!planKey) return '<p>Diet plan not found</p>';

  // For now, return a placeholder. In production, you'd extract the actual content
  // from the dietPlans object in script.js
  return `
    <h3>Your 7-Day Diet Plan</h3>
    <p><strong>Plan ID:</strong> ${planKey}</p>
    <p>This is your personalized diet plan. Please save this email for reference.</p>
    <p><strong>Important:</strong> These plans support healthy eating habits and are not a substitute for diagnosis or treatment. For pregnancy, kidney disease, insulin adjustments, severe hypertension, or complex conditions, consult a qualified clinician before following a new diet plan.</p>
    <p><strong>Contact Support:</strong> hello@auratrace.co.uk or +447575630141</p>
  `;
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/orders', (req, res) => {
  res.json(orders);
});

app.post('/orders/:id/tracking', async (req, res) => {
  const { id } = req.params;
  const { trackingNumber, carrier, notes } = req.body;
  
  const order = orders.find(o => o.id === id);
  if (order) {
    order.trackingNumber = trackingNumber;
    order.carrier = carrier;
    order.status = 'shipped';
    order.shippedAt = new Date().toISOString();
    order.shippingNotes = notes || '';
    
    // Send tracking notification to customer
    await sendTrackingNotification(order);
    
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.put('/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  
  const validStatuses = ['paid', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  const order = orders.find(o => o.id === id);
  if (order) {
    order.status = status;
    order.statusNotes = notes || '';
    order.statusUpdatedAt = new Date().toISOString();
    
    // Send status update notification to customer
    if (status === 'delivered') {
      await sendDeliveryConfirmation(order);
    } else if (status === 'cancelled') {
      await sendCancellationNotification(order);
    }
    
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.get('/orders/:id', (req, res) => {
  const { id } = req.params;
  const order = orders.find(o => o.id === id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.get('/orders', (req, res) => {
  const { status, limit = 50 } = req.query;
  let filteredOrders = orders;
  
  if (status) {
    filteredOrders = orders.filter(o => o.status === status);
  }
  
  res.json(filteredOrders.slice(0, parseInt(limit)));
});

app.post('/orders/:id/shipping-label', (req, res) => {
  const { id } = req.params;
  const { carrier, service } = req.body;
  
  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  try {
    const shippingData = generateShippingLabelData(order, carrier, service);
    const labelPrintout = generateLabelPrintout(shippingData);
    
    res.json({
      success: true,
      shippingData,
      labelPrintout
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/shipping/carriers', (req, res) => {
  const { shippingCarriers } = require('./shipping-helper');
  res.json(shippingCarriers);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin dashboard: http://localhost:${PORT}/admin`);
});
