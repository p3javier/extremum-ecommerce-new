import React from "react";

import "./ShippingForm.css";

import PayPalBtn from "../../container/PayPalBtn/PayPalBtn";

import axios from "axios";

import { withAuth0 } from "@auth0/auth0-react";

import { ErrorMessage, Field, Formik } from "formik";

import * as yup from "yup";

class ShippingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingFormSubmitted: false,
    };
    this.paymentHandler = this.paymentHandler.bind(this);
  }

  paymentHandler = (details, data) => {
    /** Here you can call your backend API
      endpoint and update the database */
    const { user } = this.props.auth0;

    const cart = JSON.stringify(this.props.cart);
    //console.log(cart);
    return axios.post("http://localhost:5000/api/orders", {
      auth0_id: user.sub,
      email: user.email,
      cart: cart,
      create_time: details.create_time,
      paypal_order_id: details.id,
      payer_given_name: details.payer.name.given_name,
      payer_surname: details.payer.name.surname,
      payer_email: details.payer.email,
      currency: "USD", //modificar cuando vaya a producción.
      value: this.props.amount,
      shipping_info: {
        postalCode: this.state.postalCode,
        province: this.state.province,
        city: this.state.city,
        addressLine1: this.state.addressLine1,
        addressLine2: this.state.addressLine2,
        contactNumber: this.state.contactNumber,
        checkboxTC: this.state.checkboxTC,
      },
    });
    //console.log("details", details);
    //console.log("data", data);
  };

  render() {
    let formDisplay;
    this.state.shippingFormSubmitted
      ? (formDisplay = { display: "none" })
      : (formDisplay = {});
    return (
      <div className="container">
        <div className="grid">
          <div className="row">
            <div className="cell-4" style={formDisplay}>
              <Formik
                initialValues={{
                  postalCode: "",
                  province: "",
                  city: "",
                  addressLine1: "",
                  addressLine2: "",
                  contactNumber: "",
                  checkboxTC: false,
                }}
                validationSchema={yup.object({
                  postalCode: yup
                    .string()
                    .min(4, "Postal Code must be at least 4 digits")
                    .max(10, "The maximum allowed characters for PC is 10")
                    .required("Required"),
                  province: yup
                    .string()
                    .min(2, "Must be at least 2 characters long")
                    .max(
                      35,
                      "The maximum number of characters allowed for this field is 35"
                    )
                    .required("Required"),
                  city: yup
                    .string()
                    .min(2, "The city field must be at least 2 characters long")
                    .max(24, "City name can't exceed 24 characters long")
                    .required("Required"),
                  addressLine1: yup
                    .string()
                    .min(3, "Must be at least 3 characters long")
                    .max(60, "Address can't exceed 60 characters of length")
                    .required("Required"),
                  addressLine2: yup
                    .string()
                    .min(3, "Must be at least 3 characters long")
                    .max(60, "Address can't exceed 60 characters of length"),
                  contactNumber: yup
                    .string()
                    .min(
                      7,
                      "Int. phone numbers should be at least 7 digits long"
                    )
                    .max(20, "Int. phone numbers can't exceed 15 digits")
                    .matches(
                      /^\+(?:[0-9] ?){6,14}[0-9]$/,
                      "Please introduce a valid phone number, remember to add the international prefix e.g +44..."
                    )
                    .required("Required"),
                  /**See https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s03.html for more info about phone validation */
                  checkboxTC: yup
                    .string()
                    .matches(/true/, "You must accept the Terms & Conditions")
                    .required("You must accept the Terms & Conditions"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  this.setState({ shippingFormSubmitted: true });

                  setTimeout(() => {
                    this.setState({ ...values });

                    //alert(JSON.stringify(this.state, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {(formik) => (
                  <form
                    data-role="validator"
                    action="javascript:"
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="form-group">
                      <label>Postal Code</label>
                      <input
                        id="postalCode"
                        type="text"
                        placeholder="Enter your PC (mandatory)"
                        {...formik.getFieldProps("postalCode")}
                      />
                      {formik.touched.postalCode && formik.errors.postalCode ? (
                        <span className="formik_invalid_feedback">
                          {formik.errors.postalCode}
                        </span>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label>Province/Region</label>
                      <input
                        id="province"
                        type="text"
                        placeholder="Enter your province or region, etc. (mandatory)"
                        {...formik.getFieldProps("province")}
                      />

                      {formik.touched.province && formik.errors.province ? (
                        <span className="formik_invalid_feedback">
                          {formik.errors.province}
                        </span>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label>City</label>
                      <input
                        id="city"
                        type="text"
                        placeholder="Enter your city (mandatory)"
                        {...formik.getFieldProps("city")}
                      />
                      {formik.touched.city && formik.errors.city ? (
                        <span className="formik_invalid_feedback">
                          {formik.errors.province}
                        </span>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label>Address Line 1</label>
                      <input
                        id="addressLine1"
                        type="text"
                        placeholder="Address Line 1(mandatory)"
                        {...formik.getFieldProps("addressLine1")}
                      />
                      {formik.touched.addressLine1 &&
                      formik.errors.addressLine1 ? (
                        <span className="formik_invalid_feedback">
                          {formik.errors.addressLine1}
                        </span>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label>Address Line 2</label>
                      <input
                        id="addressLine2"
                        type="text"
                        placeholder="Address Line 1(mandatory)"
                        {...formik.getFieldProps("addressLine2")}
                      />
                      {formik.touched.addressLine2 &&
                      formik.errors.addressLine2 ? (
                        <span className="formik_invalid_feedback">
                          {formik.errors.addressLine2}
                        </span>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label>Contact number</label>
                      <input
                        id="contactNumber"
                        type="text"
                        placeholder="Phone number with the international prefix"
                        {...formik.getFieldProps("contactNumber")}
                      />
                      {formik.touched.contactNumber &&
                      formik.errors.contactNumber ? (
                        <span className="formik_invalid_feedback">
                          {formik.errors.contactNumber}
                        </span>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label>Observations</label>
                      <Field
                        as="textarea"
                        id="observations"
                        name="observations"
                        data-role="textarea"
                      />
                      <ErrorMessage name="observations" />
                    </div>
                    <div className="cell-md-6">
                      <input
                        id="checkboxTC"
                        type="checkbox"
                        data-role="checkbox"
                        data-caption="I accept the Terms & Conditions"
                        value="terms accepted"
                        {...formik.getFieldProps("checkboxTC")}
                      />

                      {formik.touched.checkboxTC && formik.errors.checkboxTC ? (
                        <span className="formik_invalid_feedback">
                          {formik.errors.checkboxTC}
                        </span>
                      ) : null}
                    </div>
                    <button type="submit">Submit</button>
                    <div style={{ maxWidth: 150 }}>
                      <input
                        type="button"
                        className="button"
                        value="< Back to cart"
                        onClick={this.props.action}
                      />
                    </div>
                  </form>
                )}
              </Formik>
            </div>

            {this.state.shippingFormSubmitted ? (
              <div className="cell-4 offset-3">
                <PayPalBtn
                  amount={this.props.amount}
                  currency={"USD"}
                  onSuccess={this.paymentHandler}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth0(ShippingForm);

/**<button
                    class="button success"
                    onClick={() => this.linkFunc("/checkout")}
                  > */
