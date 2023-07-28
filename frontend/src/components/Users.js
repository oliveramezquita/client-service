import React, { useState, useEffect } from "react"
import { useToken } from './useToken';

const API = process.env.REACT_APP_API;

export const Users = () => {
    const { token } = useToken();

    const [name, setName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [photo] = useState('')

    const [editing, setEditing] = useState(false)
    const [id, setId] = useState('')

    const [users, setUsers] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editing) {
            const response = await fetch(`${API}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    name: name,
                    last_name: last_name,
                    email: email,
                    password: password,
                    photo: photo
                })
            })
            const data = await response.json();
            console.log(data)
        } else {
            const response = await fetch(`${API}/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    name: name,
                    last_name: last_name,
                    email: email
                })
            })
            const data = await response.json();
            console.log(data)
            setEditing(false);
            setId('');
        }

        await getUsers();

        setName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }

    const getUsers = async () => {
        const response = await fetch(`${API}/users`, {
            headers: {
                'x-access-token': token
            }
        })
        const data = await response.json()
        setUsers(data)
    }

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteUser = async (id) => {
        const userResponse = window.confirm('¿Estas seguro de querer eliminar el usuario?')
        if (userResponse) {
            const response = await fetch(`${API}/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'x-access-token': token
                }
            });
            const data = await response.json();
            console.log(data);
            await getUsers();
        }
    }

    const updateUser = async (id) => {
        const response = await fetch(`${API}/user/${id}`, {
            headers: {
                'x-access-token': token
            }
        })
        const data = await response.json()
        console.log(data);

        setEditing(true);
        setId(id);

        setName(data.name)
        setLastName(data.last_name)
        setEmail(data.email)
    }

    return (
        <div className="row">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item active">Usuarios</li>
            </ol>
            <hr></hr>
            <div className="col-md-4 mb-5 mt-3">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            onChange={e => setName(e.target.value)}
                            value={name}
                            className="form-control"
                            placeholder="Nombre"
                            autoFocus
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            onChange={e => setLastName(e.target.value)}
                            value={last_name}
                            className="form-control"
                            placeholder="Apellidos"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            className="form-control"
                            placeholder="Correo electrónico"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            value={editing ? '' : password}
                            disabled={editing ? true : false}
                            className="form-control"
                            placeholder="Contraseña"
                        />
                    </div>
                    <input type="hidden" value={photo} />
                    <button className="btn btn-primary btn-block">
                        {editing ? 'Actualizar' : 'Crear'}
                    </button>
                </form>
            </div>
            <div className="col-md-8">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Correo electrónico</th>
                            <th>...</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button
                                        className="btn btn-secondary btn-sm btn-block"
                                        onClick={(e) => updateUser(user.id)}
                                    >
                                        Editar
                                    </button>
                                    &nbsp;
                                    <button
                                        className="btn btn-danger btn-sm btn-block"
                                        onClick={(e) => deleteUser(user.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
