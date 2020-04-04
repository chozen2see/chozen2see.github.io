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

// DONE #8: A USER SHOULD BE ABLE TO WATCH A CUSTOMER ENTER THE RESTAURANT AND APPROACH THE COUNTER (ENTER RESTAURANT FUNCTION).
// TODO #9: A USER SHOULD BE ABLE TO SEE THE CUSTOMER PLACE AN ORDER (ORDER FUNCTION)
// TODO #10: A USER SHOULD BE ABLE TO SEE HOW MUCH TIME REMAINS TO SERVE THE CUSTOMER (TIMER: CUSTOMER SERVICE) - PLACEMAT FADES TO RED
// TODO #11: A USER SHOULD BE ABLE TO DETERMINE WHEN THE CUSTOMER IS GETTING ANGRY (COLOR OF ORDER GRADUALLY CHANGES FROM ORANGE TO RED OVER GIVEN TIME (30 SECONDS))
// DONE #12: A USER SHOULD BE ABLE TO DETERMINE IF AN ITEM NEEDS TO BE COOKED (FOOD ITEM: RAW STATE)
// DONE #13: A USER SHOULD BE ABLE TO COOK A FOOD ITEM  (COOK FUNCTION)
// DONE #14: A USER SHOULD BE ABLE TO DETERMINE WHEN A FOOD ITEM HAS BEEN COOKED AND IS READY TO SERVE (FOOD ITEM: READY STATE)
// TODO #15: A USER SHOULD BE ABLE TO SERVE THE FOOD ITEM BY DRAGGING THE ITEM ON TOP OF THE CUSTOMER'S ORDER (SERVE FUNCTION)
// DONE #19: A USER SHOULD BE ABLE TO WATCH A CUSTOMER LEAVE THE RESTAURANT (EXIT RESTAURANT FUNCTION)

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
    delay = '5s'
  ) {
    (this.id = id),
      (this.name = name),
      (this.image = image),
      // this.shirt_color = this.shirt_color,
      (this.seat = seat),
      (this.patience_level = patience_level),
      (this.direction = direction),
      (this.delay = delay),
      this.order;
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

  // reset () {
  create(seat) {
    // order has been initialized for the seat, but is not visible on UI. customer is reading menu.
    this.status = 'CREATED';
    this.seat = seat; // remove this?
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
class Round {
  constructor(
    id = 1,
    customers_served = 0,
    revenue = 0,
    won = false,
    progress_bar = 0
  ) {
    (this.id = id),
      (this.customers_served = customers_served),
      (this.revenue = revenue),
      (this.won = won),
      (this.progress_bar = progress_bar),
      this.timer,
      this.settings;
  }

  customerServed() {
    this.customers_served++;
  }

  incrementRevenue(revenue) {
    this.revenue += revenue ? revenue : 0;
  }

  progressMade(progress) {
    this.progress_bar = progress;
  }

  initializeTimer() {
    this.timer = this.settings.total_time_minutes * 60000;
  }

  decrementTimer() {
    this.timer -= 1000;
  }
}
// TODO: ? DO WE NEED TO ADD FUNCTIONS TO CREATE SETTINGS/ PROGRESS_BAR / TIMER?

// CLASS #9: SETTINGS (ID, TOTAL_CUSTOMERS, TOTAL_REVENUE, TOTAL_TIME, DIFFICULTY[EASY,MEDIUM,HARD])
// ---------------> GET(), SET()
class Settings {
  constructor(
    id = 1,
    total_customers = 6,
    total_revenue = 30,
    total_time_minutes = 2,
    difficulty = 'EASY'
  ) {
    (this.id = id),
      (this.total_customers = total_customers),
      (this.total_revenue = total_revenue),
      (this.total_time_minutes = total_time_minutes),
      (this.difficulty = difficulty);
  }
}

// CLASS #1: PROGRESS_BAR (ID, NAME, PROGRESS, GOAL, PERCENT_COMPLETE, STATUS[INITIALIZED,COMPLETE])
// ---------------> GET(), SET(), INCREMENT(), INITIALIZE(GOAL), INCREMENT_PROGRESS(), INCREMENT_PERCENT_COMPLETE(), GOAL_REACHED()

// CLASS #2: TIMER (ID, NAME, TIME, NOTIFICATION_TIME)
// ---------------> GET(), SET(), INCREMENT(), INITIALIZE(TIME), NOTIFY(), EXPIRE()

// APPLICATION LOGIC

const customerNames = [
  'lady_burgundy',
  'lady_orange',
  'lady_pink',
  'lady_yellow',
  'man_black',
  'man_blue',
  'man_green',
  'man_peach',
  'man_red',
  'man_teal',
];

const foodItemNames = [
  'cocktail',
  'ice_cream',
  'noodles',
  'pizza',
  'tea',
  'tofu',
  'turkey',
  'wine',
];
const menu = [];
const kitchen = [];
const cafeCustomers = [];
let cafeSeating = [];
let customerLog = [];
let currentRound;
let currentRoundTimer;

const App = {
  gameOver: false,

  generateRandomNumber: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  shuffleArray: (arr) => {
    var x, y, z;
    for (x = arr.length - 1; x > 0; x--) {
      y = Math.floor(Math.random() * x);
      z = arr[x];
      arr[x] = arr[y];
      arr[y] = z;
    }
    return arr;
  },

  delayFunction: (
    seconds,
    delayedFunction = undefined,
    argument = undefined
  ) => {
    const countDownTime = new Date().getTime() + seconds * 1000;

    let timerInterval = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down time
      let distance = countDownTime - now;
      let s = Math.floor((distance % (1000 * 60)) / 1000);

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(timerInterval);
        if (delayedFunction !== undefined) {
          if (argument !== undefined) {
            delayedFunction(argument);
          } else {
            delayedFunction();
          }
        } else {
          console.log('no function defined. using timer only.');
        }
        // delayedFunction !== undefined && argument !== undefined
        //   ?
        //   :
      }
    }, 1000);

    return timerInterval;
  },

  game: {
    start: () => {
      console.log('cafe chozen is open for business!');
      currentRound = App.round.create();

      let roundsToPlay = Math.ceil(currentRound.settings.total_customers / 3);
      let roundDelay = 2;
      //console.log('round', currentRound);

      App.customer.createCustomers();

      for (let i = 1; i <= roundsToPlay; i++) {
        // play rounds
        App.delayFunction(roundDelay, App.round.start);

        // add order function here

        roundDelay += 40;
      }

      // ROUND ONE
      //App.delayFunction(60, App.round.two);

      // ORDER

      // KITCHEN (FOOD / POTS)
      App.kitchen.setup();
    },
  },

  round: {
    create: () => {
      let newRound = new Round();
      let settingsOne = new Settings();
      // let progressBarOne = new ProgressBar(settingsOne.total_customers);
      //let timerOne = new Timer(settingsOne.total_time_minutes);

      // update round with settings, assign it a progress bar and a timer
      newRound.settings = settingsOne;
      // roundOne.progress_bar = progressBarOne;
      newRound.initializeTimer();

      currentRoundTimer = setInterval(UI.round.updateTimer, 1000);

      // open modal with round info
      return newRound;
    },
    //   one: () => {
    //       // CUSTOMER
    // App.customer.createCustomers();
    //     App.customer.seatCustomers();
    //     UI.customer.seatCustomers();
    //     App.delayFunction(20, App.customer.leave);
    //   },

    start: () => {
      App.customer.seatCustomers();
      UI.customer.seatCustomers();
      App.delayFunction(20, App.customer.leave);

      // cafeSeating = [];
    },

    customerServed: () => {
      // update the round object to show we have served a customer
      currentRound.customerServed();
      //console.log('customers served', currentRound.customers_served);

      if (currentRound.progress_bar === 0) {
        UI.round.initializeProgressBar();
      }

      // update the round object with the progress
      currentRound.progressMade(
        Math.round(
          (currentRound.customers_served /
            currentRound.settings.total_customers) *
            100
        ) + '%'
      );
      // update the UI with the progress
      UI.round.updateProgressBar();
    },

    won: () => {
      if (
        currentRound.customers_served === currentRound.settings.total_customers
      ) {
        currentRound.won = true;
        return true;
      } else {
        return false;
      }
    },
  },

  customer: {
    // customer logic
    getImageURL: (customer) => {
      return `images/customers/${customer}.png`;
    },
    createCustomers: () => {
      let id = 1;

      // get randomized array of customer names
      const customers = App.shuffleArray(customerNames);
      customers.splice(
        currentRound.settings.total_customers,
        customers.length - currentRound.settings.total_customers
      );

      // create customer objects and append them to the cafe customer list
      for (nextCustomer of customers) {
        let cafeCustomer = new Customer(
          id,
          nextCustomer,
          App.customer.getImageURL(nextCustomer)
        );
        //console.log(item);
        cafeCustomers.push(cafeCustomer);
        id++;
      }

      // customerLog = cafeCustomers.slice(0);

      // console.log('customer line up created', customerLog);
    },
    seatEmpty: () => {
      console.log('cafe seating', cafeSeating.length);
      return cafeSeating.length < 3 ? true : false;
    },
    seatCustomers: () => {
      let customerCount = cafeCustomers.length;
      // const

      for (let c = 0; c < customerCount; c++) {
        // get customer
        let customer = cafeCustomers[0];

        // if a seat is empty, add customer to cafe seating
        if (App.customer.seatEmpty()) {
          console.log(`seating customer #${customer.id}`);
          cafeSeating.push(customer);
          cafeCustomers.splice(0, 1);
          console.log('cafe seating', cafeSeating);
          console.log('cafe customers', cafeCustomers);
        }
      }
    },

    leave: () => {
      //let id = 1;
      cafeSeating.forEach((customer) => {
        // customer leaves cafe
        App.delayFunction(2 * customer.seat, UI.customer.leave, customer.seat);
      });
    },
  },

  order: {
    // order logic
  },

  kitchen: {
    // kitchen logic
    emptyPot: (food_item, pot) => {
      UI.food.reset(food_item); //, pot.label.toLowerCase()
      UI.pot.reset(pot);
    },
    setup: () => {
      // KITCHEN (FOOD / POTS)
      App.food.createMenu();
      App.pot.addToKitchen();

      UI.pot.addToKitchen();
      UI.food.addToPots();
    },
  },

  food: {
    // food logic
    getImageURL: (food) => {
      return `images/food/${food}.png`;
    },
    createMenu: () => {
      let id = 1;

      // get randomized array of food item names
      const foodItems = App.shuffleArray(foodItemNames);

      // create FoodItem objects and append them to the menu array
      for (foodItem of foodItems) {
        let item = new FoodItem(id, foodItem, App.food.getImageURL(foodItem));
        //console.log(item);
        menu.push(item);
        id++;
      }

      console.log('menu created', menu);
    },

    cookFoodItem: (foodItem, currentPot) => {
      // cook food item
      UI.pot.toggleLabelVisibility(currentPot); // hidden
      UI.food.cook(foodItem);
      App.delayFunction(8, UI.food.ready, foodItem);

      // UI.food.ready(foodItem);
      App.delayFunction(7, UI.pot.ready, currentPot);
      // UI.pot.ready(currentPot);
      App.delayFunction(8, UI.pot.toggleLabelVisibility, currentPot);
      // UI.pot.toggleLabelVisibility(currentPot); // visible
    },

    startExpiration: (foodItem, currentPot) => {
      App.delayFunction(20, UI.pot.spoiled, currentPot);
      App.delayFunction(20, UI.food.expired, foodItem);
    },
  },

  pot: {
    addToKitchen: () => {
      // create array of pot objects with food in them and add to kitchen array
      for (let p = 1; p < 9; p++) {
        let pot = new Pot(p, menu[p - 1]);
        kitchen.push(pot);
        //console.log(pot);
      }
      console.log('pots created and added to kitchen:', kitchen);
    },
  },
};

// jQuery onLoad
$(() => {
  // TODO: ADD GAME LOGIC
  App.game.start();

  // console.log('cafe chozen is open for business!');
  // currentRound = App.round.create();

  // let roundsToPlay = Math.ceil(currentRound.settings.total_customers / 3);
  // console.log('round', currentRound);

  // App.customer.createCustomers();

  // for (let i = 1; i <= roundsToPlay; i++) {
  //   // play two rounds
  //   App.delayFunction(i === 1 ? 2 : 40, App.round.start);
  //   // add order function here
  // }

  // // ROUND ONE
  // //App.delayFunction(60, App.round.two);

  // // ORDER

  // // KITCHEN (FOOD / POTS)
  // App.kitchen.setup();

  //App.secondsTimer(5);
});
