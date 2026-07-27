const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const fs = require('fs');

const products = [
  {
    id: '1001',
    name: 'AuraTrace Suraksha Herbal Tea',
    description: 'Daily herbal tea blend for seasonal wellness and light digestive comfort. Pack size: 100 g tea blend.',
    price: 9.99
  },
  {
    id: '1007',
    name: 'AuraTrace Apamarga Kshara Tablets',
    description: 'Herbal tablet support for urinary and cleansing routines. Quantity: 60 tablets.',
    price: 17.99
  },
  {
    id: '1011',
    name: 'AuraTrace Arjuna Tablets',
    description: 'Arjuna-based daily support for active lifestyle routines. Quantity: 60 tablets.',
    price: 17.99
  },
  {
    id: '1014',
    name: 'AuraTrace Ashwagandha Tablets',
    description: 'Adaptogenic ashwagandha tablets for stress and stamina support. Quantity: 60 tablets.',
    price: 17.99
  },
  {
    id: '1017',
    name: 'AuraTrace Ashwagandha + Ayush Kwath Combo',
    description: 'Stress and seasonal support combo. Quantity: 60 tablets + 100 g kwath blend.',
    price: 27.99
  },
  {
    id: '1018',
    name: 'AuraTrace Brahmi Tablets',
    description: 'Brahmi formulation for focus and mental clarity routines. Quantity: 30 tablets.',
    price: 10.00
  },
  {
    id: '1020',
    name: 'AuraTrace Giloy Tablets',
    description: 'Giloy tablets for daily resilience support. Quantity: 30 tablets.',
    price: 10.00
  },
  {
    id: '1022',
    name: 'AuraTrace Power Plus Tablets',
    description: 'Daily vitality support in a compact 30-tablet pack. Quantity: 30 tablets.',
    price: 10.00
  },
  {
    id: '1023',
    name: 'AuraTrace Pustihar Tablets',
    description: 'Comprehensive wellness support formula. Quantity: 60 tablets.',
    price: 17.99
  },
  {
    id: '1024',
    name: 'AuraTrace Sugar Fit Tablets',
    description: 'Herbal blood-sugar support blend for daily wellness plans. Quantity: 60 tablets.',
    price: 17.99
  },
  {
    id: '1025',
    name: 'AuraTrace Slim Rattan Tablets',
    description: 'Weight-management support with appetite and metabolism focus. Quantity: 30 tablets.',
    price: 10.00
  },
  {
    id: '1026',
    name: 'AuraTrace Slim Rattan Granules',
    description: 'Convenient granule format for weight routine support. Quantity: 200 g.',
    price: 13.99
  },
  {
    id: '1027',
    name: 'AuraTrace Madhumay Rakshak Granules',
    description: 'Granule blend designed for glucose and metabolic balance plans. Quantity: 200 g.',
    price: 13.99
  },
  {
    id: '1029',
    name: 'AuraTrace Dard Rakshak Tablets',
    description: 'Pain-relief support tablets with herb-inspired anti-inflammatory profile. Quantity: 30 tablets.',
    price: 10.00
  },
  {
    id: '1030',
    name: 'AuraTrace Dard Rakshak Oil',
    description: 'Topical wellness oil for muscle and joint comfort routines. Quantity: 100 ml.',
    price: 8.99
  },
  {
    id: '1032',
    name: 'AuraTrace Gynae Plus Tablets',
    description: 'Women wellness support formulation for balance and vitality. Quantity: 60 tablets.',
    price: 17.99
  },
  {
    id: '1033',
    name: 'AuraTrace Ayush Kwath',
    description: 'Classical herbal decoction mix for seasonal and respiratory support. Quantity: 100 g.',
    price: 9.49
  },
  {
    id: '2001',
    name: 'Underweight to Healthy Weight Plan (Vegetarian)',
    description: 'Evidence-based gradual weight gain using nutrient-dense foods. Focus on protein, healthy fats, and complex carbohydrates. Digital delivery via email.',
    price: 2.99
  },
  {
    id: '2002',
    name: 'Underweight to Healthy Weight Plan (Non-Vegetarian)',
    description: 'Structured weight gain plan including lean meats, fish, and eggs. Optimized for healthy muscle development. Digital delivery via email.',
    price: 2.99
  },
  {
    id: '2003',
    name: 'Overweight Weight Loss Plan (Vegetarian)',
    description: 'Calorie-controlled vegetarian plan for sustainable weight loss. High fiber, adequate protein, and portion guidance. Digital delivery via email.',
    price: 2.99
  },
  {
    id: '2004',
    name: 'Overweight Weight Loss Plan (Non-Vegetarian)',
    description: 'Balanced non-vegetarian weight loss plan with lean proteins. Includes portion control and meal timing strategies. Digital delivery via email.',
    price: 2.99
  },
  {
    id: '2005',
    name: 'Obese Weight Loss Plan (Vegetarian)',
    description: 'Comprehensive vegetarian plan for significant weight loss. Low-calorie density, high satiety foods with medical supervision note. Digital delivery via email.',
    price: 2.99
  },
  {
    id: '2006',
    name: 'Obese Weight Loss Plan (Non-Vegetarian)',
    description: 'Structured non-vegetarian plan for obesity management. Includes lean protein focus and behavioral guidance. Digital delivery via email.',
    price: 2.99
  },
  {
    id: '2007',
    name: 'DASH Diet Plan for Hypertension (Vegetarian)',
    description: 'Clinically proven DASH eating pattern adapted for vegetarians. Rich in fruits, vegetables, low-fat dairy, and potassium. Digital delivery via email.',
    price: 5.99
  },
  {
    id: '2008',
    name: 'DASH Diet Plan for Hypertension (Non-Vegetarian)',
    description: 'DASH diet with lean meats and fish. Sodium-controlled, potassium-rich meal plan for blood pressure management. Digital delivery via email.',
    price: 5.99
  },
  {
    id: '2009',
    name: 'Diabetes Management Plan (Vegetarian)',
    description: 'Low-GI vegetarian plan for blood sugar control. High fiber, adequate protein, carb timing strategies. Digital delivery via email.',
    price: 5.99
  },
  {
    id: '2010',
    name: 'Diabetes Management Plan (Non-Vegetarian)',
    description: 'Diabetes-friendly non-vegetarian plan with lean proteins. Focus on glycemic control and portion management. Digital delivery via email.',
    price: 5.99
  },
  {
    id: '2011',
    name: 'Anti-Inflammatory Arthritis Plan (Vegetarian)',
    description: 'Mediterranean-style vegetarian plan rich in omega-3s and antioxidants. Designed to reduce joint inflammation. Digital delivery via email.',
    price: 5.99
  },
  {
    id: '2012',
    name: 'Anti-Inflammatory Arthritis Plan (Non-Vegetarian)',
    description: 'Anti-inflammatory plan including fatty fish and lean proteins. Turmeric, ginger, and omega-3 rich foods for joint comfort. Digital delivery via email.',
    price: 5.99
  }
];

