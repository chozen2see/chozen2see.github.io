$(() => {
  // TODO: ADD GAME LOGIC
  console.log('cafe chozen is open for business!');
});

// TODO #1: CUSTOMER PROGRESS BAR - INCREASES WHEN CUSTOMER IS SERVED CORRECT FOOD ITEM IN ALOTTED TIME. WHEN ALL CUSTOMERS SERVED, LEVEL IS OVER (IF TIME STILL REMAINING ON TIMER)
// TODO #2: TIMER - EACH LEVEL HAS SET TIME TO COMPLETE. STARTS WHEN GAME STARTS. WHEN IT RUNS OUT LEVEL IS OVER.

// TODO #3: A USER SHOULD BE ABLE TO SELECT THE GAME MODE (SELECT GAME MODE FUNCTION)
// TODO #4: A USER SHOULD BE ABLE TO SEE A MODAL THAT INDICATES THE ROUND IS STARTING ALONG WITH BRIEF INSTRUCTIONS.
// TODO #5: A USER SHOULD BE ABLE TO DETERMINE HOW MANY CUSTOMERS WILL ENTER THE RESTAURANT DURING A ROUND (CUSTOMER OBJECTS)
// TODO #6: A USER SHOULD BE ABLE TO SEE HOW MANY CUSTOMERS THEY HAVE SERVED CORRECTLY (CUSTOMER PROGRESS BAR) OUT OF THE TOTAL CUSTOMERS AVAILABLE IN THE ROUND
// TODO #7: A USER SHOULD BE ABLE TO SEE HOW MUCH TIME IS REMAINING ONCE THE ROUND STARTS (TIMER: ROUND)
// TODO #8: A USER SHOULD BE ABLE TO WATCH A CUSTOMER ENTER THE RESTAURANT AND APPROACH THE COUNTER (ENTER RESTAURANT FUNCTION).
// TODO #9: A USER SHOULD BE ABLE TO SEE THE CUSTOMER PLACE AN ORDER (ORDER FUNCTION)
// TODO #10: A USER SHOULD BE ABLE TO SEE HOW MUCH TIME REMAINS TO SERVE THE CUSTOMER (TIMER: CUSTOMER SERVICE)
// TODO #11: A USER SHOULD BE ABLE TO DETERMINE WHEN THE CUSTOMER IS GETTING ANGRY (COLOR OF ORDER GRADUALLY CHANGES FROM ORANGE TO RED OVER GIVEN TIME (30 SECONDS))
// TODO #12: A USER SHOULD BE ABLE TO DETERMINE IF AN ITEM NEEDS TO BE COOKED (FOOD ITEM: RAW STATE)
// TODO #13: A USER SHOULD BE ABLE TO COOK A FOOD ITEM  (COOK FUNCTION)
// TODO #14: A USER SHOULD BE ABLE TO DETERMINE WHEN A FOOD ITEM HAS BEEN COOKED AND IS READY TO SERVE (FOOD ITEM: READY STATE)
// TODO #15: A USER SHOULD BE ABLE TO SERVE THE FOOD ITEM BY DRAGGING THE ITEM ON TOP OF THE CUSTOMER'S ORDER (SERVE FUNCTION)
// TODO #16: A USER SHOULD BE ABLE TO DETERMINE IF THE FOOD ITEM SERVED MATCHES THE ORDER (CHECK ORDER FUNCTION) (COLOR OF ORDER TURNS GREEN. MAYBE A SOUND?? THANK YOU!)
// TODO #17: A USER SHOULD BE ABLE TO SEE THE CUSTOMERS PROGRESS BAR INCREASE IF THE FOOD ITEM SERVED MATCHES THE ORDER (INCREASE CUSTOMER PROGRESS BAR)
// TODO #18: A USER SHOULD BE ABLE TO RECEIVE A NOTIFICATION IF THE FOOD ITEM SERVED DOES NOT MATCH THE ORDER (INCORRECT ORDER FUNCTION - SHAKES ORDER - MAYBE SOUND - CUSTOMER LEAVES)
// TODO: A USER SHOULD BE ABLE TO WATCH A CUSTOMER LEAVE THE RESTAURANT (EXIT RESTAURANT FUNCTION)

