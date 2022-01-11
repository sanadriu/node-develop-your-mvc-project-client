
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchProduct } from "../../hooks";
// function buildSelectOptions(unitsInStock) {
//     return Array.from({ length: unitsInStock }, (_value, index) => {
//         const currentIndex = index + 1;
//         return (
//             <option key={currentIndex} value={currentIndex}>
//                 {currentIndex}
//             </option>
//         );
//     });
// }

export default function CartItem(props) {
    const {title}=props
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
                                    {/* <strong>{price}€</strong> */}
                                    <strong>50€</strong>

                                </p>
                            </div>
                            <div className="col mt-auto">
                                <div className="row">
                                    <div className="col col-6 col-lg-4">
                                        <select
                                            className="custom-select"
                                        // onChange={onHandleChange}
                                        // onBlur={onHandleChange}
                                        // value={quantity}
                                        >
                                            {/* {buildSelectOptions(stock)} */}
                                            10
                                        </select>
                                    </div>
                                    <div className="col col-6 col-lg-8">
                                        {/* <button onClick={onHandleRemove}>Remove</button> */}
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
