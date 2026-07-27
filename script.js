const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.getElementById('site-nav');
const productList = document.getElementById('product-list');
const productForm = document.getElementById('product-form');
const imagePreview = document.getElementById('product-image-preview');
const cartItems = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const deliveryNote = document.getElementById('delivery-note');
const clearCartButton = document.getElementById('clear-cart');
const checkoutForm = document.getElementById('checkout-form');
const checkoutStatus = document.getElementById('checkout-status');
const checkoutWhatsapp = document.getElementById('checkout-whatsapp');
const checkoutEmail = document.getElementById('checkout-email');
const bankDetails = document.getElementById('bank-details');

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

const config = window.auraSiteConfig || {};
const freeDeliveryThreshold = Number(config.freeDeliveryThreshold || 30);
const catalogVersion = String(config.catalogVersion || 'v1');

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('admin') === '1') {
  localStorage.setItem('aura-admin', '1');
}
const showAdminTools = urlParams.get('admin') === '1' || localStorage.getItem('aura-admin') === '1';
if (showAdminTools) {
  document.querySelectorAll('[data-admin-only], #add-products').forEach((element) => {
    element.classList.remove('hidden-admin');
  });
}

const initialProducts = Array.isArray(config.defaultProducts) ? config.defaultProducts : [];
const storedCatalogVersion = localStorage.getItem('aura-catalog-version');
let products = JSON.parse(localStorage.getItem('aura-products') || 'null') || initialProducts;

if (storedCatalogVersion !== catalogVersion) {
  products = initialProducts;
  localStorage.setItem('aura-products', JSON.stringify(initialProducts));
  localStorage.setItem('aura-catalog-version', catalogVersion);
}
let cart = JSON.parse(localStorage.getItem('aura-cart') || '[]');
let orders = JSON.parse(localStorage.getItem('aura-orders') || '[]');

