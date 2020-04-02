const UI = {
  // addTextToDiv: () => {},
  // changeImgSize: () => {}
  food: {
    populateContainer: menu => {
      const $foodContainer = $('food-container');
      menu.forEach(menuItem => {
        console.log(menuItem.id);
      });
      console.log('ui updated with menu', menu);
    }
  }
};
