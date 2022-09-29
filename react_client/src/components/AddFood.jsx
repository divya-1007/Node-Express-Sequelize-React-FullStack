import {Col,Form,Row ,Button} from 'react-bootstrap';
import axios from 'axios'
import React, { useState } from 'react'
import swal from 'sweetalert';

export const AddFood = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [published, setPublished] = useState(true)
  const [logos, setLogos] = useState('')

  const addProductHandler = async (e) => {
      e.preventDefault()
      const formData = new FormData()

      formData.append('logos', logos)
      formData.append('title', title)
      formData.append('price', price)
      formData.append('description', description)
      formData.append('published', published)

     const response = await axios.post('/api/products/foodaddProduct', formData)
      if(response.status=== 200){
    swal("Success"," Food Product Add SuccessFully ", "success", {
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
    <div className="card-body">
    <div className="table-responsive">
    <Form onSubmit={addProductHandler} method="POST" encType='multipart/form-data'>

<Form.Group controlId="fileName" className="mb-3">
    <Form.Label className='text-primary'>Upload Image</Form.Label>
    <Form.Control
        type="file"
        name='logos'
        onChange={(e) => setLogos(e.target.files[0])}
        size="lg" />
</Form.Group>

    <Form.Group className="mb-3" controlId="title">
        <Form.Label className='text-primary'>Title</Form.Label>
        <Form.Control
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
    </Form.Group>

    <Form.Group className="mb-3" controlId="price">
        <Form.Label className='text-primary'>Price ($)</Form.Label>
        <Form.Control
            value={price}
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            type="number"
             />
    </Form.Group>

  
    <Form.Group className="mb-3" controlId="description">
        <Form.Label className='text-primary'>Description</Form.Label>
        <Form.Control
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            as="textarea"
            />
    </Form.Group>

    <Form.Group className="mb-3" controlId="publishedCheckedid">
        <Form.Check
            type="checkbox"
            onChange={(e) => setPublished(e.target.checked)}
            variant="primary"
            label="publish"
           />
    </Form.Group>


    <Button variant="primary" type="submit" style={{width:'100%'}}>
        Add Product
    </Button>
    </Form>
    </div>
    </div>
  )
}
