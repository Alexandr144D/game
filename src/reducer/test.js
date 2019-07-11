import * as type from './constants';
import {gameReducer, initialGameState, squareFeatures} from './gameReducer';
import {onSuccessToClickSquare} from './actions';


describe('actions tests', () => {
    it('test CHANGE_SQUARE_COLOR_SUCCESS', () => {
        const action = {type: type.CHANGE_SQUARE_COLOR_SUCCESS, index: 1};
        let newSuccessArray = initialGameState.backgroundColors.slice();

        newSuccessArray[action.index].background = '#fff509';
        newSuccessArray[action.index].checked = true;

        expect(gameReducer(initialGameState, action)).toEqual({
            ...initialGameState,
            playerScore: action.index,
            backgroundColors: newSuccessArray,
        })
    });

    it('test CHANGE_SQUARE_COLOR_FAIL', () => {
        const action = {type: type.CHANGE_SQUARE_COLOR_FAIL, index: 1, id: 1};

        expect(gameReducer(initialGameState, action)).toEqual({
            ...initialGameState,
            computerScore: action.index
        })
    });

    it('test START_THE_GAME', () => {
        const action = {type: type.START_THE_GAME, index: 1};

        expect(gameReducer(initialGameState, action)).toEqual({
            ...initialGameState,
            currentIndex: action.index,
            history: [action.index],
            gameInProcess: true,
            timerId: action.id,
        })
    });

    it('test FINISH_THE_GAME', () => {
        const action = {type: type.FINISH_THE_GAME};

        expect(gameReducer(initialGameState, action)).toEqual({
            ...initialGameState,
            modal: true,
            timeValue: '',
            gameInProcess: false,
        })
    });

    it('test SET_TIMER_INTERVAL', () => {
        const action = {type: type.SET_TIMER_INTERVAL, value: Math.random()};

        expect(gameReducer(initialGameState, action)).toEqual({
            ...initialGameState,
            timeValue: action.value
        })
    });

    it('test RESET_GAME_PROCESS', () => {
        const action = {type: type.RESET_GAME_PROCESS};

        expect(gameReducer(initialGameState, action)).toEqual({
            ...initialGameState,
            backgroundColors: squareFeatures(100),
            gameInProcess: false,
            currentIndex: null,
            computerScore: 0,
            playerScore: 0,
            timeValue: '',
            history: [],
            timerId: 0,
            modal: false
        })
    })
});
