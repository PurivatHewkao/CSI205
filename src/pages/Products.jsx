import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './Products.css';


const Products = ({ products, carts, setCarts }) => {
    console.log('Products prop:', products) // ตรวจสอบใน console ว่ามี thumbnailUrl หรือไม่

    return (
        <div>
            <div className="products-item-container">
                {products.map((product) => {
                    return (
                        <Card key={product.id} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={product.thumbnailUrl} alt={product.title} />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>
                                    Price: {product.price?.toFixed(2)}
                                </Card.Text>


                                {carts.find((cart) => cart.id === product.id) ? (
                                    <span className='badge bg-danger'>Added</span>
                                ) : (
                                    <Button variant="outline-primary" onClick={() => setCarts([...carts, product])}>
                                        Add to Cart
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}

export default Products;