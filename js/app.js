// GLOBAL VARIABLES
const placemat_yellow = 'var(--lady-yellow)';
const placemat_red = 'var(--man-red)';
const placemat_green = 'var(--man-green)';

// --> GAME / APP STORIES

// TODO #1: CUSTOMER PROGRESS BAR - INCREASES WHEN CUSTOMER IS SERVED CORRECT FOOD ITEM IN ALOTTED TIME. WHEN ALL CUSTOMERS SERVED, LEVEL IS OVER (IF TIME STILL REMAINING ON TIMER)
// TODO #2: TIMER - EACH LEVEL HAS SET TIME TO COMPLETE. STARTS WHEN GAME STARTS. WHEN IT RUNS OUT LEVEL IS OVER.

// TODO #3: A USER SHOULD BE ABLE TO SELECT THE GAME MODE (SELECT GAME MODE FUNCTION)

// TODO #4: A USER SHOULD BE ABLE TO SEE A MODAL THAT INDICATES THE ROUND IS STARTING ALONG WITH BRIEF INSTRUCTIONS.
// TODO #5: A USER SHOULD BE NOTIFIED HOW MANY CUSTOMERS WILL ENTER THE RESTAURANT DURING A ROUND (CUSTOMER OBJECTS)
// TODO #6: A USER SHOULD BE ABLE TO SEE HOW MANY CUSTOMERS THEY HAVE SERVED CORRECTLY (CUSTOMER PROGRESS BAR) OUT OF THE TOTAL CUSTOMERS AVAILABLE IN THE ROUND
// TODO #7: A USER SHOULD BE ABLE TO SEE HOW MUCH TIME IS REMAINING ONCE THE ROUND STARTS (TIMER: ROUND)

// TODO #16: A USER SHOULD BE ABLE TO DETERMINE IF THE FOOD ITEM SERVED MATCHES THE ORDER (CHECK ORDER FUNCTION) (COLOR OF ORDER TURNS GREEN. MAYBE A SOUND?? THANK YOU!)
// TODO #17: A USER SHOULD BE ABLE TO SEE THE CUSTOMERS PROGRESS BAR INCREASE IF THE FOOD ITEM SERVED MATCHES THE ORDER WITHIN THE ALLOTTED TIME (INCREASE CUSTOMER PROGRESS BAR)
// TODO #18: A USER SHOULD BE ABLE TO RECEIVE A NOTIFICATION IF THE FOOD ITEM SERVED DOES NOT MATCH THE ORDER (INCORRECT ORDER FUNCTION - SHAKES ORDER - MAYBE SOUND - CUSTOMER LEAVES)
// TODO #20: A USER SHOULD BE NOTIFIED IF THE TIME EXPIRES FOR THE ROUND
// TODO #21: A USER SHOULD BE ABLE TO DETERMINE HOW THEY PERFORMED DURING THE ROUND (MODAL)
// TODO #22: A USER SHOULD BE ABLE TO PROCEED TO THE NEXT ROUND IF THEY WON THE CURRENT ROUND (MODAL BUTTON)
// TODO #23: A USER SHOULD BE ABLE TO START A NEW GAME (OR REPEAT THE ROUND???) IF THEY LOSS THE CURRENT ROUND (MODAL BUTTON)
// TODO #24: A USER SHOULD BE ABLE TO DETERMINE IF THEY BEAT THE GAME
// TODO #25: A USER SHOULD BE ABLE TO CLOSE THE BROSWER AND PRESERVE THE GAME STATE (SAVE GAME)

// --> CUSTOMER / FOOD STORIES

// TODO #8: A USER SHOULD BE ABLE TO WATCH A CUSTOMER ENTER THE RESTAURANT AND APPROACH THE COUNTER (ENTER RESTAURANT FUNCTION).
// TODO #9: A USER SHOULD BE ABLE TO SEE THE CUSTOMER PLACE AN ORDER (ORDER FUNCTION)
// TODO #10: A USER SHOULD BE ABLE TO SEE HOW MUCH TIME REMAINS TO SERVE THE CUSTOMER (TIMER: CUSTOMER SERVICE) - PLACEMAT FADES TO RED
// TODO #11: A USER SHOULD BE ABLE TO DETERMINE WHEN THE CUSTOMER IS GETTING ANGRY (COLOR OF ORDER GRADUALLY CHANGES FROM ORANGE TO RED OVER GIVEN TIME (30 SECONDS))
// TODO #12: A USER SHOULD BE ABLE TO DETERMINE IF AN ITEM NEEDS TO BE COOKED (FOOD ITEM: RAW STATE)
// TODO #13: A USER SHOULD BE ABLE TO COOK A FOOD ITEM  (COOK FUNCTION)
// TODO #14: A USER SHOULD BE ABLE TO DETERMINE WHEN A FOOD ITEM HAS BEEN COOKED AND IS READY TO SERVE (FOOD ITEM: READY STATE)
// TODO #15: A USER SHOULD BE ABLE TO SERVE THE FOOD ITEM BY DRAGGING THE ITEM ON TOP OF THE CUSTOMER'S ORDER (SERVE FUNCTION)
// TODO #19: A USER SHOULD BE ABLE TO WATCH A CUSTOMER LEAVE THE RESTAURANT (EXIT RESTAURANT FUNCTION)

