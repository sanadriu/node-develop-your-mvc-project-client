
import { useCart } from "../../contexts/CartContext/CartContext";
export default function CartItem(props) {

    const { title, price, stock,_id } = props

    const {addItem,removeItem } = useCart()
    
    return (
        <div className="col">
            <div className="row flex-column"></div>
            <div className="col">
                <div className="row">
                    <div className="col-12 col-xl-8">
                        <div className="row flex-column">
                            <div className="col">
                                <h4 className="h5">
                                    <strong>{title}</strong>
                                </h4>
                            </div>
                            <div className="col">
                                <p>
                                    <strong>{price}€</strong>
                                </p>
                            </div>
                            <div className="col mt-auto">
                                <div className="row">
                                <div className="col col-6 col-lg-8">
                                        <button  className="btn btn-success" onClick={()=>addItem(_id)}>AddItem</button>
                                    </div>
                                    <div className="col col-6 col-lg-8">
                                        <button  className="btn btn-danger" onClick={()=>removeItem(_id)}>RemoveItem</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <hr />
            </div>
        </div>
    );
}
