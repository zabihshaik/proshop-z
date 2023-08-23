import React from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice'; 


const ProductScreen = () => {

    const  { id: productId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
    
    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

    const { userInfo } = useSelector((state) => state.auth);
    
    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap();
            refetch();
            toast.success('Review Submitted');
            setRating(0);
            setComment('');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };
   
  return (
    <>
        <Link className='btn btn-light my-3' to='/' >
        Go Back
        </Link>

        { isLoading ? (
            <Loader />
        ) : error ? (
            <Message variant='danger'>{ error?.data?.message || error.error }</Message>
        ) : (
        <>
        <Meta title={product.name} />
        <Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={4}>
            <ListGroup variant='flush'>
                <ListGroupItem>
                    <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroupItem>
                <ListGroupItem>Price: ${product.price}</ListGroupItem>
                <ListGroupItem>Description: {product.description}</ListGroupItem>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup>
                    <ListGroupItem>
                        <Row>
                            <Col>Price:</Col>
                            <Col>
                                <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                                <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                            </Col>
                        </Row>
                    </ListGroupItem>

                    { product.countInStock > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col>Qty</Col>
                                <Col>
                                    <Form.Control 
                                    as='select' 
                                    value={qty} 
                                    onChange={(e) => setQty(Number(e.target.value))}>
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}                                        
                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ) }

                    <ListGroupItem>
                        <Button className='btn-block' type='button' disabled={product.countInStock===0} 
                        onClick={addToCartHandler}>
                            Add To Cart
                        </Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>

    </Row>
    <Row className='review'>
        <Col md={6}>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant='flush'>
                {product.reviews.map(review => (
                    <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0,10)}</p>
                        <p>{review.comment}</p>
                    </ListGroup.Item>
                ))}
                <ListGroup.Item>
                    <h2>Write a Customer Review</h2>

                    {loadingProductReview && <Loader />}

                    {userInfo ? (
                        <Form onSubmit={ submitHandler }>
                            <Form.Group controlId='rating' className='my-2'>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                    as='select'
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                >
                                    <option value=''>Select...</option>
                                    <option value='1'>1 - Poor</option>
                                    <option value='2'>2 - Fair</option>
                                    <option value='3'>3 - Good</option>
                                    <option value='4'>4 - Very Good</option>
                                    <option value='5'>5 - Excellent</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='comment' className='my-2'>
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    row='3'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Button 
                            disabled={loadingProductReview}
                            type='submit'
                            variant='primary'
                            >
                                Submit
                            </Button>
                        </Form>
                    ) : (
                        <Message>
                            Please <Link to='/login'>sign in</Link> to write a review{' '}
                        </Message>
                    )}
                </ListGroup.Item>
            </ListGroup>
        </Col>
    </Row>
    </>
    ) }
        
    </>
  )
};

export default ProductScreen;