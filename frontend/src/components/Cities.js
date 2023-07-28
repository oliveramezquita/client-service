import React, { useState, useEffect } from "react"
import { useToken } from './useToken';

const API = process.env.REACT_APP_API;

export const Cities = () => {
    const { token } = useToken();

    const [name, setName] = useState('')
    const [code, setCode] = useState('')

    const [editing, setEditing] = useState(false)
    const [id, setId] = useState('')

    const [cities, setCities] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editing) {
            const response = await fetch(`${API}/city`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    code: code,
                    name: name
                })
            })
            const data = await response.json();
            console.log(data)
        } else {
            const response = await fetch(`${API}/city/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    code: code,
                    name: name
                })
            })
            const data = await response.json();
            console.log(data)
            setEditing(false);
            setId('');
        }

        await getCities();

        setName('');
        setCode('');
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
        getCities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteCity = async (id) => {
        const userResponse = window.confirm('¿Estas seguro de querer eliminar la ciudad?')
        if (userResponse) {
            const response = await fetch(`${API}/city/${id}`, {
                method: 'DELETE',
                headers: {
                    'x-access-token': token
                }
            });
            const data = await response.json();
            console.log(data);
            await getCities();
        }
    }

    const updateCity = async (id) => {
        const response = await fetch(`${API}/city/${id}`, {
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
    }

    return (
        <div className="row">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item active">Ciudades</li>
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
                            maxLength={3}
                        />
                    </div>
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
                            <th>Código</th>
                            <th>...</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map(city => (
                            <tr key={city.id}>
                                <td>{city.name}</td>
                                <td>{city.code}</td>
                                <td>
                                    <button
                                        className="btn btn-secondary btn-sm btn-block"
                                        onClick={(e) => updateCity(city.id)}
                                    >
                                        Editar
                                    </button>
                                    &nbsp;
                                    <button
                                        className="btn btn-danger btn-sm btn-block"
                                        onClick={(e) => deleteCity(city.id)}
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