// TODO #19: A USER SHOULD BE ABLE TO DETERMINE HOW THEY PERFORMED DURING THE ROUND (MODAL)
// TODO #20: A USER SHOULD BE ABLE TO PROCEED TO THE NEXT ROUND IF THEY WON THE CURRENT ROUND (MODAL BUTTON)
// TODO #21: A USER SHOULD BE ABLE TO START A NEW GAME (OR REPEAT THE ROUND???) IF THEY LOSS THE CURRENT ROUND (MODAL BUTTON)
// TODO #22: A USER SHOULD BE ABLE TO DETERMINE IF THEY BEAT THE GAME
// TODO #23: A USER SHOULD BE ABLE TO CLOSE THE BROSWER AND PRESERVE THE GAME STATE (SAVE GAME)

//-----> CUSTOMER / FOOD OBJECTS

// OBJECT #3: CUSTOMER (ID, NAME, IMAGE, SHIRT_COLOR, SEAT, [PATIENCE_LEVEL], ENTRY_POINT, EXIT_POINT, ORDER{})
// ---------------> GET(), SET(), SEAT(), PLACE_ORDER(SEAT), LEAVE()
// OBJECT #4: ORDER (ID, SEAT, STATUS(PLACED,FILLED,DISCARDED), FOOD_ITEM{})
// ---------------> GET(), SET(), UPDATE_STATUS(STATUS), GET_FOOD()
// OBJECT #6: POT (ID, LABEL[COOK, SERVE, DISCARD], FOOD_ITEM{})
// ---------------> GET(), SET(), UPDATE_LABEL(LABEL), GET_FOOD()
// OBJECT #5: FOOD_ITEM (ID, NAME, IMAGE, COST, [EXPIRATION_TIME], [COOK_TIME], STATUS[RAW,COOKING,COOKED,EXPIRED])
// ---------------> GET(), SET(), UPDATE_STATUS(STATUS)

//-----> GAME OBJECTS

// OBJECT #7: GAME (ID, STATE[NEW,SAVED], MODE[CUSTOMER,REVENUE], CUSTOMERS_SERVED, REVENUE, ROUND{})
// ---------------> GET(), SET(), UPDATE_STATE(STATE), UPDATE_MODE(MODE), INCREMENT_CUSTOMERS_SERVED(), INCREMENT_REVENUE(), UPDATE_ROUND()
// OBJECT #8: ROUND (ID, SCORE, CUSTOMERS_SERVED, REVENUE, WON?, SETTINGS{}, PROGRESS_BAR{}, TIMER{})
// ---------------> GET(), SET(), INCREMENT_SCORE(), INCREMENT_CUSTOMERS_SERVED(), INCREMENT_REVENUE()
// TODO: ? DO WE NEED TO ADD FUNCTIONS TO CREATE SETTINGS/ PROGRESS_BAR / TIMER?
// OBJECT #9: SETTINGS (ID, TOTAL_CUSTOMERS, TOTAL_REVENUE, TOTAL_TIME, DIFFICULTY[EASY,MEDIUM,HARD])
// ---------------> GET(), SET()
// OBJECT #1: PROGRESS_BAR (ID, NAME, PROGRESS, GOAL, PERCENT_COMPLETE, STATUS[INITIALIZED,COMPLETE])
// ---------------> GET(), SET(), INCREMENT(), INITIALIZE(GOAL), INCREMENT_PROGRESS(), INCREMENT_PERCENT_COMPLETE(), GOAL_REACHED()
// OBJECT #2: TIMER (ID, NAME, TIME, NOTIFICATION_TIME)
// ---------------> GET(), SET(), INCREMENT(), INITIALIZE(TIME), NOTIFY(), EXPIRE()