async function setupStripe() {
  console.log('Starting Stripe setup...');
  const paymentLinks = {};

  for (const product of products) {
    try {
      console.log(`Creating product: ${product.name}`);
      
      // Create product
      const stripeProduct = await stripe.products.create({
        name: product.name,
        description: product.description,
        metadata: {
          id: product.id
        }
      });

      // Create price
      const price = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: Math.round(product.price * 100),
        currency: 'gbp',
      });

      // Create payment link
      const paymentLink = await stripe.paymentLinks.create({
        line_items: [{
          price: price.id,
          quantity: 1,
        }],
      });

      paymentLinks[product.id] = paymentLink.url;
      console.log(`✓ Created payment link for ${product.name}: ${paymentLink.url}`);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`✗ Error creating ${product.name}:`, error.message);
    }
  }

  // Update site-config.js
  console.log('\nUpdating site-config.js...');
  const configPath = './site-config.js';
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  const paymentLinksString = JSON.stringify(paymentLinks, null, 2);
  const paymentLinksPattern = /stripePaymentLinks:\s*\{[^}]*\}/;
  
  if (paymentLinksPattern.test(configContent)) {
    configContent = configContent.replace(
      paymentLinksPattern,
      `stripePaymentLinks: ${paymentLinksString}`
    );
  } else {
    // Add after stripePublishableKey
    const insertPoint = configContent.indexOf('stripePublishableKey');
    if (insertPoint !== -1) {
      const endOfLine = configContent.indexOf('\n', insertPoint);
      configContent = configContent.slice(0, endOfLine + 1) + 
                     `  stripePaymentLinks: ${paymentLinksString},\n` +
                     configContent.slice(endOfLine + 1);
    }
  }
  
  fs.writeFileSync(configPath, configContent);
  console.log('✓ Updated site-config.js with payment links');
  
  console.log('\n✅ Stripe setup complete!');
  console.log('All products have been created and payment links added to site-config.js');
}

setupStripe().catch(console.error);
