import { useCart } from "../../contexts/CartContext/CartContext";
import CartItem from "../CartItem";
import "./style.css"


// function getCartTotal(item) {
//     return item.price * item.quantity, 0;
// }

export default function Cart(props) {
    // const { state: { cartItems=[]} } = useCart();
    const cartItems=[]
    console.log(cartItems);

    const { show } = props;
    return (<>
        <div className="wrapper">
            <nav id="sidebar"
                className={show ? "active" : ""}
            >
                <div className="sidebar-header">
                    <h3>Cart Products</h3>
                </div>
                <div className="row flex-column">
                    <div className="col shopping__cart__header">
                        <h2 className="h3 mt-2">Shopping Cart</h2>
                        <hr className="mb-3" />
                    </div>
                    {cartItems.length > 0 ? (
                        cartItems.map((item,index) => (
                            <CartItem
                                key={index}
                                {...item}
                            />
                        ))
                    ) : (
                    <div className="col mb-4">
                        <h4>Your cart is empty</h4>
                    </div>
                    )}
                    <div className="col shopping__cart__footer">
                        <div className="row row-cols-1 flex-column">
                            <div className="col">
                                <div className="d-flex justify-content-between">
                                    <h4 className="h5">Total</h4>
                                    <h4>
                                        {/* <strong>{getCartTotal(cartItems)}€</strong> */}
                                    </h4>
                                </div>
                                <hr />
                            </div>
                            <div className="col">
                                <button className="btn btn-success">Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </>
    );
}
