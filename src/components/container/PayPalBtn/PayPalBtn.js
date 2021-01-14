import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

class PayPalBtn extends React.Component {
  render() {
    const { amount, onSuccess, currency } = this.props;
    return (
      <PayPalButton
        id="paypal"
        amount={amount}
        currency={currency}
        onSuccess={(details, data) => onSuccess(details, data)}
        options={{
          clientId:
            "ATUnRGZWssNw9BJV-pbWbtLjiV9DCD8uMSXu9VKESvxFzqttTEyBbbqbJWkiHKZEpHGR7eGL8ST49IYY",
        }}
        shippingPreference="NO_SHIPPING"
      />
    );
  }
}

export default PayPalBtn;
