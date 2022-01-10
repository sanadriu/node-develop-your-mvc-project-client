
export default function CheckoutCostumer() {
  return (
    <form>
      <label htmlFor="fullname" className="control-label">
        <p className="h4 d-block my-2 fw-normal ">Name*</p>
        <span className="d-block my-1 fw-light text-secondary">
          Of the person who is shopping
        </span>
      </label>
      <div className="input-group mb-4">
        <input
          type="text"
          name="fullname"
          id="fullname"
          placeholder="Your name..."
          autoFocus
        />
      </div>
      <label htmlFor="email" className="control-label">
        <p className="h4 d-block my-2 fw-normal">Email address*</p>
        <span className="d-block my-1 fw-light text-secondary">
          Where you will receive the confirmation email
        </span>
      </label>
      <div className="input-group mb-4">
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email address..."
        />
      </div>
      <label htmlFor="phoneNumber" className="control-label">
        <p className=" h4 d-block my-2 fw-normal">Phone number*</p>
        <span className="d-block my-1 fw-light text-secondary">
          A valid number to contact you
        </span>
      </label>
      <div className="input-group mb-5">
        <input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          maxLength="9"
          placeholder="Phone number..."
        />
      </div>
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
