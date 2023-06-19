import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import products from '../products';


const ProductScreen = () => {
    const  { id: productId } = useParams();
    const product = products.find((p) => p._id === productId);
   
  return (
    <>
        <Link className='btn btn-light my-3' to='/' >
        Go Back
        </Link>
    </>
  )
}

export default ProductScreen