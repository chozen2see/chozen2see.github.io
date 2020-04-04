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

    updateInterface: () => {
      $('#round').text(`ROUND ${currentRound.number}`);
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
        if (!gameAlreadyOver) {
          $('#round').html(
            '<a href="game.html" class="game-over">GAME OVER</a>'
          );
          alert('you lost - time ran out!');
          gameAlreadyOver = true;
        }
      }

      currentRound.decrementTimer();
    },
  },

  customer: {
    seatCustomers: () => {
      let id = 1;
      cafeSeating.forEach((customer) => {
        customer.seated(id);

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

      // $(`#placemat-${id}`).droppable('disable');
      // const $orderDiv = $(`.order-place-${id}`);
      // $orderDiv.remove();

      // App.delayFunction(2, () => {
      UI.order.clear(id);
      // });

      App.delayFunction(10, () => {
        $customerDiv.remove();
      });

      // remove customer from seating and add to customer Log for stats

      customerLog.push(cafeSeating.splice(0, 1));
      //console.log('cafe seating', cafeSeating);
      //console.log(`customer #${id} has left`);

      // increase stats for round if customer order was completed successfully
      //App.round.customerServed();

      App.delayFunction(2, () => {
        if (
          // customersAll / roundsToPlay ===
          //   currentRound.settings.total_customers / roundsToPlay &&
          currentRound.customers_served !==
          currentRound.settings.total_customers / roundsToPlay
        ) {
          clearTimeout(currentRoundTimer);
          if (!gameAlreadyOver) {
            // alert('stopped');
            $('#round').html(
              '<a href="game.html" class="game-over">GAME OVER</a>'
            );
            alert('you lost - customers left!');
            gameAlreadyOver = true;

            // if (currentRound.number < roundsToPlay) {
            //   gameAlreadyOver = false;

            //   //currentRound.customers_served = 0;
            //   // UI.round.resetProgressBar();
            //   // newRound.initializeTimer();
            // }
          }
        }
      });
      //console.log('customers served', currentRound.customers_served);
    },
  },

  order: {
    placeOrders: () => {
      let id = 1;
      placemats.forEach((order) => {
        // order.place(id);
        UI.order.placed(id, order);

        // grab placemat div
        const $placematDiv = $(`.placemat-${id}`).data(
          'data',
          order.food_item.name
        );

        // add order div
        const $orderDiv = $('<div>').addClass(`order-place-${id}`);
        $orderDiv.appendTo($placematDiv);

        // add image
        const $img = $('<img>').addClass(`order-img-${id}`).attr({
          src: order.food_item.image,
          alt: order.food_item.name,
          draggable: 'false',
        });
        $img.appendTo($orderDiv);
        id++;
      });
    },

    placed: (id, order) => {
      order.place(id);
      UI.order.updateInterface(order, true);
    },

    updateInterface: (order, droppable = false) => {
      //console.log('updateInterface', order);
      const $placematDiv = $(`#placemat-${order.seat}`);
      $placematDiv.droppable();

      if (droppable) {
        $placematDiv.droppable({
          //data: order.food_item.name,
          scope: order.food_item.name,
          tolerance: 'touch',
          drop: EventHandlers.order.onDrop,
        });
        $placematDiv.droppable('enable');
        // $placematDiv.on('drop', EventHandlers.order.onDrop);
      } else {
        //$placematDiv
        $(`#placemat-${order.seat}`).droppable('disable');
      }
    },

    filled: (order) => {
      if (order !== undefined) {
        order.fill();
        $(`#placemat-${order.seat}`).css('background-color', placemat_green);
      }
    },

    cancelled: (order) => {
      order.cancelled();
      $(`#placemat-${order.seat}`).css('background-color', placemat_red);
    },

    clear: (id) => {
      //console.log('order seat', id);
      const $placematDiv = $(`#placemat-${id}`);
      // $placematDiv.css('background-color', placemat_red);

      $placematDiv.droppable('disable');
      $placematDiv.css('background-color', placemat_yellow);

      const $orderDiv = $(`.order-place-${id}`);

      // App.delayFunction(10, () => {
      $orderDiv.remove();
      // });

      // remove placemat from seating and add to placemat Log for stats

      placematLog.push(placemats.splice(0, 1));
      // $placematDiv.css('background-color', placemat_yellow);
    },
  },

  food: {
    addToPots: () => {
      menu.forEach((foodItem) => {
        //get id
        let id = foodItem.id;

        // get pot
        const $potDiv = $(`#pot-${id}`);
        $potDiv.data('data', foodItem.name);

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
            data: foodItem.name,
            draggable: 'false', // do not allow the food image to drag separately. must drap pot
          });

        // add food image to food item div
        $foodImage.appendTo($foodItemDiv);

        // add food item div to pot
        $foodItemDiv.appendTo($potDiv);
      });
      //console.log('ui updated pots with food', kitchen);
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
    reset: (food_item, orderFilled = false) => {
      //, reason = 'cooked'
      // reset food item status to raw
      let reason = food_item.status.toLocaleLowerCase();
      //console.log('food reason', reason);

      // food could have been 'cooked' or 'expired' -- need to TEST this
      if (orderFilled === false) {
        food_item.reset();
        UI.food.updateInterface(food_item, reason);
      }
      //  else {
      //   food_item.expired();
      // }
      // UI.food.updateInterface(food_item, reason);
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

      //console.log('ui updated with pots in the kitchen', kitchen);
    },

    toggleLabelVisibility: (pot) => {
      $(`#pot-label-button-${pot.id}`).toggleClass('hidden');
    },

    updateInterface: (pot, draggable = 'false') => {
      // update the pot label in the DOM
      $(`#pot-label-button-${pot.id}`).text(pot.label);

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
