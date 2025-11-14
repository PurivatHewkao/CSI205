import { verifyUser } from '../data/users';
import './Login.css';
import Form from 'react-bootstrap/Form';
import { useRef } from 'react';
import venticover from '../assets/venticover.png';

function Login({ setToken, setRole }) {

    const userRef = useRef();
    const passRef = useRef();

    return (
        <div className="login-wrapper">

            <img
                src={venticover}
                alt="venticover"
                className="login-image"
            />

            <div className="login-container">

                <h2 className="text-center mb-4">
                    <span className="badge bg-primary px-4 py-2 fs-4">Login</span>
                </h2>

                <Form.Label htmlFor="username" className='fw-bold'>Username</Form.Label>
                <Form.Control
                    type="text"
                    id="username"
                    placeholder="user"
                    style={{ textAlign: 'center' }}
                    ref={userRef}
                />

                <Form.Label htmlFor="password" className="mt-3 fw-bold">Password</Form.Label>
                <Form.Control
                    type="password"
                    id="password"
                    placeholder="pass"
                    style={{ textAlign: 'center' }}
                    ref={passRef}
                />

                <button
                    className="btn btn-success mt-4 w-100"
                    onClick={() => {
                        const user = userRef.current.value.trim();
                        const pass = passRef.current.value.trim();
                        const userInfo = verifyUser(user, pass);

                        userRef.current.value = '';
                        passRef.current.value = '';

                        if (userInfo === null) {
                            alert('wrong username or password');
                            userRef.current.focus();
                        } else {
                            setToken(userInfo.token);
                            setRole(userInfo.role);
                        }
                    }}
                >
                    Login
                </button>

            </div>
        </div>
    );
}

export default Login;
