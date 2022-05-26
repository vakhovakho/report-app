const API_URL = 'http://178.63.13.157:8090/mock-api/api';

export function getProjects() {
    return fetch(API_URL + '/projects')
        .then(checkResponse);
}

export function getGateways() {
    return fetch(API_URL + '/gateways')
        .then(checkResponse);
}

export function getReport(filters) {
    return fetch(API_URL + '/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filters)
    })
        .then(checkResponse);
}

function checkResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${ response.status }`);
      }
  
      return response.json();
}