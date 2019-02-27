import React from 'react';
import { connect } from 'react-redux';
import { startTheGame, finishTheGame, onFailToClickSquare } from "../../reducer/actions";
import PropTypes from "prop-types";


class StartGameComponent extends React.Component {

    componentWillMount(){
        let array = new Set();
        array.add(Math.round(Math.random() * (9 + 1)));
    }

    interval = () => {
        let array = [];
        for(let i = 1; i <= 100; i++){
            array.push(i)
        }

        let random = array.sort(function() {
            return .5 - Math.random();
        });

        random.unshift(100);

        if( !this.props.timeValue || this.props.timeValue > 10000 ) {
            return
        }

        let timerId = setInterval(() => {
            this.props.onStartGame(random.pop(), timerId);

            if(this.props.history.length > 1) {
                let index = this.props.history[this.props.history.length - 2];

                if(!this.props.backgroundColors[index].checked) {
                    this.props.onFailToClick(index);

                    if(this.props.computerScore === 10) {
                        clearInterval(timerId);
                        this.props.onFinishGame();
                    }
                }
            }
            if( !random.length ) {
                this.props.onFailToClick(this.props.history[this.props.history.length - 1]);
                this.props.onFinishGame();
                clearInterval(timerId);
            }
        },this.props.timeValue)
    };

    render(){
        return(
            <div>
                <button onClick={() => this.interval()} > Start Game </button>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        history: state.gameReducer.history,
        timeValue: state.gameReducer.timeValue,
        playerScore: state.gameReducer.playerScore,
        computerScore: state.gameReducer.computerScore,
        backgroundColors: state.gameReducer.backgroundColors
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFinishGame: () => dispatch(finishTheGame()),
        onStartGame: (index, id) => dispatch(startTheGame(index, id)),
        onFailToClick: (index) => dispatch(onFailToClickSquare(index)),
    }
};

StartGameComponent.propTypes = {
    history: PropTypes.array,
    timeValue: PropTypes.string,
    backgroundColors: PropTypes.array,
    onFailToClick: PropTypes.func,
    computerScore:PropTypes.number,
    playerScore: PropTypes.number,
    onFinishGame: PropTypes.func,
    onStartGame: PropTypes.func,
    interval: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartGameComponent);