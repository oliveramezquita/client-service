import React, { useState, useEffect } from "react"
import { useToken } from './useToken';
import { ExportToExcel } from './ExportToExcel'

const API = process.env.REACT_APP_API;

export const Clients = () => {
    const { token } = useToken();

    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [city, setCity] = useState('')
    const [filterCity, setFilterCity] = useState('')

    const [editing, setEditing] = useState(false)
    const [id, setId] = useState('')

    const [clients, setClients] = useState([])
    const [cities, setCities] = useState([])
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
                    code: code,
                    name: name,
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
                    code: code,
                    name: name,
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
            'city': client.city_name
        }))
        setClients(customHeadings)
    }

    const getClientsByCity = async (city) => {
        const response = await fetch(`${API}/clients/${city}`, {
            headers: {
                'x-access-token': token
            }
        })
        const data = await response.json()
        const customHeadings = data.map(client => ({
            'id': client.id,
            'name': client.name,
            'code': client.code,
            'city': client.city_name
        }))
        setClients(customHeadings)
    }

    const getCities = async () => {
        const response = await fetch(`${API}/cities`, {
            headers: {
                'x-access-token': token
            }
        })
        const data = await response.json()
        setCities(data)
    }

    useEffect(() => {
        getClients();
        getCities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const filterByCity = async (city) => {
        if (city > 0)
            getClientsByCity(city)
        else
            getClients()
        setFilterCity(city)
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
                            maxLength={5}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <div className="form-group">
                            <label htmlFor="ciudad" className="form-label mt-4">
                                Ciudad
                            </label>
                            <select value={city} className="form-select" id="ciudad" onChange={e => setCity(e.target.value)}>
                                <option>Selecciones una ciudad</option>
                                {cities.map((item) => (
                                    <option key={item.id} value={item.id} selected={city === item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-primary btn-block">
                        {editing ? 'Actualizar' : 'Crear'}
                    </button>
                </form>
            </div>
            <div className="col-md-8 mt-3">
                <div className="d-flex justify-content-between">
                    <div className="form-group mb-3 col-md-4 col-sm-5 d-inline-flex">
                        <div className="form-group col-12">
                            <label htmlFor="filtrar_ciudad" className="form-label mt-4">
                                Filtrar por ciudad
                            </label>
                            <select value={filterCity} className="form-select" id="filtrar_ciudad" onChange={e => filterByCity(e.target.value)}>
                                <option key={0} value={0} selected={filterCity === 0}>Todas</option>
                                {cities.map((item) => (
                                    <option key={item.id} value={item.id} selected={filterCity === item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <ExportToExcel apiData={clients} fileName={fileName} />
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Ciudad</th>
                            <th>&nbsp;</th>
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
