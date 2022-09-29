import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Container, Row, Col, Card ,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export const FoodProducts = () => {

  const [products, setProducts] = useState([])

    useEffect(() => {
        const getProductsData = async () => {
            const { data } = await axios.get('/api/products/allfoodProducts')
             console.log(data ,"data");
            setProducts(data)
        }
        getProductsData()
    }, [])

  return (
    <div className="card-body">
    <div className="table-responsive">
        <table width="100%">
            <thead>
                <tr>
                    <td>Product</td>
                    <td>Title</td>
                    <td>Description</td>
                    <td>Price</td>
                    <td>Status</td>
                    <td>Details</td>
                </tr>
            </thead>
            <tbody>
                {
                    products.map(productData => {
                return( <tr>
                    <td><img style={{width: "50%"}} src={`http://localhost:8001/uploads/${productData.image}`} alt='data'/></td>
                    <td>{productData.title}</td>
                    <td><p style={{display: "-webkit-box", maxWidth:" 200px","-webkitLineClamp": "2", "-webkitBoxOrient":
                     "vertical", overflow: "hidden",}}>{productData.description}</p></td>
                    <td>{productData.price}</td>
                    {productData.published ? (<td><span className="status purple"></span>active</td>) :
                    (<td><span className="status purple"></span>Inactive</td>)}
                    <td className='m-2'><Link to={`foodproducts/${productData.id}`}>
                    <Button style={{background:'#ff0066',border:'none' }}>Details</Button>
                    </Link></td>
                </tr>)
                    })
                }
            </tbody>
        </table>
    </div>
</div>
  )
}