//-----> CUSTOMER / FOOD CLASSES

// CLASS #3: CUSTOMER (ID, NAME, IMAGE, SHIRT_COLOR, SEAT, PATIENCE_LEVEL[LOW,MEDIUM,HIGH]], DIRECTION[LEFT,RIGHT],  ORDER{})
// ---------------> GET(), SET(), SEAT(), PLACE_ORDER(SEAT), LEAVE()
class Customer {
  constructor(
    id,
    name,
    image = 'images/customers/man-green.png',
    // shirt_color,
    seat = 0,
    patience_level = 'HIGH',
    direction = 'LEFT',
    delay = '5s',
    order
  ) {
    (this.id = id),
      (this.name = name),
      (this.image = image),
      // this.shirt_color = this.shirt_color,
      (this.seat = seat),
      (this.patience_level = patience_level),
      (this.direction = direction),
      (this.delay = delay),
      (this.order = order);
  }

  set_direction(direction) {
    // which way will the customer enter and exit the cafe
    this.direction = direction;
  }

  set_delay(delay) {
    // how long will it take for customer to approach the counter
    this.delay = delay;
  }

  seated(seat) {
    this.seat = seat;
  }
}

// CLASS #4: ORDER (ID, SEAT, STATUS(CREATED,PLACED,FILLED,CANCELLED), FOOD_ITEM{})
class Order {
  constructor(
    id,
    seat = 0, // seat has not been assigned
    status = 'CREATED',
    placemat_color = placemat_yellow,
    delay = '5s',
    food_item
  ) {
    (this.id = id),
      (this.seat = seat),
      (this.status = status),
      (this.placemat_color = placemat_color),
      (this.delay = delay),
      (this.food_item = food_item);
  }

  set_delay(delay) {
    // how long will it take for the order to be placed
    this.delay = delay;
  }

  create(seat) {
    // order has been initialized for the seat, but is not visible on UI. customer is reading menu.
    this.status = 'CREATED';
    this.seat = seat;
    console.log(`Order #${this.id} has been created.`);
  }

  place() {
    // order has been placed and will fade-in on UI
    this.status = 'PLACED';
    console.log(`Order #${this.id} has been placed.`);
  }

  fill() {
    // order has been filled and will be hidden on UI
    this.status = 'FILLED';
    this.placemat_color = placemat_green;
    console.log(`Order #${this.id} has been filled.`);
  }

  cancel() {
    // order has been cancelLed and will be hidden on UI. player took too long to fill the order or served wrong food item.
    this.status = 'CANCELLED';
    this.placemat_color = placemat_red;
    console.log(`Order #${this.id} has been cancelled.`);
  }
}

// CLASS #6: POT (ID, LABEL[COOK, SERVE, DISCARD], FOOD_ITEM{})
class Pot {
  constructor(id, food_item, label = 'COOK') {
    (this.id = id), (this.label = label), (this.food_item = food_item);
  }

  reset() {
    // food item is raw. pot is ready to cook.
    this.label = 'COOK';
    console.log(`Pot #${this.id} is ready to cook food.`);
  }

  ready() {
    // food item has been cooked. pot is ready to serve.
    this.label = 'SERVE';
    console.log(`Pot #${this.id} is ready to serve food.`);
  }

  spoiled() {
    // food item is expired. pot is ready to be emptied.
    this.label = 'DISCARD';
    console.log(`Pot #${this.id} is ready to be emptied.`);
  }

  empty() {
    this.food_item.reset();
    this.reset();
  }
} // end class Pot

// CLASS #5: FOOD_ITEM (ID, NAME, IMAGE, COST, [EXPIRATION_TIME], [COOK_TIME], STATUS[RAW,COOKING,COOKED,EXPIRED])
class FoodItem {
  constructor(
    id,
    name,
    image = 'images/food/surprise.png',
    cost = 5,
    expiration_time = 30000,
    cook_time = 7000,
    status = 'RAW'
  ) {
    (this.id = id),
      (this.name = name),
      (this.image = image),
      (this.cost = cost),
      (this.expiration_time = expiration_time),
      (this.cook_time = cook_time),
      (this.status = status);
  }

