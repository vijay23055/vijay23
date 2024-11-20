import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, calculateTotals } from './Cartslice';
import { Provider } from 'react-redux';
import store from './Store';
import 'bootstrap/dist/css/bootstrap.min.css'; 

// ShoppingCart Component
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { products, totalQuantity, totalAmount } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch]);

  return (
    <>
      <div className="row mb-4">
        <div className="col-md-6">
          <h4>Total Items: {totalQuantity}</h4>
        </div>
        <div className="col-md-6 text-md-end">
          <h4>Total Amount: ₹{totalAmount}</h4>
        </div>
      </div>

      <div className="row">
        {products.map(product => (
          <div className="col-md-6 col-lg-4 mb-4" key={product.id}>
            <div className="card small-card h-100">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-primary">₹{product.price}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button 
                      className="btn btn-outline-secondary" 
                      onClick={() => dispatch(updateQuantity({ id: product.id, amount: -1 }))}>-</button>
                    <span className="mx-3">{product.quantity}</span>
                    <button 
                      className="btn btn-outline-secondary" 
                      onClick={() => dispatch(updateQuantity({ id: product.id, amount: 1 }))}>+</button>
                  </div>
                  <p className="text-muted mb-0">Total: ₹{(product.price * product.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// App Component
function App() {
  return (
    <Provider store={store}>
      <div className="container mt-5">
        <h2 className="text-center text-primary mb-4">Shopping Cart</h2>
        <ShoppingCart />
      </div>
    </Provider>
  );
}

export default App;
