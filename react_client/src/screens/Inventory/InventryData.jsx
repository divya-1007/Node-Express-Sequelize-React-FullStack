import React ,{useState  ,useEffect} from 'react';
import "./inventry.css";
import {Card, Button, Container, Form, Row, Col} from 'react-bootstrap'
import {  useParams } from 'react-router'
import swal from 'sweetalert';
import axios from 'axios';


export const InventoryData = () => {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [productDescription, setProductDescription] = useState('')
  const [published, setPublished] = useState(true)
  const [productImage, setProductImage] = useState('')
  
  useEffect(() => {
    const getDataById = async () => {
      const {data} = await axios.get(`/api/products/getProductReviews/${id}`)
      setTitle(data.title)
      setPrice(data.price)
      setProductDescription(data.description)
      setPublished(data.published)
      setProductImage(data.image)
  }
      getDataById()
  },[id])
  


  const [book, setBook] = useState({
		name: "The Fault In Our Stars",
		author: "John Green",
		img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
		price: 250,
	});

	const initPayment = (data) => {
		const options = {
			key: "rzp_test_RmXTL8t1xhHvgJ",
			amount: data.amount,
			currency: data.currency,
			name:title,
			description: "Test Transaction",
			image: productImage,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = `http://localhost:8001/api/products/verify/${id}`;
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
          if(data.status === 1){
            swal("Success",data.message, "success", {
              buttons: false,
              timer: 2000,
              })
            }else{
            swal("Oops!", data.message, "error", {
                buttons: true,
                timer: 2000,
                })
            }
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	}

  const handlePayment = async () => {
		try {
			const orderUrl = "http://localhost:8001/api/products/payment";
			const { data } = await axios.post(orderUrl, { amount: price });
			initPayment(data.message);
		} catch (error) { 
			console.log(error);
		}
	};
  return (
    <div className="card-body">
    <div className="table-responsive">
        {/* <h2> Account Settings</h2> */}
        {/* <div className="book_container">
				<img src={`http://localhost:8001/uploads/${productImage}`} alt="book_img" className="book_img" />
				<p className="book_name">{title}</p>
				<p className="book_author">{productDescription}</p>
				<p className="book_price">
					Price : <span>&#x20B9; {price}</span>
				</p>
				<p className="book_author">{published}</p>

				<button onClick={handlePayment} className="buy_btn">
					buy now
				</button>
			</div> */}
      <Row>
        <Col md={8} lg={12} sm={8}>
            <Card className='shadow-lg m-3 p-2 rounded'>
                    <Card.Img src={`http://localhost:8001/uploads/${productImage}`} style={{width:"40%" }} />
                    <Card.Body>
                        <Card.Title>Title: {title}</Card.Title>
                        <Card.Title className="text-success">Price: ${price}</Card.Title>
                        <Card.Text>
                            Description: {productDescription}
                        </Card.Text>
                        <Card.Text>
                            Published: {published ? (<small>True</small>) : (<small>false</small>)}
                        </Card.Text>
                        <br />

                        <Button className="btn btn-danger m-2" onClick={ handlePayment}>	buy now</Button> 
                    
                </Card.Body>        
            </Card>
        </Col>
        </Row>
    </div>
    </div>
  )
}
