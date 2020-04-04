const EventHandlers = {
  order: {
    onDrop: (e, ui) => {
      let $orderDiv = $(e.target);
      let $potDiv = ui.draggable;
      let $orderDetails = $orderDiv.data('data');
      let $potContents = $potDiv.data('data');

      let $orderID = $orderDiv.attr('id').slice(9, 10);
      let $potID = $potDiv.attr('id').slice(4, 5);
      let $order = placematLog[$orderID - 1];
      let $pot = kitchen[$potID - 1];

      console.log($orderID);
      console.log($potID);
      console.log('order', $order);
      console.log('pot', $pot.food_item);

      if ($orderDetails === $potContents) {
        console.log('order and pot match');
        UI.order.filled($order);
        // increase stats for round if customer order was completed successfully
        App.round.customerServed();
        //App.delayFunction(2, UI.order.clear($order.seat));
      }

      //UI.order.filled(order);
    },
  },
  pot: {
    onClick: (e) => {
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
          console.log('pot label default');
      }

      //console.log(currentPot, foodItem, id);
    },
  },

  // onClickDoThis: () => {}
};
