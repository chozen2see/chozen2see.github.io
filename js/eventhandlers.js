const EventHandlers = {
  pot: {
    onClick: e => {
      let id = e.currentTarget.id.slice(4, 5);
      const currentPot = kitchen[id - 1];
      const foodItem = menu[id - 1];
      switch (currentPot.label) {
        case 'COOK':
          // cook food item
          UI.pot.toggleLabelVisibility(currentPot); // hidden
          UI.food.cook(foodItem);

          // need to wait food item to finish cooking -- App.timer(ms)??
          App.timer(3);
          UI.food.ready(foodItem);

          UI.pot.ready(currentPot);
          UI.pot.toggleLabelVisibility(currentPot); // visible

          console.log('pot on click ran');
          break;
        case 'SERVE':
          console.log('serve');
          break;
        case 'DISCARD':
          console.log('discard');
          break;
        default:
          console.log('default');
      }

      console.log(currentPot, foodItem, id);
    }
  }
  // onClickDoThis: () => {}
};
