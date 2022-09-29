import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import Loading from "react-fullscreen-loading";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import swal from "sweetalert";
import axios from "axios";


const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#5045e4",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

let CardElementFormInner = {
  background: "#fff",
  padding: "20px 10px",
  border: "1px solid #e5e7eb",
  marginBottom: "25px",
  borderRadius: "10px",
};
let CardElementButton = {
  background: "rgb(22 161 182 / 59%)",
  padding: "10px",
  border: "1px solid #e5e7eb",
  margin: "25px 6px",
  width: "10rem",
  borderRadius: "10px",
};
export const StripeData = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [published, setPublished] = useState(true);
  const [productImage, setProductImage] = useState("");
  const [submitting, setSubmitting] = useState();
  const [pageLoader, setPageLoader] = useState(false);

  useEffect(() => {
    const getDataById = async () => {
      const { data } = await axios.get(`/api/products/foodproduct/${id}`);
      setTitle(data.title);
      setPrice(data.price);
      setProductDescription(data.description);
      setPublished(data.published);
      setProductImage(data.image);
    };
    getDataById();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let cardItem = [
      {
        name: title,
        image: productImage,
        amount: price,
        description: `Client libraries make it easier `,
        cartQuantity: 1,
        id: id,
      },
      {
        name: title,
        image: productImage,
        amount: price,
        description: `Client libraries make it easier`,
        cartQuantity: 1,
        id: id,
      },
    ];
    const response = await axios.post(
      "http://localhost:8001/api/products/paymentstripe",
      {
        cartItems: cardItem,
      }
    );
    window.location.href = response.data.status;
  };

  const [loadings, setLoadings] = useState(false);

  const handleSubmitData = async (event) => {
    event.preventDefault();
    const isStripeLoading = !stripe || !elements;
    setLoadings(true);
    if (isStripeLoading) {
      setSubmitting(false);
      return;
    }
    const getBillingDetails = () => {
      return {
        address: {
          city: "Indore",
          country: "SG",
          state: "Madhya Pradesh",
          line1: "100/10 nehru nagar",
          line2: null,
          postal_code: "452001",
        },
        email: "divya@gmail.com",
        name: title,
        phone: "9874567728",
      };
    };
    try {
      const response = await axios.post(
        "http://localhost:8001/api/products/secret",
        {
          products: {
            id: id,
            quantity: 1,
            price: price,
            city: "Indore",
            country: "SG",
            state: "Madhya Pradesh",
            line1: "100/10 nehru nagar",
            line2: null,
            postal_code: "452001",
            email: "divya@gmail.com",
            name: title,
            phone: "9874567728",
            description:productDescription,
          },
          email: "divya@gmail.com",
        }
      );
      const clientSecretData = response.data.client_secret;
      //   await stripe.confirmCardPayment(
      //   clientSecretData,
      //   {
      //     payment_method: {card: elements.getElement(CardNumberElement),},
      //     billing_details: getBillingDetails()
      //   },
      //   {handleActions: false}
      // ).then(function(result) {
      //   let action = result.paymentIntent.next_action
      //   if (action && action.type === 'redirect_to_url') {
      //     window.location = action.redirect_to_url.url;
      //   }
      // });

      const cardPayment = await stripe.confirmCardPayment(clientSecretData, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: getBillingDetails(),
        },
      });
      await stripe
        .retrievePaymentIntent(clientSecretData)
        .then(function (response) {
          if (response.paymentIntent || response.paymentIntent.status === "succeeded") {
            setLoadings(false);
            setPageLoader(false);
            swal(
              "Success",
              "Thank You! You have successfully Event booking",
              "success",
              {
                buttons: false,
                timer: 2000,
              }
            );
            // setTimeout(() => {
            //   // window.location.replace("/foodproducts");
            // }, 2000);
          } else {
            setPageLoader(false);
            swal("Oops!", response.data, "error", {
              buttons: true,
              timer: 2000,
            });
            console.log("Payment Status", response.paymentIntent.status);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card-body">
      <div className="table-responsive">
        {pageLoader ? (
          <Loading
            loading={true}
            background="#fff"
            loaderColor="#4c4cdc"
            style={{ zIndex: "99999" }}
          />
        ) : null}
        <Row>
          <Col md={8} lg={12} sm={8}>
            <Card className="shadow-lg m-3 p-2 rounded">
              <Card.Img
                src={`http://localhost:8001/uploads/${productImage}`}
                style={{ width: "40%" }}
              />
              <Card.Body>
                <Card.Title>Title: {title}</Card.Title>
                <Card.Title className="text-success">
                  Price: ${price}
                </Card.Title>
                <Card.Text>Description: {productDescription}</Card.Text>
                <Card.Text>
                  Published:{" "}
                  {published ? <small>True</small> : <small>false</small>}
                </Card.Text>
                <br />

                <Button style={CardElementButton} onClick={handleSubmit}>
                  {" "}
                  buy now
                </Button>

                <form id="payment-form" onSubmit={handleSubmitData}>
                  <div style={CardElementFormInner}>
                    <fieldset>
                      <div>
                        <CardElement options={CARD_OPTIONS} />
                        {loadings == true ? (
                          <Loading
                            loading={true}
                            background="#fff"
                            loaderColor="#198754"
                            style={{ zIndex: "99999" }}
                          />
                        ) : (
                          <button
                            loading={loadings}
                            style={CardElementButton}
                            type="submit"
                          >
                            PaymentIntent Pay
                          </button>
                        )}
                      </div>
                    </fieldset>
                  </div>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
