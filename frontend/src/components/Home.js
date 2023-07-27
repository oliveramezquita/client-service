import React, { Fragment } from "react"
import { Link } from 'react-router-dom'

export const Home = () => (
    <Fragment>
        <h2>Dashboard</h2>
        <ul>
            <li><Link to="/users">Usuarios</Link></li>
            <li><Link to="/clients">Clientes</Link></li>
            <li><Link to="/cities">Ciudades</Link></li>
        </ul>
    </Fragment>
)