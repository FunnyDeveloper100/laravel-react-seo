import {combineReducers} from 'redux'

const configs = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CONFIG':
            return [
                ...state,
                {
                    key: action.key,
                    value: action.value
                }
            ];
        default:
            return state;
    }
};

const themeOptions = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_THEME_OPTION':
            return action.options;
        default:
            return state;
    }
};

export default combineReducers({
    configs,
    themeOptions
})

