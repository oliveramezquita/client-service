import React, { Fragment } from "react"
import { Link } from 'react-router-dom'

export const Home = () => (
    <Fragment>
        <h2>Dashboard</h2>
        <ul>
            <li><Link to="/users">Usuarios</Link></li>
            <li>Clientes</li>
            <li>Ciudades</li>
        </ul>
    </Fragment>
)