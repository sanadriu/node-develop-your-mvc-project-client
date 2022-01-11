import React from "react";
import CartItem from "../CartItem";



    // function getCartTotal(cart) {
    //     return cart.reduce((accum, item) => {
    //         return accum + item.price * item.quantity;
    //     }, 0);
    // }

export default function Cart(props) {
        // const {cartItems}=props
        return (
            <aside >
            {/* <aside {...props}> */}
                
                <div className="row flex-column">
                    <div className="col shopping__cart__header">
                        <h2 className="h3 mt-2">Shopping Cart</h2>
                        <hr className="mb-3" />
                    </div>
                    {/* {cartItems.length > 0 ? (
                        cartItems.map((item) => ( */}
                            <CartItem
                                // key={item.id}
                                // id={item.id}
                                // title={item.title}
                                // price={item.price}
                                // img={item.img}
                                // quantity={item.quantity}
                                // unitsInStock={item.unitsInStock}
                                // handleRemove={handleRemove}
                                // handleChange={handleChange}
                            />
                        {/* ))
                    ) : (
                        <div className="col mb-4">
                            <h4>Your cart is empty</h4>
                        </div>
                    )} */}
                    <div className="col shopping__cart__footer">
                        <div className="row row-cols-1 flex-column">
                            <div className="col">
                                <div className="d-flex justify-content-between">
                                    <h4 className="h5">Total</h4>
                                    <h4>
                                        {/* <strong>{getCartTotal(cartItems)}€</strong> */}
                                        <strong>50€</strong> 
                                    </h4>
                                </div>
                                <hr />
                            </div>
                            <div className="col">
                                <button>Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
