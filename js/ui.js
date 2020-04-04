const UI = {
  // addTextToDiv: () => {},
  // changeImgSize: () => {}
  round: {
    updateProgressBar: () => {
      $('#progress-bar').css('width', currentRound.progress_bar);
      //console.log('progress bar', currentRound.progress_bar);
    },

    initializeProgressBar: () => {
      $('#progress-bar').removeClass('no-progress');
      $('#progress-bar').addClass('w3-pink');
    },

    resetProgressBar: () => {
      $('#progress-bar').removeClass('w3-pink');
      $('#progress-bar').addClass('no-progress');
    },

    updateTimer: () => {
      if (currentRound.timer >= 0) {
        var minutes = Math.floor(currentRound.timer / 60000);
        var seconds = ((currentRound.timer % 60000) / 1000).toFixed(0);

        var timer = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        $('#timer').text(timer);
      } else {
        // game over
        clearTimeout(currentRoundTimer);
        alert('game over');
      }

      currentRound.decrementTimer();
    },
  },

  customer: {
    seatCustomers: () => {
      let id = 1;
      cafeSeating.forEach((customer) => {
        customer.seated(id);
        // customerLog[customer.id - 1].seated(id);

        console.log(customer.seat);

        // grab customer div
        const $customerDiv = $(`.customer-${id}`);
        // console.log($customerDiv);

        // add keyframe div
        const $keyframe = $('<div>').addClass(`customer-approach-${id}`);
        $keyframe.appendTo($customerDiv);

        // add image
        const $img = $('<img>').addClass(`customer-img-${id}`).attr({
          src: customer.image,
          alt: customer.name,
          draggable: 'false',
        });
        $img.appendTo($keyframe);
        id++;
      });
    },
    leave: (id) => {
      const $customerDiv = $(`.customer-approach-${id}`);
      $customerDiv.removeClass(`customer-approach-${id}`);
      $customerDiv.addClass(`customer-leave-${id}`);

      App.delayFunction(10, () => {
        $customerDiv.remove();
      });

      // remove customer from seating and add to customer Log for stats

      customerLog.push(cafeSeating.splice(0, 1));
      console.log('cafe seating', cafeSeating);
      console.log(`customer #${id} has left`);

      // increase stats for round if customer order was completed successfully
      App.round.customerServed();

      id === 3 ? console.log(customerLog) : undefined;
      //console.log('customers served', currentRound.customers_served);
    },
  },
  food: {
    addToPots: () => {
      menu.forEach((foodItem) => {
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
            draggable: 'false', // do not allow the food image to drag separately. must drap pot
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

    cook: (food_item) => {
      // set food item status to cooking
      food_item.cook();
      UI.food.updateInterface(food_item, 'raw');
    },
    ready: (food_item) => {
      // set food item status to cooked
      food_item.ready();

      UI.food.updateInterface(food_item, 'cooking');
    },
    expired: (food_item) => {
      // set food item status to expired
      food_item.expired();
      UI.food.updateInterface(food_item, 'cooked');
    },
    reset: (food_item) => {
      //, reason = 'cooked'
      // reset food item status to raw
      let reason = food_item.status.toLocaleLowerCase();
      food_item.reset();
      // food could have been 'cooked' or 'expired' -- need to TEST this
      UI.food.updateInterface(food_item, reason);
    },
  },

  pot: {
    addToKitchen: () => {
      const $kitchenContainer = $('.kitchen-container');
      kitchen.forEach((kitchenItem) => {
        //get id
        let id = kitchenItem.id;

        // create pot div
        const $potDiv = $('<div>')
          .addClass('pot ui-draggable')
          .attr({
            id: `pot-${id}`, //,draggable: 'false'
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

    toggleLabelVisibility: (pot) => {
      $(`#pot-label-button-${pot.id}`).toggleClass('hidden');
    },

    updateInterface: (pot, draggable = 'false') => {
      // update the pot label in the DOM
      $(`#pot-label-button-${pot.id}`).text(pot.label);
      // console.log(draggable);
      // make the pot in the DOM draggable?
      // $(`#pot-${pot.id}`).attr('draggable', draggable);
      if (draggable === 'true') {
        $(`#pot-${pot.id}`).draggable({
          containment: '.container',
          cursor: 'grab',
          opacity: 0.8,
          revert: true,
          scope: pot.food_item.name,
          zIndex: 100,
        });
        $(`#pot-${pot.id}`).draggable('enable');
      } else {
        $(`#pot-${pot.id}`).draggable('disable');
      }

      // $(`#pot-${pot.id}`).attr('draggable', draggable);
    },

    ready: (pot) => {
      // pot is ready to serve.

      // set the label
      pot.ready();

      UI.pot.updateInterface(pot, 'true');
    },

    spoiled: (pot) => {
      pot.spoiled();
      UI.pot.updateInterface(pot);
    },

    reset: (pot) => {
      pot.reset();
      UI.pot.updateInterface(pot);
      //console.log('resetting pot UI', pot);
    },
  },
};
