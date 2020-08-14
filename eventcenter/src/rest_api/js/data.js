
function host(endpoint) {
    return `https://api.backendless.com/166AD46B-8A6A-E292-FF8F-0B9077D30700/D7A10867-811F-482F-A58B-E8B9070B9361/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    EVENT: 'data/event',
    GUESTS: 'data/guests',
    EMAILS: 'messaging/email',
    USER: 'users',
    GETUSERS: '/data/Users'
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
    localStorage.setItem('userid', data.objectId);

    return data;
}

//logout
export async function logoutApi() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    localStorage.removeItem('userToken');
    localStorage.removeItem('email'); //ако е нужно?
    localStorage.removeItem('userid');

    const response = await fetch(host(endpoints.LOGOUT), {
        method: 'GET',
        headers: {
            'user-token': token
        }
    });
    return response;
}

//get event by Id
export async function getEventById(id) {
    const response = await fetch(host(endpoints.EVENT + '/' + id + `?relationsDepth=1`));
    const data = await response.json();
    if(response.status === 404){
        throw new Error(`Page not found`);
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
    const ownerId = localStorage.getItem('userid');

    const result = fetch(host(endpoints.EVENT + `?where=ownerId%3D%27${ownerId}%27`), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    });

    // const data = await result.json();

    // if (data.hasOwnProperty('errorData')) {
    //     const error = new Error();
    //     Object.assign(error, data);
    //     throw error;
    // }
    return result;
    // return data;
}

//edit event
export async function updateEvent(eventid, updatedProps) {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const result = fetch(host(endpoints.EVENT + "/" + eventid), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    });

    return result;
    // const data = await result.json();

    // if (data.hasOwnProperty('errorData')) {
    //     const error = new Error();
    //     Object.assign(error, data);
    //     throw error;
    // }
    // return data;
}

// delete event
export async function deleteEvent(id) {

    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const result = fetch(host(endpoints.EVENT + "/" + id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    });

    return result;

    // const data = await result.json();

    // if (data.hasOwnProperty('errorData')) {
    //     const error = new Error();
    //     Object.assign(error, data);
    //     throw error;
    // }
    // return data;
}

//create Guest
export async function createGuest(guest) {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const response = await fetch(host(endpoints.GUESTS), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(guest)
    });
    const data = await response.json();

    if (data.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, data);
        throw error;
    }

    return data;
}


//set guestId to event
export async function setEventGuestId(guestid, eventid) {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const response = await fetch(host(endpoints.EVENT + "/" + eventid + "/guests_id"), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify([`${guestid}`])
    });

    const data = await response.json();

    if (data.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, data);
        throw error;
    }

    return data;
}

//get all guests in an event
export async function getAllGuestsByEventId(eventid) {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const result = fetch(host(endpoints.EVENT + `/${eventid}?loadRelations=guests_id`), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    });
    // const data = await result.json();

    // if (data.hasOwnProperty('errorData')) {
    //     const error = new Error();
    //     Object.assign(error, data);
    //     throw error;
    // }
    // return data;
    return result;
}


//delete guest
export async function deleteGuest(id) {

    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const result = fetch(host(endpoints.GUESTS + "/" + id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    });

    return result;

    // should I update event?;

}

//sending emails to the guests
export async function sendingEmails(guestsEmails, ownerName, eventName, eventLink) {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const result = await fetch(host(endpoints.EMAILS), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify({
            "subject": "Event center Invitation",
            "bodyparts": {
                "textmessage": `Hello!\nYou have new invitation for ${eventName} from ${ownerName}.\nFor more details, please follow the link: ${eventLink}\n\nBest regards,\nEvent center`
            },
            "to": guestsEmails
        })
    });

    return result;
}

//get owner name by ownerId
export async function getOwnerNameByOwnerId() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const ownerId = localStorage.getItem('userid');
    const response = await fetch(host(endpoints.USER + "/" + ownerId));

    const data = await response.json();
    const ownerName = data.name;
    return ownerName;
}

//guest's confirmation
export async function guestConfirmation(guestid) {

    const result = await fetch(host(endpoints.GUESTS + `/${guestid}`), {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(
                { 
                "is_pending": false,
                 "is_attending": true 
                })
    });
    const data = await result.json();
    return data;
}

//guest's confirmation
export async function guestRejection(guestid) {

    const result = await fetch(host(endpoints.GUESTS + `/${guestid}`), {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(
                { 
                "is_pending": false,
                 "is_attending": false 
                })
    });
    const data = await result.json();
    return data;
}

//get guestid
// export async function getGuestId(eventid, guestid) {
//     let allGuest = getAllGuestsByEventId(eventid);

//     // `?where=email%3D%27${guestEmail}%27`
//     // `?where=email%3D%27nia_kuneva@abv.bg%27`

//     const result = fetch(host(endpoints.EVENT + `/${eventid}`), {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     // const data = await result.json();

//     // if (data.hasOwnProperty('errorData')) {
//     //     const error = new Error();
//     //     Object.assign(error, data);
//     //     throw error;
//     // }
//     // return data;
//     return result;
// }

//get all public events by date
export async function getAllPublicEvents(){
    const result = await fetch(host(endpoints.EVENT + `?where=is_public%3Dtrue`), {
        headers: {
            'Content-Type': 'application/json'
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

export async function joinEvent(eventid){
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const guestid = localStorage.getItem('userid');

    const response = await fetch(host(endpoints.EVENT + "/" + eventid + "/users_id"), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify([`${guestid}`])
    });

    const data = await response.json();

    if (data.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, data);
        throw error;
    }

    return data;
}

export async function getAllJoinedUsersByEventId(eventid){
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const result = await fetch(host(endpoints.EVENT + `/${eventid}?loadRelations=users_id`), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    });
    // const data = await result.json();

    // if (data.hasOwnProperty('errorData')) {
    //     const error = new Error();
    //     Object.assign(error, data);
    //     throw error;
    // }
    // return data;
    return result;
}

export async function getCoutJoinedUsersByEventId(eventid){
    const token = localStorage.getItem('userToken');

    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const result = await fetch(host(endpoints.GETUSERS + `/count?where=Event%5Busers_id%5D.objectId%20%3D%20%27${eventid}%27`), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    });
    // const data = await result.json();

    // if (data.hasOwnProperty('errorData')) {
    //     const error = new Error();
    //     Object.assign(error, data);
    //     throw error;
    // }
    // return data;
    return result;
}

// `/data/Users/count?where=Event%5Busers_id%5D.objectId%20%3D%20%27${eventid}%27`