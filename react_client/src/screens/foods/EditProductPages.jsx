import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import swal from 'sweetalert';


export const EditProductPages = () => {

    const { id } = useParams()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [published, setPublished] = useState(true)

    useEffect(() => {
        const getDataById = async () => {
            const {data} = await axios.get(`/api/products/${id}`)
            setTitle(data.title)
            setPrice(data.price)
            setDescription(data.description)
            setPublished(data.published)
        }

        getDataById()
    },[id])

   const updateHandler = async (e) => {

        e.preventDefault()
       
        // update by put request

        const data = {
            title: title,
            price: price,
            description: description,
            published: published
        }

 const response = await axios.put(`/api/products/${id}`, data)
    if(response.status=== 200){
        swal("Success","Food Product Update SuccessFully", "success", {
            buttons: false,
            timer: 2000,
            })
        }else{
        swal("Oops!", response.data, "error", {
            buttons: true,
            timer: 2000,
            })
        }
   }

    return (
        <>
       <div className="card-body">
         <div className="table-responsive">
            <Form onSubmit={updateHandler}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label className='text-primary'>Title</Form.Label>
                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        />
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label className='text-primary'>Price ($)</Form.Label>
                    <Form.Control
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
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

                <Form.Group className="mb-3" controlId="publishedCheckedid">
                    <Form.Check
                        type="checkbox"
                        value={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        variant="primary"
                        label="publish"
                        />
                </Form.Group>


                <Button variant="primary" type="submit" style={{width:"100%"}}>
                    Update Product
                </Button>
            </Form>
        </div>
        </div>
        </>
    )
}