  reset() {
    this.status = 'RAW';
    console.log(`food item #${this.id} is raw.`);
  }
  cook() {
    this.status = 'COOKING';
    console.log(`food item #${this.id} is cooking.`);
  }

  ready() {
    this.status = 'COOKED';
    console.log(`food item #${this.id} has been cooked.`);
  }

  expired() {
    this.status = 'EXPIRED';
    console.log(`food item #${this.id} has expired.`);
  }
} // end food_item

//-----> GAME CLASSES

// CLASS #7: GAME (ID, STATE[NEW,SAVED], MODE[CUSTOMER,REVENUE], CUSTOMERS_SERVED, REVENUE, ROUND{})
// ---------------> GET(), SET(), UPDATE_STATE(STATE), UPDATE_MODE(MODE), INCREMENT_CUSTOMERS_SERVED(), INCREMENT_REVENUE(), UPDATE_ROUND()

// CLASS #8: ROUND (ID, SCORE, CUSTOMERS_SERVED, REVENUE, WON?, SETTINGS{}, PROGRESS_BAR{}, TIMER{})
// ---------------> GET(), SET(), INCREMENT_SCORE(), INCREMENT_CUSTOMERS_SERVED(), INCREMENT_REVENUE()

// TODO: ? DO WE NEED TO ADD FUNCTIONS TO CREATE SETTINGS/ PROGRESS_BAR / TIMER?

// CLASS #9: SETTINGS (ID, TOTAL_CUSTOMERS, TOTAL_REVENUE, TOTAL_TIME, DIFFICULTY[EASY,MEDIUM,HARD])
// ---------------> GET(), SET()

// CLASS #1: PROGRESS_BAR (ID, NAME, PROGRESS, GOAL, PERCENT_COMPLETE, STATUS[INITIALIZED,COMPLETE])
// ---------------> GET(), SET(), INCREMENT(), INITIALIZE(GOAL), INCREMENT_PROGRESS(), INCREMENT_PERCENT_COMPLETE(), GOAL_REACHED()

// CLASS #2: TIMER (ID, NAME, TIME, NOTIFICATION_TIME)
// ---------------> GET(), SET(), INCREMENT(), INITIALIZE(TIME), NOTIFY(), EXPIRE()

const updateFoodItem = food_item => {
  food_item.update_status('cooking');
  // find elem in dom
  //
};

// APPLICATION LOGIC

const foodItemNames = [
  'cocktail',
  'ice_cream',
  'noodles',
  'pizza',
  'tea',
  'tofu',
  'turkey',
  'wine'
];
const menu = [];
const kitchen = [];

const App = {
  gameOver: false,

  generateRandomNumber: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  shuffleArray: arr => {
    var x, y, z;
    for (x = arr.length - 1; x > 0; x--) {
      y = Math.floor(Math.random() * x);
      z = arr[x];
      arr[x] = arr[y];
      arr[y] = z;
    }
    return arr;
  },

  timer: seconds => {
    for (let s = 0; s < seconds; seconds++) {
      for (let i = 0; i < 1000; i++) {
        let millisec = i;
      }
      let sec = s;
      console.log(sec);
    }
  },

  getFoodItemURL: food => {
    return `images/food/${food}.png`;
  },

  customer: {
    // customer logic
  },

  order: {
    // order logic
  },

  food: {
    // food logic

    createMenu: () => {
      let id = 1;

      // get randomized array of food item names
      const foodItems = App.shuffleArray(foodItemNames);

      // create FoodItem objects and append them to the menu array
      for (foodItem of foodItems) {
        let item = new FoodItem(id, foodItem, App.getFoodItemURL(foodItem));
        console.log(item);
        menu.push(item);
        id++;
      }

      console.log('menu created', menu);
    }
  },

  pot: {
    addToKitchen: () => {
      // create array of pot objects with food in them and add to kitchen array
      for (let p = 1; p < 9; p++) {
        let pot = new Pot(p, menu[p - 1]);
        kitchen.push(pot);
        console.log(pot);
      }
      console.log('pots created and added to kitchen:', kitchen);
    }
  }
};

// jQuery onLoad
$(() => {
  // TODO: ADD GAME LOGIC
  console.log('cafe chozen is open for business!');
  App.food.createMenu();
  App.pot.addToKitchen();

  // update UI with menu
  UI.pot.addToKitchen();
  UI.food.addToPots();
});
