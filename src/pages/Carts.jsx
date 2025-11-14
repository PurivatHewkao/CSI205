import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Cart.css'

const Carts = ({ carts, setCarts }) => {
    return (
        <div>
            <div className="cart-item-container">
                {carts.map((cart) => {
                    return (
                        <Card key={cart.id} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={cart.thumbnailUrl} alt={cart.title} />
                            <Card.Body>
                                <Card.Title>{cart.title}</Card.Title>
                                <Card.Text>
                                    Price: {cart.price?.toFixed(2)}
                                </Card.Text>
                                <Button variant="outline-danger"
                                    onClick={() => setCarts(carts.filter((c) => c.id !== cart.id))
                                    }>Remove from Cart</Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
            <h4>Items: {carts.length} items - Total Price: ${carts.reduce((prev, cart) => {
                return prev + cart.price
            }, 0).toFixed(2)}
            </h4>
            <Button variant="outline-success" onClick={() => setCarts([])}>Check Out</Button>
        </div>
    );
}

export default Carts;