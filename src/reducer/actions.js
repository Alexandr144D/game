import * as constants from './constants';


export const onSuccessToClickSquare = (index) => (dispatch) => {
    return dispatch({ type: constants.CHANGE_SQUARE_COLOR_SUCCESS, index: index })
};

export const onFailToClickSquare = (index) => (dispatch) => {
    return dispatch({ type: constants.CHANGE_SQUARE_COLOR_FAIL, index: index })
};

export const startTheGame = (index) => (dispatch) => {
    return dispatch({ type: constants.START_THE_GAME, index: index})
}

export const finishTheGame = () => (dispatch) => {
    return dispatch({ type: constants.FINISH_THE_GAME })
}

export const onSetTimer = (value) => (dispatch) => {
    return dispatch({ type: constants.SET_TIMER_INTERVAL, value: value})
}

export const onReset = () => (dispatch) => {
    return dispatch({ type: constants.RESET_GAME_PROCESS })
};