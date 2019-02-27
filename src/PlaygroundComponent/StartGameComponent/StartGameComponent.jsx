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
        let random = [8,2,1,6,5,4,7,0,9,3].sort(function() {
            return .5 - Math.random();
        });

        random.unshift(10)

        if( !this.props.timeValue ) {
            return
        }
        if( this.props.timeValue > 10000 ) {
            return
        }
        let timerId = setInterval(() => {
            this.props.onStartGame(random.pop());

            if(this.props.history.length > 1) {
                let index = this.props.history[this.props.history.length - 2];
                if(!this.props.backgroundColors[index].checked) {
                    this.props.onFailToClick(index)
                }
            }
            if( !random.length ) {
                this.props.onFinishGame();
                clearInterval(timerId);
                this.props.onFailToClick(this.props.history[this.props.history.length - 1])
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
        backgroundColors: state.gameReducer.backgroundColors,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFinishGame: () => dispatch(finishTheGame()),
        onStartGame: (index) => dispatch(startTheGame(index)),
        onFailToClick: (index) => dispatch(onFailToClickSquare(index)),
    }
};

StartGameComponent.propTypes = {
    history: PropTypes.array,
    timeValue: PropTypes.string,
    backgroundColors: PropTypes.array,
    onFailToClick: PropTypes.func,
    onFinishGame: PropTypes.func,
    onStartGame: PropTypes.func,
    interval: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartGameComponent);