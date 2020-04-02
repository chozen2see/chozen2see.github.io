const UI = {
  // addTextToDiv: () => {},
  // changeImgSize: () => {}
  food: {
    addToPots: () => {
      menu.forEach(foodItem => {
        //get id
        let id = foodItem.id;

        // get pot
        const $potDiv = $(`#pot-${id}`);

        // create food item div
        const $foodItemDiv = $('<div>')
          .addClass('food-item raw')
          .attr('id', `food-item-${id}`);

        // create food image
        const $foodImage = $('<img>')
          .addClass('food-image')
          .attr({
            src: foodItem.image,
            alt: `image of ${foodItem.name}`,
            id: `food-image-${id}`,
            draggable: 'false'
          });

        // add food image to food item div
        $foodImage.appendTo($foodItemDiv);

        // add food item div to pot
        $foodItemDiv.appendTo($potDiv);
      });
      console.log('ui updated pots with food', kitchen);
    },

    cook: food_item => {
      // set food item status to cooking
      food_item.cook();

      // find food item div in dom, remove current class, and add cooking class
      $(`#food-item-${food_item.id}`)
        .removeClass('raw')
        .addClass(food_item.status.toLowerCase());
    },
    ready: food_item => {
      // set food item status to cooked
      food_item.ready();

      // find food item div in dom, remove current class, and add cooked class
      $(`#food-item-${food_item.id}`)
        .removeClass('cooking')
        .addClass(food_item.status.toLowerCase());
    }
  },

  pot: {
    addToKitchen: () => {
      const $kitchenContainer = $('.kitchen-container');
      kitchen.forEach(kitchenItem => {
        //get id
        let id = kitchenItem.id;

        // create pot div
        const $potDiv = $('<div>')
          .addClass('pot')
          .attr({
            id: `pot-${id}`,
            draggable: 'false'
          });

        // create pot label
        const $potLabelP = $('<p>')
          .addClass('pot-label')
          .attr('id', `pot-label-button-${id}`)
          .text(kitchenItem.label);

        // add pot label to pot div
        $potLabelP.appendTo($potDiv);

        // add pot div to kitchen container
        $potDiv.appendTo($kitchenContainer);

        $potDiv.on('click', EventHandlers.pot.onClick);
      });

      console.log('ui updated with pots in the kitchen', kitchen);
    },
    toggleLabelVisibility: pot => {
      $(`#pot-label-button-${pot.id}`).toggleClass('hidden');
    },
    ready: pot => {
      // pot is ready to serve.

      // set the label
      pot.ready();

      // update the pot label in the DOM
      $(`#pot-label-button-${pot.id}`).text(pot.label);

      // make the pot in the DOM draggable
      $(`#pot-${pot.id}`).attr('draggable', 'true');
    }
  }
};