const dietPlans = {
  'bmi-underweight-veg': { 
    id: 'bmi-underweight-veg', 
    name: 'Underweight to Healthy Weight Plan (Vegetarian)', 
    category: 'Diet Plan | BMI Weight Gain', 
    price: 2.99,
    description: 'Evidence-based gradual weight gain using nutrient-dense foods. Focus on protein, healthy fats, and complex carbohydrates.',
    dailyCalories: '2600-2800',
    duration: '7 days',
    source: 'Based on ClearCals & Holland & Barrett research',
    mealPlan: {
      day1: {
        breakfast: 'Moong Dal Cheela (3 pieces) with vegetables, 1 tbsp ghee, Green Chutney, 1 glass full-fat milk (250ml), 1 banana',
        midMorning: '12 soaked almonds + soaked cashews + glass of warm water',
        lunch: '2.5 cups brown rice, 1 cup Rajma Curry, 1 cup Aloo Gobi sabzi, 1 cup curd',
        eveningSnack: 'Banana peanut butter smoothie (1 banana + 2 tbsp peanut butter + 1 glass milk)',
        dinner: 'Paneer Butter Masala + 4 rotis + dal',
        beforeBed: '1 glass warm milk with 1 tsp honey',
        calories: '2600 kcal'
      },
      day2: {
        breakfast: 'Wheat paratha + Paneer Bhurji + 1 glass full-fat milk + 1 banana',
        midMorning: 'Mixed nuts (almonds, cashews, walnuts)',
        lunch: 'Chole + dal + rice + curd',
        eveningSnack: 'Mass gainer smoothie (1 banana + 2 tbsp peanut butter + oats + milk)',
        dinner: 'Dal Makhani + Palak Paneer + rotis',
        beforeBed: '1 glass warm milk + 5 soaked almonds',
        calories: '2700 kcal'
      },
      day3: {
        breakfast: 'Masala Dosa + milk + 1 banana',
        midMorning: 'Handful of mixed nuts',
        lunch: 'Paneer Pulao + dal',
        eveningSnack: 'Mango shake + paneer pakora',
        dinner: 'Kadai Paneer + dal + rotis',
        beforeBed: '1 glass warm milk with honey',
        calories: '2550 kcal'
      },
      day4: {
        breakfast: 'Poha + milk + banana',
        midMorning: 'Mixed dry fruits',
        lunch: 'Veg Biryani + Paneer Tikka Masala',
        eveningSnack: 'Lassi + samosa',
        dinner: 'Matar Paneer + dal + rotis',
        beforeBed: '1 glass warm milk',
        calories: '2650 kcal'
      },
      day5: {
        breakfast: 'Upma + milk + banana',
        midMorning: 'Mixed nuts',
        lunch: 'Soya Pulao + Shahi Paneer',
        eveningSnack: 'Apple milkshake + bread pakora',
        dinner: 'Paneer Do Pyaza + dal + rotis',
        beforeBed: '1 glass warm milk with honey',
        calories: '2750 kcal'
      },
      day6: {
        breakfast: 'Aloo Paratha + ghee + curd',
        midMorning: 'Mixed nuts',
        lunch: 'Chole + Palak Paneer + rice',
        eveningSnack: 'Dry fruit milkshake',
        dinner: 'Paneer Korma + dal + rotis',
        beforeBed: '1 glass warm milk',
        calories: '2600 kcal'
      },
      day7: {
        breakfast: 'Paneer Paratha + milk',
        midMorning: 'Mixed nuts',
        lunch: 'Paneer Fried Rice + Paneer Chilli',
        eveningSnack: 'Chikoo shake + kheer',
        dinner: 'Paneer Bhurji + Rajma + rotis',
        beforeBed: '1 glass warm milk with honey',
        calories: '2700 kcal'
      }
    },
    shoppingList: {
      grains: ['Brown rice - 3kg', 'White rice - 2kg', 'Whole wheat flour - 5kg', 'Oats - 1kg', 'Rava - 500g', 'Poha - 500g'],
      proteins: ['Paneer - 2kg', 'Moong dal - 1kg', 'Toor dal - 1kg', 'Urad dal - 500g', 'Rajma - 500g', 'Chole - 500g', 'Soya chunks - 500g'],
      dairy: ['Full-cream milk - 10 liters', 'Curd - 2kg', 'Butter - 500g', 'Ghee - 500g'],
      fruits: ['Bananas - 12', 'Mangoes - 6', 'Apples - 6', 'Chikoo - 4'],
      vegetables: ['Potatoes - 2kg', 'Onions - 1kg', 'Tomatoes - 1kg', 'Spinach - 500g', 'Palak - 500g', 'Green peas - 500g'],
      nuts: ['Almonds - 500g', 'Cashews - 500g', 'Walnuts - 250g', 'Peanut butter - 1 jar'],
      spices: ['Turmeric', 'Cumin', 'Coriander', 'Garam masala', 'Red chili powder']
    }
  },
  'bmi-underweight-nonveg': { 
    id: 'bmi-underweight-nonveg', 
    name: 'Underweight to Healthy Weight Plan (Non-Vegetarian)', 
    category: 'Diet Plan | BMI Weight Gain', 
    price: 2.99,
    description: 'Structured weight gain plan including lean meats, fish, and eggs. Optimized for healthy muscle development.',
    dailyCalories: '3000-3500',
    duration: '7 days',
    source: 'Based on ClearCals & MattsFitChef research',
    mealPlan: {
      day1: {
        breakfast: '4-egg omelette with cheese, onions, tomatoes, capsicum + 2 whole wheat toast with butter + 1 glass full-fat milk + 1 banana',
        midMorning: 'Protein shake (1 scoop whey + milk + banana)',
        lunch: '200g grilled chicken breast + 2 cups brown rice + vegetable sabzi + curd + olive oil dressing',
        eveningSnack: 'Mass gainer shake (1 scoop whey + milk + banana + peanut butter + oats) + 25g cashews',
        dinner: '3 rotis with ghee + 150g chicken curry + dal + sabzi + 1 cup rice + ghee',
        beforeBed: '1 cup milk + 1 tbsp peanut butter + 1 banana',
        calories: '3500 kcal'
      },
      day2: {
        breakfast: 'High protein oats (1.5 cups oats + 1 scoop whey + banana + 2 tbsp peanut butter + 30g almonds + milk)',
        midMorning: '3 boiled eggs + 2 multigrain toasts with butter + 1 banana',
        lunch: '2.5 cups rice + dal + 200g chicken curry + 100g paneer + curd + ghee',
        eveningSnack: '200g Greek yogurt + banana + 2 tbsp peanut butter + 30g almonds',
        dinner: '2 paneer paratha with butter + 150g grilled fish + dal + sabzi',
        beforeBed: '1 cup milk + 1 boiled egg + 1 banana',
        calories: '3500 kcal'
      },
      day3: {
        breakfast: '2 paneer paratha with ghee + 3 boiled eggs + 1 cup curd + 1 banana',
        midMorning: 'Mass gainer shake + 25g cashews + 1 banana',
        lunch: '1.5 cups rice + dal + 150g chicken curry + 100g paneer + sabzi + curd',
        eveningSnack: '3 boiled eggs + 2 toast + peanut butter + 1 cup buttermilk',
        dinner: '3 rotis + 100g paneer butter masala (light) + dal + 1/2 cup rice + sabzi',
        beforeBed: '1 cup milk + 30g almonds',
        calories: '3450 kcal'
      },
      day4: {
        breakfast: '1 cup oats + 2 scoops whey + banana + 30g almonds + 2 tbsp peanut butter + ghee',
        midMorning: '2 paneer paratha with butter + 1 cup curd',
        lunch: '2 cups rice + 200g chicken biryani + raita + 100g paneer + dal',
        eveningSnack: 'Mass gainer + 25g almonds + 1 boiled egg + 1 banana',
        dinner: '3 rotis + 150g chicken + dal + 1 cup rice + sabzi + ghee',
        beforeBed: '1 cup milk + peanut butter sandwich (2 slices)',
        calories: '3500 kcal'
      },
      day5: {
        breakfast: '4-egg omelette + 2 toast + ghee + 1 cup milk + peanut butter + banana',
        midMorning: '3 boiled eggs + 2 multigrain toast with butter + 30g almonds',
        lunch: '2 cups rice + dal + 200g grilled chicken + 100g paneer tikka + sabzi + curd',
        eveningSnack: 'Mass gainer shake + 30g cashews + 1 banana',
        dinner: '2 jowar rotis + 150g fish curry + dal + 1 cup rice + ghee + sabzi',
        beforeBed: '1 cup milk + 1 tbsp peanut butter + 5 walnuts',
        calories: '3500 kcal'
      },
      day6: {
        breakfast: '1.5 cups oats + 2 scoops whey + 30g peanut butter + banana + 30g almonds + ghee',
        midMorning: 'Sattu drink (60g sattu + milk + peanut butter) + 25g almonds',
        lunch: '2 cups rice + rajma + 200g chicken tikka + 80g paneer + curd + ghee',
        eveningSnack: '200g Greek yogurt + banana + 2 tbsp peanut butter + 30g almonds',
        dinner: '3 rotis with ghee + 150g chicken + dal + sabzi + 1 cup rice + ghee',
        beforeBed: '1 cup milk + 1 boiled egg + 1 banana',
        calories: '3500 kcal'
      },
      day7: {
        breakfast: 'Protein pancakes (1 scoop whey + eggs + banana + oats) + maple syrup + 1 glass milk',
        midMorning: '3 boiled eggs + toast + peanut butter',
        lunch: '2 cups rice + dal + 200g grilled fish + 100g paneer + sabzi + curd',
        eveningSnack: 'Mass gainer shake + mixed nuts + 1 banana',
        dinner: '3 rotis + 150g chicken curry + dal + 1 cup rice + sabzi + ghee',
        beforeBed: '1 cup milk + peanut butter + 1 banana',
        calories: '3500 kcal'
      }
    },
    shoppingList: {
      grains: ['Brown rice - 3kg', 'White rice - 2kg', 'Whole wheat flour - 5kg', 'Oats - 1kg', 'Jowar flour - 500g'],
      proteins: ['Chicken breast - 3kg', 'Fish - 1kg', 'Eggs - 4 dozen', 'Paneer - 2kg', 'Dal mix - 2kg', 'Rajma - 500g'],
      dairy: ['Full-cream milk - 10 liters', 'Curd - 2kg', 'Greek yogurt - 500g', 'Butter - 500g', 'Ghee - 500g'],
      supplements: ['Whey protein - 1kg', 'Peanut butter - 1 jar'],
      fruits: ['Bananas - 12', 'Apples - 6'],
      vegetables: ['Mixed vegetables - 2kg', 'Spinach - 500g', 'Tomatoes - 1kg'],
      nuts: ['Almonds - 500g', 'Cashews - 500g', 'Walnuts - 250g']
    }
  },
  'bmi-overweight-veg': { 
    id: 'bmi-overweight-veg', 
    name: 'Overweight Weight Loss Plan (Vegetarian)', 
    category: 'Diet Plan | BMI Weight Loss', 
    price: 2.99,
    description: 'Calorie-controlled vegetarian plan for sustainable weight loss. High fiber, adequate protein, and portion guidance.',
    dailyCalories: '1400-1600',
    duration: '7 days',
    source: 'Based on EatingWell & Everwell Magazine research',
    mealPlan: {
      day1: {
        breakfast: 'Greek yogurt parfait with berries, chia seeds, and cinnamon (250g Greek yogurt + 100g blueberries + 15g chia seeds + 25g walnuts)',
        midMorning: 'Apple + almonds',
        lunch: 'Chickpea salad + quinoa (200g chickpeas + 170g quinoa + spinach + feta + tomatoes)',
        eveningSnack: 'Carrots + hummus',
        dinner: 'Stir-fried tofu with vegetables + brown rice (200g tofu + mixed veggies + 170g brown rice)',
        calories: '1560 kcal'
      },
      day2: {
        breakfast: 'Egg white scramble with two whole eggs, two slices whole-grain bread, and avocado (160g egg whites + 2 eggs + 2 toast + 70g avocado)',
        midMorning: 'Boiled egg + cucumber',
        lunch: 'Chickpea salad with kale and cucumber (200g chickpeas + 60g kale + 60g cucumber + feta)',
        eveningSnack: 'Avocado toast',
        dinner: 'Lentil and vegetable sauté (210g lentils + 50g carrot + 100g zucchini + olive oil)',
        calories: '1354 kcal'
      },
      day3: {
        breakfast: 'Oats with chia seeds, banana, and natural peanut butter (250g cooked oats + 15g chia seeds + 120g banana + 25g peanut butter)',
        midMorning: 'Walnuts + orange',
        lunch: 'Cottage cheese with apple and walnuts (190g cottage cheese + 120g apple + 25g walnuts)',
        eveningSnack: 'Greek yogurt with berries',
        dinner: 'Grilled tempeh with steamed broccoli and quinoa (190g tempeh + 140g broccoli + 170g quinoa + olive oil)',
        calories: '1591 kcal'
      },
      day4: {
        breakfast: 'Greek yogurt with raspberries, chia seeds, and walnuts (250g Greek yogurt + 80g raspberries + 15g chia seeds + 25g walnuts)',
        midMorning: 'Pear + almonds',
        lunch: 'Edamame bowl with mixed greens and bell pepper (170g edamame + 60g greens + 60g pepper + feta)',
        eveningSnack: 'Apple slices with peanut butter',
        dinner: 'White bean and kale sauté with brown rice (190g white beans + 60g kale + 170g brown rice)',
        calories: '1321 kcal'
      },
      day5: {
        breakfast: 'Egg white scramble with two whole eggs, two slices whole-grain bread, and hummus (160g egg whites + 2 eggs + 2 toast + 40g hummus)',
        midMorning: 'Greek yogurt + strawberries',
        lunch: 'Black bean and quinoa bowl with cherry tomatoes and cucumber (180g black beans + 170g quinoa + tomatoes + cucumber)',
        eveningSnack: 'Mixed nuts',
        dinner: 'Baked tofu with roasted cauliflower and brown rice (200g tofu + 140g cauliflower + 170g brown rice)',
        calories: '1466 kcal'
      },
      day6: {
        breakfast: 'Oats with almond butter, banana, and walnuts (250g cooked oats + 25g almond butter + banana + walnuts)',
        midMorning: 'Greek yogurt + kiwi',
        lunch: 'Lentil pasta salad with vegetables',
        eveningSnack: 'Cottage cheese with pineapple',
        dinner: 'Tempeh tray bake with vegetables',
        calories: '1640 kcal'
      },
      day7: {
        breakfast: 'Cottage cheese toast with Mediterranean egg salad',
        midMorning: 'Edamame + apple',
        lunch: 'Red lentil curry with brown rice',
        eveningSnack: 'Greek yogurt + berries',
        dinner: 'Vegetarian chili with extra beans',
        calories: '1530 kcal'
      }
    },
    shoppingList: {
      produce: ['Spinach/mixed greens - 2 large bags', 'Broccoli - 2 heads', 'Carrots - 1kg', 'Tomatoes - 1kg', 'Cucumbers - 6-8', 'Bell peppers - 6', 'Mushrooms - 500g', 'Onions - 6', 'Garlic, ginger', 'Bananas - 7', 'Apples - 7', 'Berries - 500g', 'Avocados - 3-4', 'Lemons - 4', 'Sweet potatoes - 4'],
      proteinDairy: ['Greek yogurt - 1 large tub', 'Eggs - 1 dozen', 'Firm tofu - 3 packs', 'Chickpeas - 4 cans', 'Lentils - 500g', 'Cottage cheese - 500g', 'Feta cheese - 200g', 'Edamame - 500g'],
      pantry: ['Oats', 'Quinoa', 'Brown rice', 'Whole grain bread/wraps', 'Olive oil', 'Nuts & seeds', 'Basic spices', 'Chia seeds', 'Peanut butter', 'Hummus']
    }
  },
  'bmi-overweight-nonveg': { 
    id: 'bmi-overweight-nonveg', 
    name: 'Overweight Weight Loss Plan (Non-Vegetarian)', 
    category: 'Diet Plan | BMI Weight Loss', 
    price: 2.99,
    description: 'Balanced non-vegetarian weight loss plan with lean proteins. Includes portion control and meal timing strategies.',
    dailyCalories: '1500-1800',
    duration: '7 days',
    source: 'Based on EatingWell & AI Meal Plan research',
    mealPlan: {
      day1: {
        breakfast: 'Veggie egg white omelette (3 egg whites + vegetables)',
        midMorning: 'Greek yogurt + berries',
        lunch: 'Grilled chicken salad (6oz chicken + mixed greens + vegetables)',
        eveningSnack: 'Apple + peanut butter',
        dinner: 'Cod with roasted vegetables (6oz cod + mixed veggies + olive oil)',
        calories: '1500 kcal'
      },
      day2: {
        breakfast: 'Greek yogurt & berries (1 cup Greek yogurt + 1 cup berries)',
        midMorning: 'Almonds',
        lunch: 'Turkey lettuce wraps (6oz turkey + lettuce + vegetables)',
        eveningSnack: 'Cottage cheese + fruit',
        dinner: 'Shrimp stir-fry (6oz shrimp + vegetables + brown rice)',
        calories: '1500 kcal'
      },
      day3: {
        breakfast: 'Cottage cheese toast (2 slices toast + cottage cheese + fruit)',
        midMorning: 'Boiled eggs',
        lunch: 'Tuna stuffed avocado (1 can tuna + 1 avocado + vegetables)',
        eveningSnack: 'Greek yogurt',
        dinner: 'Chicken & vegetable soup (6oz chicken + vegetables + broth)',
        calories: '1500 kcal'
      },
      day4: {
        breakfast: 'Protein pancakes (1 scoop protein + eggs + oats)',
        midMorning: 'Almonds + berries',
        lunch: 'Asian chicken lettuce cups (6oz chicken + lettuce + Asian vegetables)',
        eveningSnack: 'Hard-boiled eggs',
        dinner: 'Turkey meatballs with zucchini noodles (6oz turkey + zucchini noodles + sauce)',
        calories: '1500 kcal'
      },
      day5: {
        breakfast: 'Smoked salmon toast (2oz smoked salmon + whole grain toast + vegetables)',
        midMorning: 'Greek yogurt + berries',
        lunch: 'Red lentil vegetable soup (1 cup lentils + vegetables)',
        eveningSnack: 'Almonds',
        dinner: 'Baked tilapia with asparagus (6oz tilapia + asparagus + olive oil)',
        calories: '1500 kcal'
      },
      day6: {
        breakfast: 'Banana protein oats (1/2 cup oats + 1 scoop protein + banana + milk)',
        midMorning: 'Greek yogurt + almonds',
        lunch: 'Mediterranean chicken bowl (6oz chicken + quinoa + vegetables + feta)',
        eveningSnack: 'Cottage cheese + fruit',
        dinner: 'Baked salmon with green beans (6oz salmon + green beans + quinoa)',
        calories: '1500 kcal'
      },
      day7: {
        breakfast: 'Cottage cheese & fruit bowl (1 cup cottage cheese + mixed fruit)',
        midMorning: 'Almonds',
        lunch: 'Chicken & hummus plate (6oz chicken + hummus + vegetables)',
        eveningSnack: 'Greek yogurt + berries',
        dinner: 'Beef & broccoli stir-fry (6oz lean beef + broccoli + brown rice)',
        calories: '1500 kcal'
      }
    },
    shoppingList: {
      proteins: ['Chicken breast - 1kg', 'Ground turkey - 500g', 'Cod fillet - 500g', 'Shrimp - 500g', 'Tilapia fillet - 500g', 'Salmon fillet - 500g', 'Canned tuna - 3 cans', 'Lean beef strips - 500g', 'Eggs - 2 dozen', 'Whey protein - 1 tub'],
      produce: ['Spinach - 2 bags', 'Mixed greens - 2 bags', 'Broccoli - 2 heads', 'Zucchini - 4', 'Bell peppers - 6', 'Cucumber - 3', 'Cherry tomatoes - 500g', 'Tomatoes - 4', 'Carrots - 500g', 'Celery - 2 stalks', 'Asparagus - 500g', 'Green beans - 500g', 'Mushrooms - 500g', 'Red onion - 1', 'Yellow onion - 1'],
      dairy: ['Greek yogurt - 2 tubs', 'Cottage cheese - 500g', 'Feta cheese - 200g'],
      grains: ['Whole grain bread - 1 loaf', 'Quinoa - 500g', 'Brown rice - 500g', 'Oats - 500g'],
      fruits: ['Mixed berries - 500g', 'Blueberries - 250g', 'Bananas - 7', 'Apples - 4', 'Avocados - 3', 'Lemons - 3'],
      pantry: ['Olive oil', 'Hummus', 'Almonds', 'Peanut butter', 'Chia seeds', 'Basic spices']
    }
  },
  'bmi-obese-veg': { 
    id: 'bmi-obese-veg', 
    name: 'Obese Weight Loss Plan (Vegetarian)', 
    category: 'Diet Plan | BMI Weight Loss', 
    price: 2.99,
    description: 'Comprehensive vegetarian plan for significant weight loss. Low-calorie density, high satiety foods with medical supervision note.',
    dailyCalories: '1200-1400',
    duration: '7 days',
    source: 'Based on EatingWell 1200-calorie research',
    mealPlan: {
      day1: {
        breakfast: '3/4 cup oatmeal cooked in water + 1/3 cup raspberries + cinnamon',
        midMorning: '1/2 cup nonfat plain Greek yogurt + 1/4 cup strawberries',
        lunch: 'Whole-wheat veggie wrap with hummus and vegetables',
        eveningSnack: '1/2 cup nonfat plain Greek yogurt + berries',
        dinner: 'Mushroom-quinoa veggie burgers with special sauce',
        calories: '1214 kcal'
      },
      day2: {
        breakfast: 'Baked banana-nut oatmeal cups + 1 clementine',
        midMorning: '1/4 cup raspberries + 3/4 cup nonfat plain Greek yogurt',
        lunch: 'Lemon-roasted vegetable hummus bowls',
        eveningSnack: '2 peanut-butter energy balls',
        dinner: 'Butternut squash & black bean tostadas',
        calories: '1214 kcal'
      },
      day3: {
        breakfast: 'Baked banana-nut oatmeal cups + 1 medium apple',
        midMorning: '1/2 cup raspberries',
        lunch: 'Lemon-roasted vegetable hummus bowls',
        eveningSnack: '2 peanut-butter energy balls',
        dinner: 'One-pot tomato basil pasta with parmesan',
        calories: '1200 kcal'
      },
      day4: {
        breakfast: 'Baked banana-nut oatmeal cups + 1 medium apple',
        midMorning: '1/2 cup nonfat plain Greek yogurt',
        lunch: 'Lemon-roasted vegetable hummus bowls',
        eveningSnack: '2 peanut-butter energy balls',
        dinner: 'Stuffed potatoes with salsa & beans',
        calories: '1200 kcal'
      },
      day5: {
        breakfast: 'Avocado-egg toast + 1 clementine',
        midMorning: '1/2 cup raspberries',
        lunch: 'Lemon-roasted vegetable hummus bowls',
        eveningSnack: '1/2 cup nonfat plain Greek yogurt',
        dinner: 'Vegetarian chili with tofu',
        calories: '1200 kcal'
      },
      day6: {
        breakfast: 'Green smoothie (spinach + banana + berries + yogurt)',
        midMorning: 'Walnuts + orange',
        lunch: 'Quinoa bowl with chickpeas & sweet potato',
       eveningSnack: 'Skyr with kiwi',
        dinner: 'Black bean and tofu taco bowl',
        calories: '1200 kcal'
      },
      day7: {
        breakfast: 'Protein smoothie with berries and oats',
        midMorning: 'Cottage cheese with pineapple',
        lunch: 'White bean and egg wrap',
        eveningSnack: 'Edamame and apple',
        dinner: 'Red lentil curry with brown rice',
        calories: '1200 kcal'
      }
    },
    shoppingList: {
      produce: ['Spinach - 2 bags', 'Broccoli - 2 heads', 'Carrots - 1kg', 'Tomatoes - 1kg', 'Cucumbers - 6', 'Bell peppers - 6', 'Mushrooms - 500g', 'Onions - 6', 'Garlic', 'Bananas - 7', 'Apples - 7', 'Berries - 500g', 'Avocados - 3', 'Lemons - 4'],
      proteinDairy: ['Greek yogurt - 2 tubs', 'Eggs - 1 dozen', 'Firm tofu - 3 packs', 'Chickpeas - 4 cans', 'Lentils - 500g', 'Cottage cheese - 500g', 'Black beans - 4 cans'],
      pantry: ['Oats', 'Quinoa', 'Brown rice', 'Whole grain bread', 'Olive oil', 'Nuts', 'Seeds', 'Spices', 'Peanut butter']
    }
  },
  'bmi-obese-nonveg': { 
    id: 'bmi-obese-nonveg', 
    name: 'Obese Weight Loss Plan (Non-Vegetarian)', 
    category: 'Diet Plan | BMI Weight Loss', 
    price: 2.99,
    description: 'Structured non-vegetarian plan for obesity management. Includes lean protein focus and behavioral guidance.',
    dailyCalories: '1200-1400',
    duration: '7 days',
    source: 'Based on AI Meal Plan 1200-calorie research',
    mealPlan: {
      day1: {
        breakfast: 'Veggie egg white omelette',
        midMorning: 'Greek yogurt + berries',
        lunch: 'Grilled chicken salad',
        eveningSnack: 'String cheese + pear',
        dinner: 'Turkey burger in pita with vegetables',
        calories: '1200 kcal'
      },
      day2: {
        breakfast: 'Cottage cheese with oats and banana',
        midMorning: 'Hummus + vegetables',
        lunch: 'Grilled chicken with brown rice and vegetables',
        eveningSnack: 'Skim milk latte + apple',
        dinner: 'Lean pork and mashed potatoes with vegetables',
        calories: '1200 kcal'
      },
      day3: {
        breakfast: 'Yogurt, granola, and apple with cinnamon',
        midMorning: 'Boiled egg and grapes',
        lunch: 'Lunch meat on high-fiber bread with vegetables',
        eveningSnack: 'Peanut butter with vegetables',
        dinner: 'Baked salmon, baked potato, and steamed vegetables',
        calories: '1200 kcal'
      },
      day4: {
        breakfast: 'Egg whites and vegetables in tortilla',
        midMorning: 'String cheese and grapefruit',
        lunch: 'Salmon with sweet potato and vegetables',
        eveningSnack: 'Whey protein + peach',
        dinner: 'Ground turkey and chili with vegetables',
        calories: '1200 kcal'
      },
      day5: {
        breakfast: 'Whey protein, oats, and cherries',
        midMorning: 'Cottage cheese + strawberries',
        lunch: 'Boiled egg whites and vegetables',
        eveningSnack: 'Roasted chickpeas with fruit',
        dinner: 'Grilled shrimp with brown rice and vegetables',
        calories: '1200 kcal'
      },
      day6: {
        breakfast: 'Skim milk with cereal and blueberries',
        midMorning: 'Hummus + vegetables',
        lunch: 'Ground turkey with beans and vegetables',
        eveningSnack: 'Yogurt and blueberries',
        dinner: 'Turkey loaf, sweet potato, and green beans',
        calories: '1200 kcal'
      },
      day7: {
        breakfast: 'Egg wrap with orange',
        midMorning: 'Yogurt and raspberries',
        lunch: 'Chicken and vegetable broth with pasta and vegetables',
        eveningSnack: 'String cheese and vegetables',
        dinner: 'Grilled chicken in wheat roll with vegetables',
        calories: '1200 kcal'
      }
    },
    shoppingList: {
      proteins: ['Chicken breast - 1kg', 'Ground turkey - 500g', 'Lean pork - 500g', 'Salmon fillets - 500g', 'Shrimp - 500g', 'Eggs - 2 dozen', 'Deli turkey - 500g', 'Whey protein - 1 tub'],
      produce: ['Spinach - 2 bags', 'Mushrooms - 500g', 'Onions - 6', 'Bell peppers - 6', 'Celery - 2 stalks', 'Carrots - 1kg', 'Cucumber - 3', 'Lettuce - 2 heads', 'Tomatoes - 1kg', 'Sweet potatoes - 4', 'Broccoli - 2 heads', 'Cauliflower - 1 head', 'Green beans - 500g', 'Asparagus - 500g'],
      dairy: ['Greek yogurt - 2 tubs', 'Cottage cheese - 500g', 'String cheese - 200g', 'Skim milk - 2 liters'],
      grains: ['High-fiber cereal - 1 box', 'Whole grain bread - 1 loaf', 'Brown rice - 500g', 'Oats - 500g'],
      fruits: ['Blueberries - 500g', 'Bananas - 7', 'Apples - 4', 'Pears - 4', 'Grapes - 500g', 'Peaches - 4', 'Cherries - 500g'],
      pantry: ['Hummus', 'Peanut butter', 'Olive oil', 'Basic spices']
    }
  },
  'condition-hypertension-veg': { 
    id: 'condition-hypertension-veg', 
    name: 'DASH Diet Plan for Hypertension (Vegetarian)', 
    category: 'Diet Plan | Hypertension', 
    price: 5.99,
    description: 'Clinically proven DASH eating pattern adapted for vegetarians. Rich in fruits, vegetables, low-fat dairy, and potassium.',
    dailyCalories: '1800',
    duration: '7 days',
    source: 'Based on NHLBI DASH Diet & EatingWell research',
    mealPlan: {
      day1: {
        breakfast: 'Green smoothie (spinach + banana + dates + peanut butter)',
        midMorning: 'Stuffed sweet potato with hummus drizzle',
        lunch: 'Banana & walnuts',
        eveningSnack: 'Cottage cheese snack jar with fruit',
        dinner: 'Chipotle chicken quinoa bowl (vegetarian with chickpeas)',
        calories: '1811 kcal, Sodium: 1196mg'
      },
      day2: {
        breakfast: 'Green smoothie',
        midMorning: 'Winter kale & quinoa salad with avocado',
        lunch: 'Fig & honey yogurt',
        eveningSnack: 'Cottage cheese snack jar',
        dinner: 'Chickpea & quinoa grain bowl',
        calories: '1776 kcal, Sodium: 1411mg'
      },
      day3: {
        breakfast: 'Green smoothie',
        midMorning: 'Winter kale & quinoa salad with avocado',
        lunch: 'Fig & honey yogurt',
        eveningSnack: 'Cottage cheese snack jar',
        dinner: 'Beer-battered fish tacos (tofu version) & poblano rajas',
        calories: '1808 kcal, Sodium: 807mg'
      },
      day4: {
        breakfast: 'Orange-peach chia smoothie',
        midMorning: 'Three-bean chili with avocado',
        lunch: 'Fig & honey yogurt',
        eveningSnack: 'Cottage cheese snack jar',
        dinner: 'Roasted salmon (tofu version) & smoky chickpeas',
        calories: '1783 kcal, Sodium: 1335mg'
      },
      day5: {
        breakfast: 'Orange-peach chia smoothie',
        midMorning: 'Three-bean chili with avocado',
        lunch: 'Fig & honey yogurt',
        eveningSnack: 'Cottage cheese snack jar',
        dinner: 'Chicken lettuce wraps (tempeh version) with peanut sauce',
        calories: '1788 kcal, Sodium: 1362mg'
      },
      day6: {
        breakfast: 'Orange-peach chia smoothie',
        midMorning: 'Three-bean chili with avocado',
        lunch: 'Fig & honey yogurt',
        eveningSnack: 'Cottage cheese snack jar',
        dinner: 'Maple chicken (tofu) with sweet potato & Brussels',
        calories: '1803 kcal, Sodium: 1264mg'
      },
      day7: {
        breakfast: 'Raspberry overnight muesli',
        midMorning: 'Stuffed sweet potato with hummus drizzle',
        lunch: 'Fig & honey yogurt',
        eveningSnack: 'Cottage cheese snack jar',
        dinner: 'Roasted salmon (tofu) rice bowl with beets',
        calories: '1826 kcal, Sodium: 1409mg'
      }
    },
    shoppingList: {
      produce: ['Spinach - 2 bags', 'Kale - 2 bunches', 'Mixed greens - 2 bags', 'Broccoli - 2 heads', 'Carrots - 1kg', 'Bell peppers - 6', 'Cucumber - 3', 'Tomatoes - 1kg', 'Sweet potatoes - 4', 'Beets - 500g', 'Brussels sprouts - 500g', 'Avocados - 4', 'Bananas - 7', 'Oranges - 4', 'Peaches - 4', 'Raspberries - 500g', 'Blueberries - 500g'],
      proteins: ['Chickpeas - 4 cans', 'Black beans - 4 cans', 'Kidney beans - 2 cans', 'Tofu - 3 packs', 'Tempeh - 2 packs', 'Greek yogurt - 2 tubs', 'Cottage cheese - 500g'],
      grains: ['Quinoa - 1kg', 'Brown rice - 1kg', 'Oats - 500g', 'Whole grain bread - 1 loaf'],
      pantry: ['Olive oil', 'Peanut butter', 'Chia seeds', 'Walnuts', 'Almonds', 'Honey', 'Maple syrup', 'Low-sodium seasonings']
    }
  },
  'condition-hypertension-nonveg': { 
    id: 'condition-hypertension-nonveg', 
    name: 'DASH Diet Plan for Hypertension (Non-Vegetarian)', 
    category: 'Diet Plan | Hypertension', 
    price: 5.99,
    description: 'DASH diet with lean meats and fish. Sodium-controlled, potassium-rich meal plan for blood pressure management.',
    dailyCalories: '1800',
    duration: '7 days',
    source: 'Based on NHLBI DASH Diet & Cardilog research',
    mealPlan: {
      day1: {
        breakfast: 'Rolled oats with sliced banana, walnuts, honey, and skim milk',
        midMorning: 'Apple with almond butter',
        lunch: 'Grilled chicken salad with spinach, tomatoes, cucumber, chickpeas, olive oil vinaigrette + whole wheat roll',
        eveningSnack: 'Red pepper sticks with hummus',
        dinner: 'Baked salmon with roasted sweet potato, steamed broccoli, and brown rice',
        calories: '1800 kcal, Sodium: <2300mg'
      },
      day2: {
        breakfast: 'Whole wheat toast with mashed avocado and poached egg + orange',
        midMorning: 'Greek yogurt with blueberries',
        lunch: 'Lentil and vegetable soup with mixed green salad + whole grain bread',
        eveningSnack: 'Unsalted almonds and beetroot juice',
        dinner: 'Grilled turkey breast with quinoa, roasted carrots, and steamed green beans',
        calories: '1800 kcal, Sodium: <2300mg'
      },
      day3: {
        breakfast: 'Smoothie with spinach, banana, berries, flaxseeds, and low-fat yogurt',
        midMorning: 'Whole wheat wrap with grilled chicken, lettuce, tomato, hummus + pear',
        eveningSnack: 'Unsalted almonds',
        dinner: 'Baked cod with roasted potatoes, asparagus, and side salad',
        calories: '1800 kcal, Sodium: <2300mg'
      },
      day4: {
        breakfast: 'Steel-cut oatmeal with pumpkin seeds, cinnamon, berries + green tea',
        midMorning: 'Black bean and corn salad with avocado, rocket, red onion, lime dressing',
        eveningSnack: 'Celery sticks with peanut butter',
        dinner: 'Grilled chicken stir-fry with capsicum, broccoli, snap peas, brown rice, low-sodium soy sauce',
        calories: '1800 kcal, Sodium: <2300mg'
      },
      day5: {
        breakfast: 'Whole grain cereal with skim milk, strawberries, ground flaxseed',
        midMorning: 'Greek yogurt with pomegranate seeds',
        lunch: 'Mediterranean tuna salad (canned tuna, white beans, tomatoes, olives, olive oil) + whole wheat pita',
        eveningSnack: 'Greek yogurt with pomegranate seeds',
        dinner: 'Grilled mackerel with baked sweet potato, sautéed spinach with garlic',
        calories: '1800 kcal, Sodium: <2300mg'
      },
      day6: {
        breakfast: 'Wholemeal pancakes with blueberries, maple syrup, skim milk',
        midMorning: 'Chickpea and vegetable curry with brown rice + cucumber tomato salad',
        eveningSnack: 'Banana and walnuts',
        dinner: 'Lean beef stir-fry (90g) with capsicum, mushrooms, snow peas, brown rice noodles',
        calories: '1800 kcal, Sodium: <2300mg'
      },
      day7: {
        breakfast: 'Scrambled eggs with mushrooms and tomatoes on whole grain toast + orange',
        midMorning: 'Carrot and capsicum sticks with hummus + green tea',
        lunch: 'Minestrone soup (low sodium) with mixed salad and crusty whole grain bread',
        eveningSnack: 'Carrot and capsicum sticks with hummus',
        dinner: 'Baked salmon with lemon and herbs, roasted beetroot, quinoa, steamed broccoli',
        calories: '1800 kcal, Sodium: <2300mg'
      }
    },
    shoppingList: {
      produce: ['Spinach, rocket, mixed salad greens', 'Broccoli, carrots, capsicum, tomatoes, sweet potatoes', 'Bananas, blueberries, oranges, apples, pears', 'Avocados, celery, cucumber, mushrooms', 'Garlic, onions, lemons', 'Beets', 'Asparagus', 'Green beans', 'Brussels sprouts'],
      proteins: ['Chicken breast - 1kg', 'Turkey breast - 500g', 'Salmon fillets - 500g', 'Cod fillets - 500g', 'Mackerel - 500g', 'Lean beef - 500g', 'Eggs - 1 dozen', 'Chickpeas - 4 cans', 'Black beans - 4 cans', 'Kidney beans - 2 cans', 'Lentils - 500g'],
      dairy: ['Skim milk - 2 liters', 'Greek yogurt - 2 tubs', 'Low-fat cheese - 200g'],
      grains: ['Rolled oats - 500g', 'Steel-cut oats - 500g', 'Whole grain bread - 1 loaf', 'Wholemeal flour - 500g', 'Brown rice - 1kg', 'Quinoa - 500g', 'Brown rice noodles - 500g'],
      pantry: ['Olive oil', 'Peanut butter', 'Almonds', 'Walnuts', 'Pumpkin seeds', 'Flaxseeds', 'Honey', 'Maple syrup', 'Low-sodium soy sauce', 'Low-sodium seasonings']
    }
  },
  'condition-diabetes-veg': { 
    id: 'condition-diabetes-veg', 
    name: 'Diabetes Management Plan (Vegetarian)', 
    category: 'Diet Plan | Diabetes', 
    price: 5.99,
    description: 'Low-GI vegetarian plan for blood sugar control. High fiber, adequate protein, carb timing strategies.',
    dailyCalories: '1500',
    duration: '7 days',
    source: 'Based on Diabetes Canada & EatingWell research',
    mealPlan: {
      day1: {
        breakfast: 'Apricot oat muffin + 1 cup low-fat milk (282 calories, 37g carbs, 2g fiber)',
        midMorning: 'None',
        lunch: '2 cups red lentil soup + green salad + 1 tbsp light salad dressing (432 calories, 59g carbs, 14g fiber)',
        eveningSnack: 'None',
        dinner: '2 cups Indonesian tofu stew with spring vegetables + 1 cup cooked quinoa (462 calories, 55g carbs, 11g fiber)',
        calories: '1176 kcal, Carbs: 151g, Fiber: 27g'
      },
      day2: {
        breakfast: 'Steel-cut rolled oats (1/3 cup dry) + 1 tbsp peanut butter + 1/2 cup low-fat milk (324 calories, 37g carbs, 5g fiber)',
        midMorning: 'None',
        lunch: 'Tofu frittata + 3/4 cup roasted sweet potatoes (435 calories, 49g carbs, 7g fiber)',
        eveningSnack: 'None',
        dinner: 'Lentil burrito + green salad + 1 tbsp light salad dressing (425 calories, 59g carbs, 13g fiber)',
        calories: '1184 kcal, Carbs: 145g, Fiber: 25g'
      },
      day3: {
        breakfast: 'Egg omelette with vegetables + 2 slices whole-grain toast + 2 tsp soft margarine + 1/2 cup low-fat milk (366 calories, 36g carbs, 4g fiber)',
        midMorning: 'None',
        lunch: 'Falafel burger with creamy sesame sauce + fruit and feta salad (465 calories, 52g carbs, 11g fiber)',
        eveningSnack: 'None',
        dinner: 'Buddha bowl + 1 fruit (440 calories, 55g carbs, 12g fiber)',
        calories: '1271 kcal, Carbs: 143g, Fiber: 27g'
      },
      day4: {
        breakfast: 'Apricot oat muffin + 1 cup low-fat milk (282 calories, 37g carbs, 2g fiber)',
        midMorning: 'None',
        lunch: 'Mexican baked eggs on black beans + 1 slice whole-grain bread + 2 tsp soft margarine + 1/2 cup low-fat yogurt (454 calories, 57g carbs, 9g fiber)',
        eveningSnack: 'None',
        dinner: '1 cup cream of cauliflower soup + lentil burger including bun (420 calories, 57g carbs, 5g fiber)',
        calories: '1156 kcal, Carbs: 151g, Fiber: 16g'
      },
      day5: {
        breakfast: 'Steel-cut rolled oats (1/3 cup dry) + 1 tbsp peanut butter + 1/2 cup low-fat milk (324 calories, 37g carbs, 5g fiber)',
        midMorning: 'None',
        lunch: '1.5 cups wheat berry and apple salad + 1/2 cup reduced-fat cottage cheese (402 calories, 54g carbs, 8g fiber)',
        eveningSnack: 'None',
        dinner: '1 cup cooked spaghetti + 1 cup tomato sauce + 1/4 cup parmesan cheese + green salad + 1 tbsp light dressing (340 calories, 45g carbs, 2g fiber)',
        calories: '1066 kcal, Carbs: 136g, Fiber: 15g'
      },
      day6: {
        breakfast: '2 slices whole-grain toast + 1 egg poached + 1/4 small avocado mashed (293 calories, 33g carbs, 5g fiber)',
        midMorning: 'None',
        lunch: 'Grilled cheese sandwich (2 slices whole-grain bread + 2oz cheddar + tomato + 2 tsp margarine) + 1 medium fruit + 1/2 cup low-fat yogurt (482 calories, 58g carbs, 8g fiber)',
        eveningSnack: 'None',
        dinner: '1 cup spinach and mushroom barley pilaf + 4oz firm tofu cooked in 2 tsp canola oil (475 calories, 51g carbs, 9g fiber)',
        calories: '1250 kcal, Carbs: 142g, Fiber: 22g'
      },
      day7: {
        breakfast: 'Steel-cut rolled oats (1/3 cup dry) + 1 tbsp peanut butter + 1/2 cup low-fat milk (324 calories, 37g carbs, 5g fiber)',
        midMorning: 'None',
        lunch: 'Vegetable frittata + 2 slices whole-grain toast + 2 tsp soft margarine',
        eveningSnack: 'None',
        dinner: 'Spinach and mushroom barley pilaf with tofu',
        calories: '1200 kcal, Carbs: 140g, Fiber: 20g'
      }
    },
    shoppingList: {
      produce: ['Spinach - 2 bags', 'Mushrooms - 500g', 'Onions - 6', 'Bell peppers - 4', 'Tomatoes - 1kg', 'Cucumber - 3', 'Carrots - 500g', 'Celery - 2 stalks', 'Sweet potatoes - 4', 'Apples - 4', 'Pears - 4', 'Apricots - 6'],
      proteins: ['Tofu - 3 packs', 'Eggs - 1 dozen', 'Lentils - 1kg', 'Chickpeas - 4 cans', 'Cottage cheese - 500g', 'Greek yogurt - 2 tubs', 'Cheddar cheese - 200g'],
      grains: ['Steel-cut oats - 500g', 'Whole grain bread - 1 loaf', 'Quinoa - 500g', 'Barley - 500g', 'Spaghetti - 500g', 'Wheat berries - 500g'],
      pantry: ['Peanut butter', 'Olive oil', 'Canola oil', 'Soft margarine', 'Light salad dressing', 'Spices']
    }
  },
  'condition-diabetes-nonveg': { 
    id: 'condition-diabetes-nonveg', 
    name: 'Diabetes Management Plan (Non-Vegetarian)', 
    category: 'Diet Plan | Diabetes', 
    price: 5.99,
    description: 'Diabetes-friendly non-vegetarian plan with lean proteins. Focus on glycemic control and portion management.',
    dailyCalories: '1500-1800',
    duration: '7 days',
    source: 'Based on Diabetes Canada & Diabetes Strong research',
    mealPlan: {
      day1: {
        breakfast: '4 egg muffins (352 calories, 8g carbs)',
        midMorning: 'Greek yogurt (0%) + almonds (248 calories, 12g carbs)',
        lunch: 'Salad Niçoise (405 calories, 18g carbs)',
        eveningSnack: 'Shelled edamame (120 calories, 8g carbs)',
        dinner: '1.5 servings quiche (401 calories, 10g carbs)',
        calories: '1526 kcal, Carbs: 76g'
      },
      day2: {
        breakfast: '4 egg muffins (352 calories, 8g carbs)',
        midMorning: 'Apple + nut butter (155 calories, 20g carbs)',
        lunch: '1.5 servings quiche (401 calories, 10g carbs)',
        eveningSnack: 'Cottage cheese parfait with berries (250 calories, 25g carbs)',
        dinner: 'Rosemary chicken + cauliflower mash (375 calories, 14g carbs)',
        calories: '1533 kcal, Carbs: 77g'
      },
      day3: {
        breakfast: '1.5 serving cauliflower oatmeal + 2 eggs (353 calories, 25g carbs)',
        midMorning: 'Hummus with vegetables (200 calories, 17g carbs)',
        lunch: 'Peruvian chicken wrap (375 calories, 16g carbs)',
        eveningSnack: 'Shelled edamame (200 calories, 14g carbs)',
        dinner: 'Mustard baked chicken tenders + quinoa (382 calories, 21g carbs)',
        calories: '1510 kcal, Carbs: 93g'
      },
      day4: {
        breakfast: 'Chia seed pudding (201 calories, 23g carbs)',
        midMorning: 'Apple + nut butter (155 calories, 20g carbs)',
        lunch: 'Peruvian chicken wrap (375 calories, 16g carbs)',
        eveningSnack: 'Sugar-free chocolate chip cookies (330 calories, 19g carbs)',
        dinner: 'Salmon with lemon butter + quinoa (439 calories, 17g carbs)',
        calories: '1500 kcal, Carbs: 95g'
      },
      day5: {
        breakfast: 'Chia seed pudding + 2 eggs (345 calories, 24g carbs)',
        midMorning: 'Greek yogurt + almonds (248 calories, 12g carbs)',
        lunch: 'Salmon with lemon butter (400 calories, 14g carbs)',
        eveningSnack: 'Sugar-free chocolate chip cookie (165 calories, 9g carbs)',
        dinner: 'Turkey chili (348 calories, 20g carbs)',
        calories: '1506 kcal, Carbs: 79g'
      },
      day6: {
        breakfast: 'Overnight berry oats (1/2 cup steel cut oats + milk + berries + flaxseeds + almonds)',
        midMorning: 'Veggie pita sandwich (whole-wheat pita + hummus + vegetables + avocado + sunflower seeds)',
        lunch: 'Grilled pork chop + unsweetened cereal + milk + peach',
        eveningSnack: 'Hummus with vegetables',
        dinner: 'Spinach omelet + English muffin with almond butter',
        calories: '1500 kcal, Carbs: 80g'
      },
      day7: {
        breakfast: 'Spinach omelet + English muffin with almond butter',
        midMorning: 'Low-fat cottage cheese + cantaloupe',
        lunch: 'Grilled chicken salad',
        eveningSnack: 'Cinnamon roasted chickpeas',
        dinner: 'Mustard herb chicken + brown rice + vegetables',
        calories: '1500 kcal, Carbs: 75g'
      }
    },
    shoppingList: {
      proteins: ['Eggs - 2 dozen', 'Chicken breast - 1kg', 'Salmon fillets - 500g', 'Pork chops - 500g', 'Ground turkey - 500g', 'Canned tuna - 3 cans', 'Shelled edamame - 500g'],
      produce: ['Spinach - 2 bags', 'Mixed greens - 2 bags', 'Broccoli - 2 heads', 'Cauliflower - 1 head', 'Asparagus - 500g', 'Green beans - 500g', 'Bell peppers - 6', 'Cucumber - 3', 'Tomatoes - 1kg', 'Carrots - 500g', 'Celery - 2 stalks'],
      dairy: ['Greek yogurt (0%) - 2 tubs', 'Cottage cheese - 500g', 'Low-fat milk - 2 liters', 'Cheese - 200g'],
      grains: ['Steel-cut oats - 500g', 'Quinoa - 500g', 'Brown rice - 500g', 'Whole wheat pita - 1 pack', 'English muffins - 1 pack', 'Unsweetened cereal - 1 box'],
      pantry: ['Chia seeds', 'Almonds', 'Peanut butter', 'Olive oil', 'Hummus', 'Flaxseeds', 'Sugar-free chocolate chips']
    }
  },
  'condition-arthritis-veg': { 
    id: 'condition-arthritis-veg', 
    name: 'Anti-Inflammatory Arthritis Plan (Vegetarian)', 
    category: 'Diet Plan | Arthritis', 
    price: 5.99,
    description: 'Mediterranean-style vegetarian plan rich in omega-3s and antioxidants. Designed to reduce joint inflammation.',
    dailyCalories: '1500',
    duration: '7 days',
    source: 'Based on EatingWell & Casa de Sante research',
    mealPlan: {
      day1: {
        breakfast: 'Blueberry and chia seed smoothie (frozen blueberries + banana + spinach + chia seeds + almond milk)',
        midMorning: 'Apple slices with almond butter',
        lunch: 'Lentil soup with side salad (lentils + vegetable broth + tomatoes + seasonings + mixed greens)',
        eveningSnack: 'Carrot sticks with hummus',
        dinner: 'Roasted sweet potato and black bean tacos (roasted sweet potatoes + black beans + corn tortillas + avocado + salsa + cilantro)',
        calories: '1500 kcal'
      },
      day2: {
        breakfast: 'Avocado toast with poached egg (whole grain bread + mashed avocado + poached egg)',
        midMorning: 'Carrot sticks with hummus',
        lunch: 'Spinach and feta stuffed portobello mushroom (portobello mushrooms + spinach + feta + breadcrumbs)',
        eveningSnack: 'Kale chips',
        dinner: 'Veggie stir fry with brown rice (broccoli + bell peppers + mushrooms + carrots + soy sauce + brown rice)',
        calories: '1500 kcal'
      },
      day3: {
        breakfast: 'Oatmeal with berries and walnuts (rolled oats + almond milk + berries + walnuts + honey)',
        midMorning: 'Kale chips',
        lunch: 'Chickpea and quinoa salad (quinoa + chickpeas + tomatoes + cucumber + red onion + olive oil + lemon dressing)',
        eveningSnack: 'Apple slices with almond butter',
        dinner: 'Vegetarian chili (kidney beans + black beans + tomatoes + vegetables + seasonings + brown rice)',
        calories: '1500 kcal'
      },
      day4: {
        breakfast: 'Golden milk chia pudding (chia seeds + oat milk + turmeric + cinnamon + maple syrup + blueberries)',
        midMorning: 'Walnuts',
        lunch: 'Lentil and spinach soup (green lentils + garlic + onion + tomatoes + spinach + olive oil)',
        eveningSnack: 'Apple slices with almond butter',
        dinner: 'Turmeric roasted chickpea bowl (chickpeas + olive oil + turmeric + paprika + garlic + quinoa + tahini + broccoli)',
        calories: '1500 kcal'
      },
      day5: {
        breakfast: 'Berry smoothie bowl (mixed berries + banana + flaxseed + oat milk + granola + kiwi + hemp seeds)',
        midMorning: 'Walnuts',
        lunch: 'Avocado and chickpea salad wrap (chickpeas + avocado + lemon juice + whole wheat tortilla + arugula + cucumber)',
        eveningSnack: 'Carrot sticks with hummus',
        dinner: 'Black bean and sweet potato tacos (roasted sweet potatoes + black beans + corn tortillas + salsa + lime + cilantro)',
        calories: '1500 kcal'
      },
      day6: {
        breakfast: 'Overnight oats with walnuts and ginger (rolled oats + oat milk + ginger + cinnamon + maple syrup + walnuts + banana)',
        midMorning: 'Walnuts',
        lunch: 'Rainbow veggie quinoa bowl (quinoa + purple cabbage + carrots + edamame + cucumber + avocado + sesame-ginger vinaigrette)',
        eveningSnack: 'Apple slices with almond butter',
        dinner: 'Coconut lentil curry (red lentils + coconut milk + turmeric + ginger + garlic + curry powder + brown rice + cilantro)',
        calories: '1500 kcal'
      },
      day7: {
        breakfast: 'Green smoothie (kale + frozen mango + banana + chia seeds + oat milk + ginger)',
        midMorning: 'Walnuts',
        lunch: 'White bean and tomato stew (cannellini beans + tomatoes + garlic + rosemary + spinach + olive oil + sourdough bread)',
        eveningSnack: 'Carrot sticks with hummus',
        dinner: 'Stir-fried tofu with broccoli and brown rice (firm tofu + broccoli + bell peppers + garlic + tamari + ginger + sesame oil + brown rice)',
        calories: '1500 kcal'
      }
    },
    shoppingList: {
      produce: ['Spinach - 2 bags', 'Kale - 2 bunches', 'Mixed greens - 2 bags', 'Broccoli - 2 heads', 'Carrots - 1kg', 'Bell peppers - 6', 'Mushrooms - 500g', 'Onions - 6', 'Garlic - 3 heads', 'Ginger - 1 piece', 'Cucumber - 3', 'Tomatoes - 1kg', 'Sweet potatoes - 4', 'Avocados - 4', 'Purple cabbage - 1', 'Apples - 4'],
      proteins: ['Chickpeas - 4 cans', 'Black beans - 4 cans', 'Kidney beans - 4 cans', 'White beans - 2 cans', 'Lentils - 1kg', 'Tofu - 3 packs', 'Edamame - 500g'],
      grains: ['Quinoa - 1kg', 'Brown rice - 1kg', 'Oats - 500g', 'Whole grain tortillas - 1 pack', 'Whole wheat bread - 1 loaf', 'Sourdough bread - 1 loaf'],
      pantry: ['Chia seeds', 'Flaxseeds', 'Hemp seeds', 'Walnuts', 'Almonds', 'Olive oil', 'Coconut milk', 'Oat milk', 'Tahini', 'Turmeric', 'Ginger', 'Cinnamon', 'Maple syrup', 'Honey', 'Tamari', 'Sesame oil']
    }
  },
  'condition-arthritis-nonveg': { 
    id: 'condition-arthritis-nonveg', 
    name: 'Anti-Inflammatory Arthritis Plan (Non-Vegetarian)', 
    category: 'Diet Plan | Arthritis', 
    price: 5.99,
    description: 'Anti-inflammatory plan including fatty fish and lean proteins. Turmeric, ginger, and omega-3 rich foods for joint comfort.',
    dailyCalories: '1500-1800',
    duration: '7 days',
    source: 'Based on EatingWell & Nourish research',
    mealPlan: {
      day1: {
        breakfast: 'Strawberry-mango-banana smoothie',
        midMorning: 'White bean & avocado toast + pear',
        lunch: 'Walnuts + apple with almond butter',
        eveningSnack: 'None',
        dinner: 'Salmon & quinoa bowl with green beans, olives & feta',
        calories: '1500 kcal'
      },
      day2: {
        breakfast: 'Berry chia pudding',
        midMorning: 'Chopped veggie grain bowl with turmeric dressing + orange',
        lunch: 'Almonds + pear',
        eveningSnack: 'None',
        dinner: 'Grilled chicken with red pepper-pecan romesco sauce + brown rice',
        calories: '1479 kcal'
      },
      day3: {
        breakfast: 'Berry chia pudding',
        midMorning: 'Chopped veggie grain bowl with turmeric dressing + orange',
        lunch: 'Almonds + pear',
        eveningSnack: 'None',
        dinner: 'Kale & avocado salad with blueberries, edamame & baguette',
        calories: '1524 kcal'
      },
      day4: {
        breakfast: 'Berry chia pudding',
        midMorning: 'Chopped veggie grain bowl with turmeric dressing + orange',
        lunch: 'Almonds + pear',
        eveningSnack: 'None',
        dinner: 'Spiced grilled chicken with cauliflower rice tabbouleh + cucumber & avocado salad',
        calories: '1508 kcal'
      },
      day5: {
        breakfast: 'Greek yogurt with blueberries & walnuts',
        midMorning: 'Chopped veggie grain bowl with turmeric dressing + orange',
        lunch: 'Almonds + pear',
        eveningSnack: 'None',
        dinner: 'Balsamic-parmesan chickpeas & veggies + quinoa',
        calories: '1491 kcal'
      },
      day6: {
        breakfast: 'Strawberry-mango-banana smoothie',
        midMorning: 'Mixed greens with lentils & sliced apple',
        lunch: 'Almonds + pear',
        eveningSnack: 'None',
        dinner: 'Strawberry chicken salad with mint & goat cheese',
        calories: '1510 kcal'
      },
      day7: {
        breakfast: 'Strawberry-mango-banana smoothie',
        midMorning: 'Mixed greens with lentils & sliced apple',
        lunch: 'Almonds + pear',
        eveningSnack: 'None',
        dinner: 'Southwestern cauliflower rice bowl with shrimp & avocado crema',
        calories: '1489 kcal'
      }
    },
    shoppingList: {
      proteins: ['Salmon fillets - 500g', 'Chicken breast - 1kg', 'Shrimp - 500g', 'Eggs - 1 dozen', 'Chickpeas - 4 cans', 'White beans - 2 cans', 'Lentils - 500g', 'Edamame - 500g'],
      produce: ['Strawberries - 500g', 'Blueberries - 500g', 'Mango - 2', 'Bananas - 4', 'Spinach - 2 bags', 'Kale - 2 bunches', 'Mixed greens - 2 bags', 'Broccoli - 2 heads', 'Cauliflower - 1 head', 'Brussels sprouts - 500g', 'Asparagus - 500g', 'Bell peppers - 6', 'Cucumber - 3', 'Tomatoes - 1kg', 'Carrots - 500g', 'Celery - 2 stalks', 'Red onion - 1', 'Garlic - 3 heads', 'Ginger - 1 piece', 'Avocados - 4', 'Apples - 4', 'Pears - 4', 'Oranges - 4'],
      dairy: ['Greek yogurt - 2 tubs', 'Feta cheese - 200g', 'Parmesan cheese - 200g', 'Goat cheese - 200g'],
      grains: ['Quinoa - 1kg', 'Brown rice - 500g', 'Whole grain baguette - 1 loaf'],
      pantry: ['Chia seeds', 'Walnuts', 'Almonds', 'Pecans', 'Olive oil', 'Turmeric', 'Red pepper', 'Limes', 'Hummus']
    }
  }
};

