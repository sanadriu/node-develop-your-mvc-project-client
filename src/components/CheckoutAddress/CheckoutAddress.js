export default function CheckoutAddress() {
  return (
    <form>
      <label htmlFor="address" className="control-label">
        <h5 className="d-block my-2 fw-normal">Address*</h5>
      </label>
      <div className="input-group mb-3">
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Your address..."
          // value=
          // onChange=
          // onBlur=
          // autoFocus
        />
      </div>
      <label htmlFor="city" className="control-label">
        <h5 className="d-block my-1 fw-normal">City*</h5>
      </label>
      <div className="input-group mb-3 has-validation">
        <input type="text" name="city" id="city" placeholder="Your city..." />
      </div>
      <label htmlFor="zipCode" className="control-label">
        <h5 className="d-block my-2 fw-normal">Zip Code*</h5>
      </label>
      <div className="input-group mb-3">
        <input
          type="text"
          name="zipCode"
          id="zipCode"
          placeholder="City zip code"
        />
      </div>
      <label htmlFor="country" className="control-label mb-5">
        <h5 className="d-block my-2 fw-normal">Country*</h5>
        <select id="country" name="country" class="form-control">
          <option value="Default">-Select-</option>
          <option value="Spain">Spain</option>
          <option value="United states">United States</option>
          <option value="Mexico">Mexico</option>
        </select>
      </label>
      <div className="d-flex my-2 gap-2">
        <button
          type="button"
          className="btn btn-outline-secondary"
          // disabled={backButtonDisabled}
          // onClick={goBack}
        >
          Go back
        </button>

        <button
          type="submit"
          className="btn btn-secondary"
          // disabled={nextButtonDisabled}
        >
          Continue
        </button>
      </div>
    </form>
  );
}
