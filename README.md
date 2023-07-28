# client-service
Client Service is an application for managing clients that contains:

- CRUD to manage database entities
- Visualization for client management
- Information export service through an Excel file
- REST API for third-party consumption

### Programming Languages
- Python [docs](https://docs.python.org/3/)
- JavaScript [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Frameworks used
- Backend: Flask [docs](https://flask.palletsprojects.com/en/2.1.x/)
- Frontend: React [docs](https://es.react.dev/learn)

  
## Database diagram
![App Screenshot](https://raw.githubusercontent.com/oliveramezquita/client-service/main/clientservice-db-diagram.png)


## API Reference

#### Login to get API Token

```
  POST /api/login
```

```
# Body parameters content in raw

{
  "email": "email value",
  "password": "password value"
}
```

#### Required header parameter for all requests except login

| Key              | Value    | Description                       |
| :--------------- | :------- | :-------------------------------- |
| `x-access-token` | `string` | TOKEN obtained by authentication  |

#### Get all users

```
  GET /api/users
```

#### Get user by id

```
  GET /api/user/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int`    | **Required**. Id of item to fetch |

#### Create user

```
  POST /api/user
```

```
// Body parameters content in raw

{
    "name": "name value",
    "last_name": "last name value",
    "email": "email value",
    "password": "password value"
}
```

#### Update user

```
  PUT /api/user/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `int`    | **Required**. Id of item to update |

```
// Body parameters content in raw
// Not all parameters are necessary
// The update for the password will be implemented in the next version

{
    "name": "name value",
    "last_name": "last name value",
    "email": "email value"
}
```

#### Delete user

```
  DELETE /api/user/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `int`    | **Required**. Id of item to delete |

#### Get all clients

```
  GET /api/clients
```

#### Get client by id

```
  GET /api/client/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int`    | **Required**. Id of item to fetch |

#### Create client

```
  POST /api/client
```

```
// Body parameters content in raw

{
    "code": "code value", // MAX_LENGTH 5 characters
    "name": "name value",
    "city": 1 // City's id
}
```

#### Update client

```
  PUT /api/client/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `int`    | **Required**. Id of item to update |

```
// Body parameters content in raw
// Not all parameters are necessary

{
    "code": "code value", // MAX_LENGTH 5 characters
    "name": "name value",
    "city": 1 // City's id
}
```

#### Delete client

```
  DELETE /api/client/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `int`    | **Required**. Id of item to delete |

#### Get all citites

```
  GET /api/cities
```

#### Get city by id

```
  GET /api/city/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int`    | **Required**. Id of item to fetch |

#### Create city

```
  POST /api/city
```

```
// Body parameters content in raw

{
    "code": "code value", // MAX_LENGTH 3 characters
    "name": "name value"
}
```

#### Update city

```
  PUT /api/city/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `int`    | **Required**. Id of item to update |

```
// Body parameters content in raw
// Not all parameters are necessary

{
    "code": "code value", // MAX_LENGTH 3 characters
    "name": "name value"
}
```

#### Delete city

```
  DELETE /api/city/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `int`    | **Required**. Id of item to delete |


## Deployment Instructions

### Deployment instructions for the backend

1.	Download this git repository
2.	Install the dependencies with the command
```
npm install
```
4.	Create our development environment with the following command
```
python -m venv venv
```
6.	Activate the development environment
```
source vnev/bin/activate
```
8.	Install the requirements with the command
```
pip install -r requirements.txt
```
10.	Go into the backend folder
```
cd backend
```
12.	Run flask
```
python -m flask run
```

### Deployment instructions for the frontend

1.	Download this git repository
2.	Install the dependencies with the command
```
npm install
```
3.	Go into the frontend folder
```
cd frontend
```
12.	Run npm
```
npm start
```


## Tests
The tests are carried out through Postman, the instructions are as follows

1.	Download [Postman]([https://docs.python.org/3/](https://www.postman.com/downloads/))
2.	Import the [collections json file](https://github.com/oliveramezquita/client-service/blob/main/Client-service.postman_collection.json)
```
File > Import
```
