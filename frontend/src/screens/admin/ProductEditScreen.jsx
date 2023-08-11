import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useUpdateProductMutation, useGetProductDetailsQuery } from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
    const { id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);
  
    return (
        <>
            <Link to='/admin/productList' className='btn btn-light my-3'> 
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}

                {isLoading ? <Loader /> : error ? <Message variant='danger'>
                    {error}</Message> : (
                        <Form>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                   type='name'
                                   placeholder='Enter name of product'
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                                ></Form.Control>        
                            </Form.Group>
                        </Form>
                    )}
            </FormContainer>
        </>
    )
}

export default ProductEditScreen;