const preferredTheme = localStorage.getItem('aura-theme') || 'light';
document.body.setAttribute('data-theme', preferredTheme);

if (themeToggle) {
  themeToggle.textContent = preferredTheme === 'light' ? 'Dark mode' : 'Light mode';
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', nextTheme);
    localStorage.setItem('aura-theme', nextTheme);
    themeToggle.textContent = nextTheme === 'light' ? 'Dark mode' : 'Light mode';
  });
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('mobile-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (siteNav.classList.contains('mobile-open') && 
        !siteNav.contains(event.target) && 
        !menuToggle.contains(event.target)) {
      siteNav.classList.remove('mobile-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Add touch support for mobile
  document.addEventListener('touchstart', (event) => {
    if (siteNav.classList.contains('mobile-open') && 
        !siteNav.contains(event.target) && 
        !menuToggle.contains(event.target)) {
      siteNav.classList.remove('mobile-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu when clicking a navigation link
  const navLinks = siteNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('mobile-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && siteNav.classList.contains('mobile-open')) {
      siteNav.classList.remove('mobile-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

if (bankDetails) {
  bankDetails.textContent = config.bankDetails || 'Bank details will appear here.';
}

function persistProducts() {
  localStorage.setItem('aura-products', JSON.stringify(products));
}

function persistCart() {
  localStorage.setItem('aura-cart', JSON.stringify(cart));
}

function persistOrders() {
  localStorage.setItem('aura-orders', JSON.stringify(orders));
}

function currency(value) {
  return `£${Number(value || 0).toFixed(2)}`;
}

function parsePackCount(name = '') {
  const match = String(name).match(/pack of\s*(\d+)/i);
  if (!match) {
    return 1;
  }

  return Math.max(1, Number(match[1] || 1));
}

function herbMetaForProduct(product) {
  const name = String(product.name || '').toLowerCase();
  const category = String(product.category || '').toLowerCase();
  const herbLibrary = {
    ashwagandha: {
      label: 'Ashwagandha',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/WithaniaFruit.jpg/960px-WithaniaFruit.jpg'
    },
    brahmi: {
      label: 'Brahmi',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Starr_010818-0007_Bacopa_monnieri.jpg/640px-Starr_010818-0007_Bacopa_monnieri.jpg'
    },
    giloy: {
      label: 'Giloy',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Tinospora_cordifolia.jpg/960px-Tinospora_cordifolia.jpg'
    },
    arjuna: {
      label: 'Arjuna',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Fruit_I_IMG_9577.jpg'
    },
    tulsi: {
      label: 'Tulsi',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Tulsi_or_Tulasi_Holy_basil.jpg/640px-Tulsi_or_Tulasi_Holy_basil.jpg'
    },
    shatavari: {
      label: 'Shatavari',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Asparagus_racemosus.JPG/640px-Asparagus_racemosus.JPG'
    },
    apamarga: {
      label: 'Apamarga',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Achyranthes_aspera_02.JPG/640px-Achyranthes_aspera_02.JPG'
    },
    blend: {
      label: 'Herbal Blend',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Tulsi_or_Tulasi_Holy_basil.jpg/640px-Tulsi_or_Tulasi_Holy_basil.jpg'
    }
  };

  if (name.includes('ashwagandha')) return herbLibrary.ashwagandha;
  if (name.includes('brahmi')) return herbLibrary.brahmi;
  if (name.includes('giloy')) return herbLibrary.giloy;
  if (name.includes('arjuna')) return herbLibrary.arjuna;
  if (name.includes('apamarga')) return herbLibrary.apamarga;
  if (name.includes('gynae') || name.includes('pustihar')) return herbLibrary.shatavari;
  if (name.includes('sugar') || name.includes('madhumay')) return herbLibrary.giloy;
  if (name.includes('suraksha') || name.includes('kwath')) return herbLibrary.tulsi;
  if (name.includes('dard') || name.includes('slim') || name.includes('power')) return herbLibrary.blend;
  if (category.includes('tablet') || category.includes('oil') || category.includes('granule') || category.includes('tea')) return herbLibrary.blend;

  return herbLibrary.blend;
}

function aiBottlePrompt(product) {
  const herb = herbMetaForProduct(product);
  const packCount = parsePackCount(product.name);
  const packPhrase = packCount > 1 ? `${packCount} bottles` : '1 bottle';

  return [
    `Photorealistic ecommerce studio product photo of ${packPhrase}, identical white herbal supplement bottle with white cap.`,
    'Brand on label: AuraTrace.',
    `Label must include a small real ${herb.label} herb image printed on the container.`,
    'Front-facing packshot, clean white background, natural soft shadow, high detail.',
    'Bottle shape and cap design must remain exactly consistent across all products.',
    'No mugs, no cups, no jars, no food bowls, no human hands, no random props.'
  ].join(' ');
}

function aiBottleImageUrl(product) {
  const prompt = aiBottlePrompt(product);
  const seed = Number(product.id || 1) % 100000;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${seed}&nologo=true`;
}

function escapeSvgText(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function herbThumbFallbackUrl(label = 'Herb') {
  const safeLabel = escapeSvgText(label);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#eef6eb"/>
          <stop offset="100%" stop-color="#d7e7cf"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="14" fill="url(#bg)"/>
      <path d="M24 50c0-12 10-22 22-22 0 12-10 22-22 22Z" fill="#5c7f52"/>
      <path d="M38 26c6 8 8 17 5 26" stroke="#35573a" stroke-width="2" fill="none"/>
      <text x="40" y="70" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="#2f4231">${safeLabel}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function bottleFallbackImageUrl(product) {
  const herb = herbMetaForProduct(product);
  const packCount = Math.min(parsePackCount(product.name), 3);
  const shortName = String(product.name || 'AuraTrace Herbal')
    .replace(/^AuraTrace\s*/i, '')
    .replace(/\(.*\)/g, '')
    .trim()
    .slice(0, 26);

  const bottleX = packCount === 1 ? [180] : packCount === 2 ? [135, 225] : [95, 180, 265];
  const bottles = bottleX.map((x) => `
      <g transform="translate(${x},80)">
        <rect x="-8" y="0" width="16" height="26" rx="5" fill="#ffffff" stroke="#d6dbe0"/>
        <rect x="-42" y="18" width="84" height="138" rx="18" fill="#ffffff" stroke="#d4d7db"/>
        <rect x="-36" y="56" width="72" height="72" rx="10" fill="#f9f8f2" stroke="#d6ccb0"/>
        <text x="0" y="78" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="#51644a">AuraTrace</text>
        <text x="0" y="92" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" fill="#2f4130">${escapeSvgText(herb.label)}</text>
        <text x="0" y="106" text-anchor="middle" font-family="Arial, sans-serif" font-size="7" fill="#5d625b">${escapeSvgText(shortName)}</text>
      </g>
  `).join('');

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="320" viewBox="0 0 360 320">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#f2f4f6"/>
        </linearGradient>
      </defs>
      <rect width="360" height="320" fill="url(#bg)"/>
      <ellipse cx="180" cy="272" rx="112" ry="18" fill="#dfe4e7"/>
      ${bottles}
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function resolveProductImage(product) {
  const img = String(product.image || '').trim();
  if (img.startsWith('data:image/')) {
    return img;
  }

  if (config.useAiPackagingImages) {
    return aiBottleImageUrl(product);
  }

  return bottleFallbackImageUrl(product);
}

function quantityFromDescription(description = '') {
  const text = String(description);
  const quantityMatch = text.match(/Quantity:\s*([^.]*)/i);
  if (quantityMatch && quantityMatch[1]) {
    return quantityMatch[1].trim();
  }

  const packMatch = text.match(/Pack size:\s*([^.]*)/i);
  if (packMatch && packMatch[1]) {
    return packMatch[1].trim();
  }

  return 'See product details';
}

function shelfLifeFromCategory(category = '') {
  const normalized = String(category).toLowerCase();
  if (normalized.includes('oil')) {
    return '24 months from MFG';
  }

  if (normalized.includes('tablet')) {
    return '36 months from MFG';
  }

  if (normalized.includes('tea') || normalized.includes('kwath') || normalized.includes('granule')) {
    return '24 months from MFG';
  }

  return '24 months from MFG';
}

function usageLineFromCategory(category = '') {
  const normalized = String(category).toLowerCase();
  if (normalized.includes('oil')) {
    return 'Use: Apply 3-5 drops topically and massage 1-2 times daily.';
  }

  if (normalized.includes('tablet')) {
    return 'Use: 1 tablet twice daily after meals, or as advised by a practitioner.';
  }

  if (normalized.includes('tea')) {
    return 'Use: Steep 1 tsp in hot water for 3-5 min, once or twice daily.';
  }

  if (normalized.includes('kwath')) {
    return 'Use: Boil 1 tsp with water and drink warm once daily.';
  }

  if (normalized.includes('granule')) {
    return 'Use: 1 tsp with warm water after meals, once or twice daily.';
  }

  return 'Use: Follow on-pack guidance or practitioner advice.';
}

function buildLabelMeta(product) {
  const now = new Date();
  const mfg = now.toLocaleString('en-GB', { month: 'short', year: 'numeric' });
  const codeBits = String(product.name || 'AT')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter((word) => word && word !== 'AURATRACE')
    .slice(0, 3)
    .map((word) => word[0])
    .join('');

  return {
    sku: `AT-${codeBits || 'PRD'}-${product.id}`,
    batch: `AT${String(now.getFullYear()).slice(-2)}${String(product.id).slice(-4)}`,
    netQuantity: quantityFromDescription(product.description),
    mfg,
    shelfLife: shelfLifeFromCategory(product.category),
    usage: usageLineFromCategory(product.category),
    storage: 'Storage: Keep in a cool, dry place away from direct sunlight.'
  };
}

function cartSubtotalValue() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function isFirstOrder() {
  const hasOrderedBefore = localStorage.getItem('aura-has-ordered');
  return !hasOrderedBefore;
}

function applyFirstOrderDiscount(subtotal) {
  if (isFirstOrder() && subtotal > 0) {
    return subtotal * 0.85; // 15% discount
  }
  return subtotal;
}

function getDiscountAmount(subtotal) {
  if (isFirstOrder() && subtotal > 0) {
    return subtotal * 0.15; // 15% discount amount
  }
  return 0;
}

function buildOrderLinks() {
  const subtotal = cartSubtotalValue();
  const discount = getDiscountAmount(subtotal);
  const finalTotal = applyFirstOrderDiscount(subtotal);
  const summary = cart.length
    ? cart.map((item) => `${item.name} x${item.quantity} - ${currency(item.price * item.quantity)}`).join(', ')
    : 'No products selected yet';
  
  let message = `Hello AuraTrace, I would like help with this order: ${summary}. Subtotal: ${currency(subtotal)}.`;
  if (discount > 0) {
    message += ` First order discount: -${currency(discount)}. Final total: ${currency(finalTotal)}.`;
  }

  if (checkoutWhatsapp) {
    checkoutWhatsapp.href = `https://wa.me/${config.whatsappNumber || '447575630141'}?text=${encodeURIComponent(message)}`;
  }

  if (checkoutEmail) {
    checkoutEmail.href = `mailto:${config.contactEmail || 'hello@auratrace.co.uk'}?subject=${encodeURIComponent('AuraTrace order support')}&body=${encodeURIComponent(message)}`;
  }
  
  // Owner notification link (for admin use)
  const ownerMessage = `NEW ORDER: ${summary}. Total: ${currency(finalTotal)}. Check Stripe Dashboard for details.`;
  if (config.ownerPhone) {
    // Store owner notification message for admin use
    localStorage.setItem('aura-owner-notification', ownerMessage);
  }
}

function updateDeliveryNote(subtotal) {
  if (!deliveryNote) {
    return;
  }

  if (subtotal === 0) {
    deliveryNote.textContent = `Spend ${currency(freeDeliveryThreshold)} more to unlock free delivery.`;
    return;
  }

  if (subtotal >= freeDeliveryThreshold) {
    deliveryNote.textContent = 'Free delivery unlocked for this basket.';
    return;
  }

  deliveryNote.textContent = `Spend ${currency(freeDeliveryThreshold - subtotal)} more to unlock free delivery.`;
}

function renderCart() {
  if (!cartItems || !cartSubtotal) {
    return;
  }

  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-copy">Your cart is empty. Add products when you are ready.</p>';
    cartSubtotal.textContent = currency(0);
    updateDeliveryNote(0);
    buildOrderLinks();
    return;
  }

  cart.forEach((item) => {
    const article = document.createElement('article');
    article.className = 'cart-item';
    article.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <div class="cart-item-meta">
          <span>${item.category}</span>
          <span>Qty ${item.quantity}</span>
          <span>${currency(item.price)} each</span>
        </div>
      </div>
      <div class="cart-item-price">
        <strong>${currency(item.price * item.quantity)}</strong>
        <button class="icon-button" type="button" data-remove-id="${item.id}">Remove</button>
      </div>
    `;
    cartItems.appendChild(article);
  });

  const subtotal = cartSubtotalValue();
  const discount = getDiscountAmount(subtotal);
  const finalTotal = applyFirstOrderDiscount(subtotal);
  
  if (discount > 0) {
    cartSubtotal.innerHTML = `${currency(subtotal)} <span class="discount-badge">15% OFF: -${currency(discount)}</span> <strong>${currency(finalTotal)}</strong>`;
  } else {
    cartSubtotal.textContent = currency(subtotal);
  }
  
  updateDeliveryNote(subtotal);
  buildOrderLinks();
}

function addToCart(productId) {
  const product = products.find((item) => String(item.id) === String(productId));
  if (!product) {
    return;
  }

  const existing = cart.find((item) => String(item.id) === String(productId));
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.unshift({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: 1
    });
  }

  persistCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => String(item.id) !== String(productId));
  persistCart();
  renderCart();
}

function renderProducts() {
  if (!productList) {
    return;
  }

  productList.innerHTML = '';

  if (products.length === 0) {
    productList.innerHTML = `
      <article class="product-card empty-state-card">
        <p class="eyebrow">COLLECTION COMING SOON</p>
        <h4>Your storefront is ready for products.</h4>
        <p>Add products in the section below and they will appear here with price, category, and add-to-cart controls.</p>
      </article>
    `;
    return;
  }

  products.forEach((product) => {
    const labelSeries = String(product.labelSeries || 'Botanical Standard Label').trim();
    const benefits = Array.isArray(product.benefits) && product.benefits.length
      ? product.benefits.slice(0, 2)
      : ['Traditionally used in everyday wellness routines.', 'Use consistently as part of a balanced lifestyle.'];
    const herbMeta = herbMetaForProduct(product);
    const labelMeta = buildLabelMeta(product);
    const productImageUrl = resolveProductImage(product);
    const productFallbackImageUrl = bottleFallbackImageUrl(product);
    const herbThumbUrl = String(herbMeta.image || '').trim() || herbThumbFallbackUrl(herbMeta.label);
    const herbThumbFallback = herbThumbFallbackUrl(herbMeta.label);
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <img class="product-image" src="${productImageUrl}" data-fallback-src="${productFallbackImageUrl}" alt="${product.name}" loading="lazy" />
      <div class="product-label" aria-label="AuraTrace custom label">
        <div class="label-head">
          <div class="label-brand-group">
            <img class="label-herb-thumb" src="${herbThumbUrl}" data-fallback-src="${herbThumbFallback}" alt="${herbMeta.label} herb" loading="lazy" />
            <p class="label-brand">AuraTrace</p>
          </div>
          <span class="label-badge">Custom label</span>
        </div>
        <p class="label-series">${labelSeries}</p>
        <div class="label-specs">
          <span>SKU: ${labelMeta.sku}</span>
          <span>Batch: ${labelMeta.batch}</span>
          <span>Net qty: ${labelMeta.netQuantity}</span>
          <span>MFG: ${labelMeta.mfg}</span>
          <span>Shelf life: ${labelMeta.shelfLife}</span>
        </div>
        <p class="label-use">${labelMeta.usage}</p>
        <p class="label-storage">${labelMeta.storage}</p>
        <ul class="label-benefits">
          <li>${benefits[0] || ''}</li>
          <li>${benefits[1] || ''}</li>
        </ul>
      </div>
      <div class="product-top">
        <div>
          <p class="eyebrow">${product.category}</p>
          <h4>${product.name}</h4>
        </div>
        <span class="product-price">${currency(product.price)}</span>
      </div>
      <p>${product.description}</p>
      <div class="tag-row">
        <span>Premium</span>
        <span>Shop ready</span>
        <span>Cart enabled</span>
      </div>
      <div class="product-actions">
        <button class="btn btn-primary" type="button" data-add-id="${product.id}">Add to cart</button>
        <a class="btn btn-secondary" href="https://wa.me/${config.whatsappNumber || '447575630141'}?text=${encodeURIComponent(`Hello AuraTrace, I have a question about ${product.name}.`) }" target="_blank" rel="noreferrer">Ask about this</a>
      </div>
    `;

    const productImageElement = card.querySelector('.product-image');
    if (productImageElement) {
      productImageElement.addEventListener('error', () => {
        const fallbackSrc = productImageElement.getAttribute('data-fallback-src');
        if (fallbackSrc && productImageElement.src !== fallbackSrc) {
          productImageElement.src = fallbackSrc;
        }
      });
    }

    const herbThumbElement = card.querySelector('.label-herb-thumb');
    if (herbThumbElement) {
      herbThumbElement.addEventListener('error', () => {
        const fallbackSrc = herbThumbElement.getAttribute('data-fallback-src');
        if (fallbackSrc && herbThumbElement.src !== fallbackSrc) {
          herbThumbElement.src = fallbackSrc;
        }
      });
    }

    productList.appendChild(card);
  });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve('');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Unable to read image file.'));
    reader.readAsDataURL(file);
  });
}

if (productForm) {
  productForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(productForm);
    const imageFile = formData.get('image');

    const product = {
      id: Date.now(),
      name: String(formData.get('name') || '').trim(),
      price: Number(formData.get('price') || 0),
      category: String(formData.get('category') || '').trim(),
      description: String(formData.get('description') || '').trim(),
      image: imageFile && typeof imageFile !== 'string' ? await readFileAsDataUrl(imageFile) : '',
      labelSeries: 'Custom AuraTrace Label',
      benefits: ['Supports routine wellness goals.', 'Use daily as advised for best consistency.']
    };

    if (!product.name || !product.category || !product.description || product.price <= 0) {
      return;
    }

    products = [product, ...products];
    persistProducts();
    renderProducts();
    productForm.reset();

    if (imagePreview) {
      imagePreview.textContent = `${product.name} added to the storefront.`;
    }
  });
}

if (productList) {
  productList.addEventListener('click', (event) => {
    const addButton = event.target.closest('[data-add-id]');
    if (!addButton) {
      return;
    }

    addToCart(addButton.getAttribute('data-add-id'));
  });
}

if (cartItems) {
  cartItems.addEventListener('click', (event) => {
    const removeButton = event.target.closest('[data-remove-id]');
    if (!removeButton) {
      return;
    }

    removeFromCart(removeButton.getAttribute('data-remove-id'));
  });
}

// Diet Plan Modal Functionality
const dietPlanModal = document.getElementById('diet-plan-modal');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');
const dietPlanDetails = document.getElementById('diet-plan-details');

function openDietPlanModal(planId) {
  const plan = dietPlans[planId];
  if (!plan) return;

  const detailsHtml = `
    <div class="diet-plan-details-header">
      <h4>${plan.name}</h4>
      <p style="margin: 0.5rem 0; color: var(--muted);">${plan.description}</p>
      <div class="diet-plan-meta">
        <span><strong>Daily Calories:</strong> ${plan.dailyCalories}</span>
        <span><strong>Duration:</strong> ${plan.duration}</span>
      </div>
      <p class="diet-plan-source">${plan.source}</p>
    </div>

    <div class="meal-schedule">
      ${Object.entries(plan.mealPlan).map(([day, meals]) => `
        <div class="day-schedule">
          <h5>${day.charAt(0).toUpperCase() + day.slice(1)}</h5>
          <div class="day-meals">
            ${meals.breakfast ? `<div class="meal-item"><span class="meal-label">Breakfast:</span><span class="meal-content">${meals.breakfast}</span></div>` : ''}
            ${meals.midMorning ? `<div class="meal-item"><span class="meal-label">Mid-Morning:</span><span class="meal-content">${meals.midMorning}</span></div>` : ''}
            ${meals.lunch ? `<div class="meal-item"><span class="meal-label">Lunch:</span><span class="meal-content">${meals.lunch}</span></div>` : ''}
            ${meals.eveningSnack ? `<div class="meal-item"><span class="meal-label">Evening Snack:</span><span class="meal-content">${meals.eveningSnack}</span></div>` : ''}
            ${meals.dinner ? `<div class="meal-item"><span class="meal-label">Dinner:</span><span class="meal-content">${meals.dinner}</span></div>` : ''}
            ${meals.beforeBed ? `<div class="meal-item"><span class="meal-label">Before Bed:</span><span class="meal-content">${meals.beforeBed}</span></div>` : ''}
          </div>
          ${meals.calories ? `<div class="day-calories">${meals.calories}</div>` : ''}
        </div>
      `).join('')}
    </div>

    <div class="shopping-list-section">
      <h5>Shopping List</h5>
      ${Object.entries(plan.shoppingList).map(([category, items]) => `
        <div class="shopping-list-category">
          <h6>${category.charAt(0).toUpperCase() + category.slice(1)}</h6>
          <ul class="shopping-list-items">
            ${items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
  `;

  dietPlanDetails.innerHTML = detailsHtml;
  dietPlanModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeDietPlanModal() {
  dietPlanModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// View Details button event listeners
document.querySelectorAll('.diet-plan-view-btn').forEach(button => {
  button.addEventListener('click', (event) => {
    const planId = event.target.getAttribute('data-plan-id');
    openDietPlanModal(planId);
  });
});

// Close modal events
if (modalClose) {
  modalClose.addEventListener('click', closeDietPlanModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', closeDietPlanModal);
}

// Close on Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && dietPlanModal.getAttribute('aria-hidden') === 'false') {
    closeDietPlanModal();
  }
});

const dietPlanList = document.getElementById('diet-plan-list');
if (dietPlanList) {
  dietPlanList.addEventListener('click', (event) => {
    const addButton = event.target.closest('.diet-plan-add-btn');
    if (!addButton) {
      return;
    }

    const productId = addButton.getAttribute('data-product-id');
    const product = products.find((item) => String(item.id) === String(productId));
    if (!product) {
      return;
    }

    const existing = cart.find((item) => String(item.id) === String(productId));
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.unshift({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        quantity: 1
      });
    }

    persistCart();
    renderCart();
  });
}

if (clearCartButton) {
  clearCartButton.addEventListener('click', () => {
    cart = [];
    persistCart();
    renderCart();
  });
}

if (checkoutForm) {
  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(checkoutForm);
    const paymentMethod = String(formData.get('paymentMethod') || '').trim();

    // Handle Stripe payment
    if (paymentMethod === 'stripe') {
      if (cart.length === 0) {
        if (checkoutStatus) {
          checkoutStatus.textContent = 'Your cart is empty. Add items before checkout.';
        }
        return;
      }

      const customerName = String(formData.get('customerName') || '').trim();
      const customerEmail = String(formData.get('customerEmail') || '').trim();
      const deliveryAddress = String(formData.get('deliveryAddress') || '').trim();

      if (!customerName || !customerEmail || !deliveryAddress) {
        if (checkoutStatus) {
          checkoutStatus.textContent = 'Please complete your name, email, and delivery address before card checkout.';
        }
        return;
      }

      if (checkoutStatus) {
        checkoutStatus.textContent = 'Redirecting to secure Stripe checkout...';
      }

      // Use backend checkout session for automatic email delivery
      fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          customerName,
          customerEmail,
          deliveryAddress,
          notes: String(formData.get('notes') || '').trim()
        })
      })
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || 'Unable to start checkout.');
          }

          if (data.url) {
            window.location.href = data.url;
            return;
          }

          throw new Error('Checkout URL was not returned.');
        })
        .catch((error) => {
          // Fallback to payment links if backend fails
          if (cart.length === 1) {
            const item = cart[0];
            const paymentLink = config.stripePaymentLinks ? config.stripePaymentLinks[item.id] : '';
            
            if (paymentLink) {
              window.location.href = paymentLink;
              return;
            }
          }

          if (checkoutStatus) {
            checkoutStatus.textContent = `${error.message} Please try again or choose bank transfer, WhatsApp, or email payment methods.`;
          }
        });

      return;
    }

    // Handle other payment methods (bank, whatsapp, email)
    const order = {
      id: Date.now(),
      items: cart,
      subtotal: cartSubtotalValue(),
      discount: getDiscountAmount(cartSubtotalValue()),
      finalTotal: applyFirstOrderDiscount(cartSubtotalValue()),
      customerName: String(formData.get('customerName') || '').trim(),
      customerEmail: String(formData.get('customerEmail') || '').trim(),
      customerPhone: String(formData.get('customerPhone') || '').trim(),
      deliveryAddress: String(formData.get('deliveryAddress') || '').trim(),
      paymentMethod: paymentMethod,
      notes: String(formData.get('notes') || '').trim(),
      createdAt: new Date().toISOString()
    };

    orders = [order, ...orders];
    persistOrders();
    
    // Mark as first order completed to prevent future discounts
    if (isFirstOrder()) {
      localStorage.setItem('aura-has-ordered', 'true');
    }

    if (checkoutStatus) {
      checkoutStatus.textContent = `${order.customerName || 'Customer'}'s order request has been saved. Use WhatsApp or email buttons to complete the purchase conversation.`;
    }

    const orderLines = cart.length
      ? cart.map((item) => `${item.name} x${item.quantity}`).join(', ')
      : 'No items currently in cart';
    const message = `Hello AuraTrace, my order request is saved. Items: ${orderLines}. Payment preference: ${order.paymentMethod}. Name: ${order.customerName}.`;

    if (checkoutWhatsapp) {
      checkoutWhatsapp.href = `https://wa.me/${config.whatsappNumber || '447575630141'}?text=${encodeURIComponent(message)}`;
    }

    if (checkoutEmail) {
      checkoutEmail.href = `mailto:${config.contactEmail || 'hello@auratrace.co.uk'}?subject=${encodeURIComponent('Saved AuraTrace order request')}&body=${encodeURIComponent(message)}`;
    }

    checkoutForm.reset();
  });
}

renderProducts();
renderCart();
buildOrderLinks();

if (urlParams.get('success') === 'true' && checkoutStatus) {
  checkoutStatus.textContent = 'Payment successful. Thank you — we will confirm your order shortly.';
  cart = [];
  persistCart();
  renderCart();
}

if (urlParams.get('canceled') === 'true' && checkoutStatus) {
  checkoutStatus.textContent = 'Checkout was canceled. Your cart is still saved.';
}
