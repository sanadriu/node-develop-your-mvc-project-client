export default function CheckoutPayment() {
  return (
    <>
      {/* {step !== 3 && <Redirect to={`/checkout`} />} */}
      <form>
        <h5 className="my-3">Choose your payment method:</h5>
        <div className="mb-3">
          <div className="row">
            <div className="col d-flex gap-2">
              <input
                type="radio"
                name="method"
                id="Credit-card"
                value="Credit-card"

              />
              <label for="Credit-card">Credit card</label>
            </div>
          </div>
          <div className="col d-flex gap-2">
            <input
              type="radio"
              name="method"
              id="Credit-card"
              value="Credit-card"
            />
            <label for="Credit-card">PayPal</label>
          </div>
        </div>
        <div className="d-flex my-2 gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
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

        {/* <h6 className="my-3">We accept the following debit/credit cards</h6>
				<div className="mb-3 has-validation">
					<div role="group" className="row my-3">
						{cardProviders.map(({ img }, index) => (
							<div key={index} className="col-2">
								<div className="border p-1 d-flex justify-content-center">
									<IconImg src={img} height={2.5} width={2.5} />
								</div>
							</div>
						))}
					</div>
					<div className="row">
						<div className="col-12 col-lg-6 order-2 order-lg-1 ">
							<label htmlFor="cardHolderName" className="control-label">
								<h6>Cardholder name*</h6>
							</label>
							<div className="input-group mb-3 has-validation">
								<input
									className={`form-control ${touched.cardHolderName && errors.cardHolderName && "is-invalid"} ${
										touched.cardHolderName && !errors.cardHolderName && "is-valid"
									}`}
									type="text"
									name="cardHolderName"
									id="cardHolderName"
									placeholder="Name..."
									value={values.cardHolderName}
									onChange={handleChange}
									onBlur={handleBlur}
									onFocus={(e) => setFocus("name")}
								/>
								{errors.cardHolderName && touched.cardHolderName && (
									<div className="invalid-feedback">{errors.cardHolderName}</div>
								)}
							</div>
							<label htmlFor="cardNumber" className="control-label">
								<h6>Card number*</h6>
							</label>
							<div className="input-group mb-3 has-validation">
								<input
									className={`form-control ${touched.cardNumber && errors.cardNumber && "is-invalid"} ${
										touched.cardNumber && !errors.cardNumber && "is-valid"
									}`}
									type="text"
									name="cardNumber"
									id="cardNumber"
									placeholder="0000 0000 0000 0000"
									maxLength="19"
									value={values.cardNumber}
									onChange={handleChange}
									onBlur={handleBlur}
									onFocus={(e) => setFocus("number")}
								/>
								{errors.cardNumber && touched.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
							</div>
						</div>
						<div className="col-12 col-lg-6 d-flex py-4 order-1 order-lg-2 align-items-center">
							<Cards
								number={values.cardNumber}
								name={values.cardHolderName}
								expiry={values.cardExpirationMonth + values.cardExpirationYear}
								cvc={values.cardCVV.replace(/./g, "*")}
								focused={focus}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-6 col-lg-4">
							<label htmlFor="cardExpirationMonth" className="control-label">
								<h6>Expiration month*</h6>
							</label>
							<div className="input-group mb-3 has-validation">
								<input
									className={`form-control ${
										touched.cardExpirationMonth && errors.cardExpirationMonth && "is-invalid"
									} ${touched.cardExpirationMonth && !errors.cardExpirationMonth && "is-valid"}`}
									type="text"
									name="cardExpirationMonth"
									id="cardExpirationMonth"
									placeholder="00"
									maxLength="2"
									value={values.cardExpirationMonth}
									onChange={handleChange}
									onBlur={handleBlur}
									onFocus={(e) => setFocus("expiry")}
								/>
								{errors.cardExpirationMonth && touched.cardExpirationMonth && (
									<div className="invalid-feedback">{errors.cardExpirationMonth}</div>
								)}
							</div>
						</div>
						<div className="col-6 col-lg-4">
							<label htmlFor="cardExpirationYear" className="control-label">
								<h6>Expiration year*</h6>
							</label>
							<div className="input-group mb-3 has-validation">
								<input
									className={`form-control ${touched.cardExpirationYear && errors.cardExpirationYear && "is-invalid"} ${
										touched.cardExpirationYear && !errors.cardExpirationYear && "is-valid"
									}`}
									type="text"
									name="cardExpirationYear"
									id="cardExpirationYear"
									placeholder="00"
									maxLength="2"
									value={values.cardExpirationYear}
									onChange={handleChange}
									onBlur={handleBlur}
									onFocus={(e) => setFocus("expiry")}
								/>
								{errors.cardExpirationYear && touched.cardExpirationYear && (
									<div className="invalid-feedback">{errors.cardExpirationYear}</div>
								)}
							</div>
						</div>
						<div className="col-12 col-lg-4">
							<label htmlFor="cardCVV" className="control-label">
								<h6>CVV*</h6>
							</label>
							<div className="input-group mb-3 has-validation">
								<input
									className={`form-control ${touched.cardCVV && errors.cardCVV && "is-invalid"} ${
										touched.cardCVV && !errors.cardCVV && "is-valid"
									}`}
									type="password"
									name="cardCVV"
									id="cardCVV"
									placeholder="***"
									maxLength="3"
									value={values.cardCVV}
									onChange={handleChange}
									onBlur={handleBlur}
									onFocus={(e) => setFocus("cvc")}
								/>
								{errors.cardCVV && touched.cardCVV && <div className="invalid-feedback">{errors.cardCVV}</div>}
							</div>
						</div>
					</div>
				</div>
				<div className="form-check mb-3 has-validation">
					<input
						className={`form-check-input ${touched.acceptTerms && errors.acceptTerms && "is-invalid"} ${
							touched.acceptTerms && !errors.acceptTerms && "is-valid"
						}`}
						type="checkbox"
						name="acceptTerms"
						id="acceptTerms"
						value={values.acceptTerms}
						onChange={handleChange}
						onBlur={handleBlur}
						onFocus={(e) => setFocus("expiry")}
					/>
					<label className="form-check-label" htmlFor="acceptTerms">
						I have read and I accept the <u>booking conditions</u>, <u>general terms</u> and <u>privacy policy</u>
					</label>
					{errors.acceptTerms && touched.acceptTerms && <div className="invalid-feedback">{errors.acceptTerms}</div>}
				</div>
				<p>
					<IconImg src={SSLIcon} height={1} width={1} /> We use secure SSL transmission and encrypted storage to protect
					your personal information.
				</p>
				<CheckoutNav
					backButtonMsg="Return to billing address"
					nextButtonMsg="Complete purchase"
					nextButtonDisabled={!isValid || isValidating || isSubmitting}
				/> */}
      </form>
    </>
  );
}
