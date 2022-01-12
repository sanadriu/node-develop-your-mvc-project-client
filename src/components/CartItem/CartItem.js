
export default function CartItem(props) {
    const { title, price, stock } = props

    function buildSelectOptions(stock) {
        return Array.from({ length: stock }, (_value, index) => {
            const currentIndex = index + 1;
            return (
                <option key={currentIndex} value={currentIndex}>
                    {currentIndex}
                </option>
            );
        });
    }
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
                                    <div className="col col-6 col-lg-4">
                                        <select
                                            className="custom-select"
                                        // onChange={onHandleChange}
                                        // onBlur={onHandleChange}
                                        // value={quantity}
                                        >
                                            {buildSelectOptions(stock)}
                                        </select>
                                    </div>
                                    <div className="col col-6 col-lg-8">
                                        <button onClick={console.log("need add functionality remove")}>Remove</button>
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
