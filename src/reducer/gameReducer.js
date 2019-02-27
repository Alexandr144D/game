import * as constants from './constants.js';

const squareFeatures = function(n) {
    const arr = [];
    for( let i = 0; i <= n; i++ ) {
        if( i > n ) {
            break
        }
        arr.push({ background: '#3366FF', checked: false });
    }
    return arr;
};

const initialGameState = {
    backgroundColors: squareFeatures(10),
    gameInProcess: false,
    currentIndex: null,
    computerScore: 0,
    playerScore: 0,
    timeValue: '',
    history: [],
    modal: false,
};

const gameReducer = (state = initialGameState, action) => {
    switch(action.type){
        case constants.CHANGE_SQUARE_COLOR_SUCCESS:
            let newSuccessArray = state.backgroundColors.slice();

            newSuccessArray[action.index].background = '#fff509';
            newSuccessArray[action.index].checked = true;

            return { ...state,
                backgroundColors: newSuccessArray,
                playerScore: state.playerScore + 1
            };

        case constants.CHANGE_SQUARE_COLOR_FAIL:
            let newFailArray = state.backgroundColors.slice();

            newFailArray[action.index].background = '#ff4050';

            return { ...state,
                backgroundColors: newFailArray,
                computerScore: action.index === 10 ? state.computerScore : state.computerScore + 1
            };

        case constants.START_THE_GAME:
            let intervalChangeArray = state.backgroundColors.slice();
            let newHistory = state.history.slice();

            intervalChangeArray[action.index].background = '#5cff3b';
            newHistory.push(action.index);

            return {
                ...state,
                backgroundColors:
                intervalChangeArray,
                gameInProcess: true,
                history: newHistory,
                currentIndex: action.index
            };

        case constants.FINISH_THE_GAME:
            return {
                ...state,
                modal: true,
                timeValue: '',
                gameInProcess: false,
            };

        case constants.SET_TIMER_INTERVAL:
            return { ...state,
                timeValue: action.value
            };

        case constants.RESET_GAME_PROCESS:
            return {
                ...state,
                backgroundColors: squareFeatures(10),
                gameInProcess: false,
                currentIndex: null,
                computerScore: 0,
                playerScore: 0,
                timeValue: '',
                history: [],
                modal: false
            };

        default:
            return state
    }
}

export default gameReducer;