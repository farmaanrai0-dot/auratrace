// Shipping Label Generation Helper
// This provides helper functions for generating shipping labels with major UK carriers

const shippingCarriers = {
  royalMail: {
    name: 'Royal Mail',
    website: 'https://www.royalmail.com',
    trackingUrl: 'https://www.royalmail.com/track-your-item',
    labelFormat: 'PDF',
    services: {
      '1st-class': 'Royal Mail 1st Class',
      '2nd-class': 'Royal Mail 2nd Class',
      'special-delivery': 'Royal Mail Special Delivery',
      'tracked-24': 'Royal Mail Tracked 24',
      'tracked-48': 'Royal Mail Tracked 48'
    }
  },
  dpd: {
    name: 'DPD',
    website: 'https://www.dpd.co.uk',
    trackingUrl: 'https://www.dpd.co.uk/service/',
    labelFormat: 'PDF',
    services: {
      'next-day': 'DPD Next Day',
      '2-day': 'DPD 2-Day',
      'international': 'DPD International'
    }
  },
  hermes: {
    name: 'Hermes',
    website: 'https://www.myhermes.co.uk',
    trackingUrl: 'https://www.myhermes.co.uk/track.html',
    labelFormat: 'PDF',
    services: {
      'standard': 'Hermes Standard',
      'next-day': 'Hermes Next Day'
    }
  }
};

function generateShippingLabelData(order, carrier, service) {
  const carrierInfo = shippingCarriers[carrier.toLowerCase()];
  
  if (!carrierInfo) {
    throw new Error(`Unknown carrier: ${carrier}`);
  }

  return {
    carrier: carrierInfo.name,
    service: carrierInfo.services[service] || service,
    trackingUrl: carrierInfo.trackingUrl,
    orderDetails: {
      orderId: order.id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      deliveryAddress: order.deliveryAddress,
      weight: calculateOrderWeight(order.items),
      dimensions: calculateOrderDimensions(order.items),
      value: order.total
    },
    items: order.items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      sku: item.id
    })),
    labelFormat: carrierInfo.labelFormat,
    generatedAt: new Date().toISOString()
  };
}

function calculateOrderWeight(items) {
  // Estimated weights in grams per item type
  const weights = {
    'tablets': 50, // 50g per bottle
    'granules': 200, // 200g per pack
    'tea': 100, // 100g per pack
    'oil': 100 // 100ml per bottle
  };

  let totalWeight = 0;
  items.forEach(item => {
    let itemWeight = 100; // default weight
    if (item.name.toLowerCase().includes('tablet')) {
      itemWeight = weights.tablets;
    } else if (item.name.toLowerCase().includes('granules')) {
      itemWeight = weights.granules;
    } else if (item.name.toLowerCase().includes('tea')) {
      itemWeight = weights.tea;
    } else if (item.name.toLowerCase().includes('oil')) {
      itemWeight = weights.oil;
    }
    totalWeight += itemWeight * item.quantity;
  });

  return totalWeight; // in grams
}

function calculateOrderDimensions(items) {
  // Estimated dimensions in cm per item
  const itemVolume = items.length * 500; // 500cm³ per item
  const side = Math.cbrt(itemVolume);
  
  return {
    length: Math.round(side * 10) / 10,
    width: Math.round(side * 10) / 10,
    height: Math.round(side * 10) / 10,
    unit: 'cm'
  };
}

function getShippingInstructions(order) {
  const instructions = [];
  
  // Fragile items
  if (order.items.some(item => 
    item.name.toLowerCase().includes('oil') || 
    item.name.toLowerCase().includes('glass')
  )) {
    instructions.push('Handle with care - Fragile items');
  }
  
  // Liquid items
  if (order.items.some(item => 
    item.name.toLowerCase().includes('oil') || 
    item.name.toLowerCase().includes('liquid')
  )) {
    instructions.push('This side up - Liquid items');
  }
  
  // High value
  if (order.total > 50) {
    instructions.push('High value item - Signature required');
  }
  
  // Standard instructions
  instructions.push('Do not bend');
  instructions.push('Keep dry');
  
  return instructions;
}

function generateLabelPrintout(shippingData) {
  return `
====================================
SHIPPING LABEL - ${shippingData.carrier}
====================================

ORDER ID: ${shippingData.orderDetails.orderId}
SERVICE: ${shippingData.service}
DATE: ${new Date(shippingData.generatedAt).toLocaleDateString()}

SHIP TO:
${shippingData.orderDetails.customerName}
${shippingData.orderDetails.deliveryAddress}

ITEMS:
${shippingData.items.map(item => 
  `- ${item.name} x${item.quantity} (SKU: ${item.sku})`
).join('\n')}

WEIGHT: ${shippingData.orderDetails.weight}g
DIMENSIONS: ${shippingData.orderDetails.dimensions.length}x${shippingData.orderDetails.dimensions.width}x${shippingData.orderDetails.dimensions.height}cm
VALUE: £${shippingData.orderDetails.value.toFixed(2)}

TRACKING: [TRACKING NUMBER TO BE ADDED]

INSTRUCTIONS:
${getShippingInstructions({ items: shippingData.items, total: shippingData.orderDetails.value }).join('\n')}

TRACK ONLINE: ${shippingData.trackingUrl}
====================================
`;
}

module.exports = {
  shippingCarriers,
  generateShippingLabelData,
  calculateOrderWeight,
  calculateOrderDimensions,
  getShippingInstructions,
  generateLabelPrintout
};
