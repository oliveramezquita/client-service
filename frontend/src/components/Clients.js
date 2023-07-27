import React, { useState, useEffect } from "react"
import { useToken } from './useToken';
import { ExportToExcel } from './ExportToExcel'

const API = process.env.REACT_APP_API;

export const Clients = () => {
    const { token, setToken } = useToken();

    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [city, setCity] = useState('')

    const [editing, setEditing] = useState(false)
    const [id, setId] = useState('')

    const [clients, setClients] = useState([])
    const fileName = "clientes";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editing) {
            const response = await fetch(`${API}/client`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    name: name,
                    code: code,
                    city: city
                })
            })
            const data = await response.json();
            console.log(data)
        } else {
            const response = await fetch(`${API}/client/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    name: name,
                    code: code,
                    city: city,
                })
            })
            const data = await response.json();
            console.log(data)
            setEditing(false);
            setId('');
        }

        await getClients();

        setName('');
        setCode('');
        setCity('');
    }

    const getClients = async () => {
        const response = await fetch(`${API}/clients`, {
            headers: {
                'x-access-token': token
            }
        })
        const data = await response.json()
        const customHeadings = data.map(client => ({
            'id': client.id,
            'name': client.name,
            'code': client.code,
            'city': client.city
        }))
        setClients(customHeadings)
    }

    useEffect(() => {
        getClients();
    }, [])

    const deleteClient = async (id) => {
        const userResponse = window.confirm('¿Estas seguro de querer eliminar el cliente?')
        if (userResponse) {
            const response = await fetch(`${API}/client/${id}`, {
                method: 'DELETE',
                headers: {
                    'x-access-token': token
                }
            });
            const data = await response.json();
            console.log(data);
            await getClients();
        }
    }

    const updateClient = async (id) => {
        const response = await fetch(`${API}/client/${id}`, {
            headers: {
                'x-access-token': token
            }
        })
        const data = await response.json()
        console.log(data);

        setEditing(true);
        setId(id);

        setName(data.name)
        setCode(data.code)
        setCity(data.city)
    }

    return (
        <div className="row">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item active">Clientes</li>
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
                            onChange={e => setCode(e.target.value)}
                            value={code}
                            className="form-control"
                            placeholder="Código"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            className="form-control"
                            placeholder="Ciudad"
                        />
                    </div>
                    <button className="btn btn-primary btn-block">
                        {editing ? 'Actualizar' : 'Crear'}
                    </button>
                </form>
            </div>
            <div className="col-md-8 mt-3">
                <div className="mb-3">
                    <ExportToExcel apiData={clients} fileName={fileName} />
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Ciudad</th>
                            <th>...</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.name}</td>
                                <td>{client.code}</td>
                                <td>{client.city}</td>
                                <td>
                                    <button
                                        className="btn btn-secondary btn-sm btn-block"
                                        onClick={(e) => updateClient(client.id)}
                                    >
                                        Editar
                                    </button>
                                    &nbsp;
                                    <button
                                        className="btn btn-danger btn-sm btn-block"
                                        onClick={(e) => deleteClient(client.id)}
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
