import {TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE} from '../types.js'

const {REACT_APP_API_ENDPOINT} = process.env


export const taskRequest = () =>({
    type: TASKS_REQUEST
})

export const taskSuccess = (data) =>({
    type: TASKS_SUCCESS,
    payload: data
})

export const taskFailure = (error) =>({
    type: TASKS_FAILURE,
    payload: error
})

export const getTasks = (path) => dispatch => {
    dispatch(taskRequest())
    fetch(`${REACT_APP_API_ENDPOINT}/task/${path}`,{
        headers : {'Content-Type' : 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    }).then(response => response.json())
    .then(data => dispatch(taskSuccess(data.result)))
    .catch(error => dispatch(taskFailure(error)))
}

export const deleteTask = (id) => dispatch => {
    dispatch(taskRequest())
    fetch(`${REACT_APP_API_ENDPOINT}/task/${id}`,{
        method: 'DELETE',
        headers : {'Content-Type' : 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    }).then(response => response.json())
    .then(() => dispatch(getTasks('')))
    .catch(error => dispatch(taskFailure(error)))
}

export const editTaskStatus = (data) => dispatch => {

    const statusArray = ['NEW', 'IN PROGRESS', 'FINISHED']

    const newStatusIndex = statusArray.indexOf(data.status) > 1 ? 0 : statusArray.indexOf(data.status) + 1

    dispatch(taskRequest())
    fetch(`${REACT_APP_API_ENDPOINT}/task/${data._id}`,{
        method: 'PATCH',
        headers : {'Content-Type' : 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({
        task:{
            title: data.title,
            importance: data.importance,
            status: statusArray[newStatusIndex],
            description: data.description
        }
    })
    }).then(response => response.json())
    .then(() => dispatch(getTasks('')))
    .catch(error => dispatch(taskFailure(error)))
}
