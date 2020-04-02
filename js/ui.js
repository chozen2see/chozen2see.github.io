const UI = {
  // addTextToDiv: () => {},
  // changeImgSize: () => {}
  game: {},
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
    updateInterface: (food_item, classToRemove) => {
      // find food item div in dom, remove current class, and add new class
      $(`#food-item-${food_item.id}`)
        .removeClass(classToRemove)
        .addClass(food_item.status.toLowerCase());
    },

    cook: food_item => {
      // set food item status to cooking
      food_item.cook();
      UI.food.updateInterface(food_item, 'raw');
    },
    ready: food_item => {
      // set food item status to cooked
      food_item.ready();

      UI.food.updateInterface(food_item, 'cooking');
    },
    expired: food_item => {
      // set food item status to expired
      food_item.expired();
      UI.food.updateInterface(food_item, 'cooked');
    },
    reset: food_item => {
      //, reason = 'cooked'
      // reset food item status to raw
      let reason = food_item.status.toLocaleLowerCase();
      food_item.reset();
      // food could have been 'cooked' or 'expired' -- need to TEST this
      UI.food.updateInterface(food_item, reason);
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

    updateInterface: (pot, draggable = 'false') => {
      // update the pot label in the DOM
      $(`#pot-label-button-${pot.id}`).text(pot.label);

      // make the pot in the DOM draggable?
      $(`#pot-${pot.id}`).attr('draggable', draggable);
    },

    ready: pot => {
      // pot is ready to serve.

      // set the label
      pot.ready();

      UI.pot.updateInterface(pot, 'true');
    },

    spoiled: pot => {
      pot.spoiled();
      UI.pot.updateInterface(pot);
    },

    reset: pot => {
      pot.reset();
      UI.pot.updateInterface(pot);
      //console.log('resetting pot UI', pot);
    }
  }
};
