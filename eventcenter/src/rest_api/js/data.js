function host(endpoint) {
    return `https://api.backendless.com/166AD46B-8A6A-E292-FF8F-0B9077D30700/D7A10867-811F-482F-A58B-E8B9070B9361/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    EVENT: 'data/event'
};

//register
export async function register(name, email, password) {
    const response = await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });
    const data = await response.json();
    return data;
}

//login
export async function login(email, password) {
    const response = await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: email,
            password
        })
    });
    const data = await response.json();

    localStorage.setItem('userToken', data['user-token']);
    localStorage.setItem('email', data.email); //нужно ли е?
    localStorage.setItem('userId', data.objectId);

    return data;
}

//logout
export async function logout() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    localStorage.removeItem('userToken');
    localStorage.removeItem('email'); //ако е нужно?
    localStorage.removeItem('userId');

    const response = await fetch(host(endpoints.LOGOUT), {
        method: 'GET',
        headers: {
            'user-token': token
        }
    });
    return response;
}

//set category_id to event
export async function setEventCategoryId(eventId, categoryId) {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const response = await fetch(host(endpoints.EVENT + "/" + eventId + "/category_id"), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify([`${categoryId}`]) //body: [`${categoryId}`]
    });

    const data = await response.json();

    if (data.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, data);
        throw error;
    }

    return data;
}

//create new event
export async function createEvent(event) {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const response = await fetch(host(endpoints.EVENT), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(event)
    });
    const data = await response.json();

    if (data.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, data);
        throw error;
    }

    return data;
}

//get events by user ID
export async function getEventsByOwnerId() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error(`User is not logged in`);
    }
    const ownerId = localStorage.getItem('userId');

    const result = fetch(host(endpoints.EVENT + `?where=ownerId%3D%27${ownerId}%27`), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    });

    const data = await result.json();

    if (data.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, data);
        throw error;
    }
    return data;
}

//edit event
export async function updateEvent(id, updatedProps) {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const result = fetch(host(endpoints.EVENT + "/" + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    });

    const data = await result.json();

    if (data.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, data);
        throw error;
    }
    return data;
}

//delete event
// export async function deleteEvent(id) {

//     const token = localStorage.getItem('userToken');

//     const result = fetch(host(endpoints.EVENT + "/" + id), {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//             'user-token': token
//         }
//     });

//     const data = await response.json();

//     if (data.hasOwnProperty('errorData')) {
//         const error = new Error();
//         Object.assign(error, data);
//         throw error;
//     }
//     return data;
// }


