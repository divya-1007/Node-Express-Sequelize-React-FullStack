import React, { useEffect, useState } from 'react'
import {Card, Button, Container, Form, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router'
import axios from 'axios';
import images1  from '../components/1.png'
import swal from 'sweetalert';


export const ProductData = () => {

    const { id } = useParams()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [productDescription, setProductDescription] = useState('')
    const [published, setPublished] = useState(true)
    const [productImage, setProductImage] = useState('')


    // review rating  description
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState('')


    useEffect(() => {

        const getSingleProductData = async () => {
            const { data } = await axios.get(`/api/products/getProductReviews/${id}`)
            setTitle(data.title)
            setPrice(data.price)
            setProductDescription(data.description)
            setPublished(data.published)
            setProductImage(data.image)

            // for reviews
            setReviews(data.review)
        }
        getSingleProductData()

    },[id])



    // handling Delete
    const handleDelete = async (id) => {
     const response = await axios.delete(`/api/products/${id}`)
        if(response.status=== 200){
			swal({
                title: "Are you sure?",
                text: "you want to Permanent Delete ?",
                icon: "warning",
                dangerMode: true,
              })
              .then(willDelete => {
                if (willDelete) {
                  swal("Deleted!", "SuccessFull", "success");
				  window.location.href = "/dashboard";
                }
              });
            }else{
            swal("Oops!", response.data, "error", {
                buttons: true,
                timer: 2000,
                })
            }
    }

    // to add review

    const addReviewHandler = async (e) => {

        e.preventDefault()

        let review = {
            product_id: id,
            rating: rating,
            description: description
        }

     const responseReview = await axios.post(`/api/products/addReview`, review)
        if(responseReview.status=== 200){
			swal("Success","SuccessFully", "success", {
				buttons: false,
				timer: 2000,
				})
            }else{
            swal("Oops!", responseReview.data, "error", {
                buttons: true,
                timer: 2000,
                })
            }

    }

    return (
        <>
       <div className="card-body">
       <div className="table-responsive">
        <Row>
            <Col md={8} lg={8} sm={8}>
                <Card className='shadow-lg m-3 p-2 rounded'>
                        <Card.Img src={`http://localhost:8001/uploads/${productImage}`} fluid />
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

                    
                            <Link to={`/product/edit/${id}`}>
                                <Button>Edit</Button>
                            </Link>

                            <Link to={`/inventory/${id}`}>
                                <Button className='btn btn-info m-2'>Inventory</Button>
                            </Link>
                            
                            
                            <Button className="btn btn-danger m-2" onClick={() => handleDelete(id)}>Delete</Button> 
                        
                    </Card.Body>        
                </Card>
            </Col>


                <Col md={4} lg={4} sm={4}>

                    <h2 className='text-center text-danger'>Add Review</h2>
                    <hr />

                        <Form onSubmit={addReviewHandler}>
                            <Form.Group className="mb-3" controlId="rating">
                                <Form.Label className='text-primary'>Rating</Form.Label>
                                <Form.Control
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    type="number"
                                />
                            </Form.Group>

                        

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label className='text-primary'>Description</Form.Label>
                                <Form.Control
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    as="textarea"
                                    />
                            </Form.Group>


                            <Button variant="primary" type="submit">
                                Add Review
                            </Button>
                        </Form>

                         <br />

                        <h5>Product Reviews</h5>
                        <hr />

                        {reviews.length > 0 ? (
                            reviews.map(review => {
                                return <p key={review.id}>Rating: {review.rating} <br /> {review.description}</p>
                            })
                        ): ( <p> No reviews for this product </p> )}

                        
                </Col>
        </Row>
        </div>
        </div>
        </>
    )
}


