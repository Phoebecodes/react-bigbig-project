import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, amount, product, color } = action.payload;
    const tempItem = state.cart.find((i) => i.id === id + color);
    console.log(tempItem);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        amount,
        color,
        name: product.name,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const newCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: newCart };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const newCart = state.cart.map((item) => {
      if (item.id === action.payload.id) {
        if (action.payload.type === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        } else {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      } else {
        return item;
      }
    });
    return { ...state, cart: newCart };
  }
  if (action.type === COUNT_CART_TOTALS) {
    // const totleItems = state.cart.reduce((total, item) => {
    //   return (total += item.amount);
    // }, 0);
    // const totleAmount = state.cart.reduce((total, item) => {
    //   let itemTotle = item.amount * item.price;
    //   return (total += itemTotle);
    // }, 0);

    const { totleItems, totleAmount } = state.cart.reduce(
      (total, item) => {
        total.totleItems += item.amount;
        let itemTotle = item.amount * item.price;
        total.totleAmount += itemTotle;
        return total;
      },
      { totleItems: 0, totleAmount: 0 }
    );
    return { ...state, total_amount: totleAmount, total_items: totleItems };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
