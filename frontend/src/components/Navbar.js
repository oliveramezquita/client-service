import React from "react"
import { Link, useHistory } from 'react-router-dom'


export const Navbar = () => {
    const history = useHistory()
    const doLogOut = async () => {
        localStorage.clear();
        history.go(0)
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Client service
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/users">
                                Usuarios
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/clients">
                                Clientes
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/cities">
                                Ciudades
                            </Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <button type="button" className="btn btn-light btn-sm" onClick={doLogOut}>Salir</button>
                        <label>&nbsp;</label>
                    </div>

                </div>
            </div>
        </nav>
    )
}