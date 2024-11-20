// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import productsData from './assets/products.json';

const initialState = {
  products: productsData.products.map(product => ({ ...product, quantity: 1 })),
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    calculateTotals: (state) => {
      state.totalQuantity = state.products.reduce((sum, product) => sum + product.quantity, 0);
      state.totalAmount = state.products.reduce((sum, product) => sum + (product.price * product.quantity), 0).toFixed(2);
    },
    updateQuantity: (state, action) => {
      const { id, amount } = action.payload;
      const product = state.products.find(product => product.id === id);
      if (product) {
        const newQuantity = product.quantity + amount;
        product.quantity = Math.max(newQuantity, 1); // Ensure quantity doesn't drop below 1
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
  },
});

export const { calculateTotals, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
