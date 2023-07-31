import React, { useState } from "react";
import PropTypes from 'prop-types';

const API = process.env.REACT_APP_API;

async function loginUser(email, password) {
    const response = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    const data = await response.json();
    return data.token
}

export const Login = ({ setToken }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser(email, password);

        setToken(token);
    }

    return (
        <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5">
                                <h1 className="text-center">ADMINISTRADOR DE CLIENTES</h1>
                                <hr></hr>
                                <h4 className="mb-3 text-center">INICIAR SESIÓN</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-label mt-4" htmlFor="email">
                                            <b>Correo electrónico</b>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Ingrese su correo electrónico"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label mt-4" htmlFor="password">
                                            <b>Password</b>
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Ingrese su contraseña"
                                        />
                                    </div>
                                    {/* Checkbox */}
                                    <div className="form-check d-flex justify-content-start mb-5 mt-5">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            defaultValue=""
                                            id="form1Example3"
                                        />
                                        <label className="form-check-label" htmlFor="form1Example3">
                                            {" "}
                                            &nbsp;Recordar contraseña{" "}
                                        </label>
                                    </div>
                                    <button className="btn btn-primary btn-lg btn-block" type="submit">
                                        Entrar
                                    </button>
                                </form>
                                <br />
                                <p>
                                    <small>&copy; Realizado por Oliver Amézquita Morales</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}