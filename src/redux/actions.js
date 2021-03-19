import {ADD_SERVICE, GET_SERVICES, RESET_SERVICES} from "./types";
import Api from "./axios";

export function getServices(){
    return async dispatch => {
        const services = await Api.get('Service/')
        dispatch(
            {
                type: GET_SERVICES,
                payload: services.data
            }
        )
    }
}

export function addService(service){
    return async dispatch => {
        const user = await Api.post('/todos', service)
        dispatch(
            {
                type: ADD_SERVICE,
                payload: service
            }
        )
    }
}

export function resetService(){
    return dispatch => {
        dispatch(
            {
                type: RESET_SERVICES,
            }
        )
    }
}

