import React, {useState, useEffect, useRef} from 'react';

const PayPalButtons = ({orderAmount, onApprove}) => {
    const [paid, setPaid] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();

    useEffect(() => {
        window.paypal
          .Buttons({
                style: {
                  color:   'silver',
                  shape:   'pill',
                  size: 'small'
                },
            createOrder: (data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: "Compra de articulo Radical",
                    amount: {
                      currency_code: "USD",
                      value: orderAmount,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              setPaid(true);
              onApprove();
            },
            onError: (err) => {
            //   setError(err),
              console.error(err);
            },
          })
          .render(paypalRef.current);
      }, []);

      

    return (
        <div id='paypal-buttons'>
            <div ref={paypalRef} /> 
        </div>
    )
}
 export default PayPalButtons;