const EventHandlers = {
  pot: {
    onClick: e => {
      let id = e.currentTarget.id.slice(4, 5);
      const currentPot = kitchen[id - 1];
      const foodItem = menu[id - 1];
      switch (currentPot.label) {
        case 'COOK':
          if (foodItem.status === 'RAW') {
            App.food.cookFoodItem(foodItem, currentPot);
            App.food.startExpiration(foodItem, currentPot);
          }
          break;
        // case 'SERVE':
        //   console.log('serve');
        //   break;
        case 'DISCARD':
          App.kitchen.emptyPot(foodItem, currentPot);
          break;
        default:
          console.log('default');
      }

      //console.log(currentPot, foodItem, id);
    }
  }

  // onClickDoThis: () => {}
};
