import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Container, Row, Col, Card ,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';

const ShowProducts = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProductsData = async () => {
            const { data } = await axios.get('/api/products/allProducts')
            console.log(data ,"products")
            setProducts(data)
        }
        getProductsData()
    }, [])

    return (
        <>
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
                            products.map(product => {
                        return( <tr>
                            <td><img style={{width: "50%"}} src={`http://localhost:8001/uploads/${product.image}`} alt='data'/></td>
                            <td>{product.title}</td>
                            <td><p style={{display: "-webkit-box", maxWidth:" 200px","-webkitLineClamp": "2", "-webkitBoxOrient": "vertical", overflow: "hidden",}}>{product.description}</p></td>
                            <td>{product.price}</td>
                            {product.published ? (<td><span class="status purple"></span>active</td>) :
                            (<td><span class="status purple"></span>Inactive</td>)}
                            <td className='m-2'><Link to={`product/${product.id}`}>
                            <Button style={{background:'#ff0066',border:'none' }}>Detail</Button>
                            </Link></td>
                        </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default ShowProducts
