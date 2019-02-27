import React from 'react';
import './SquareComponent.css';
import { connect } from 'react-redux';
import {finishTheGame, onSuccessToClickSquare} from '../../reducer/actions';
import PropTypes from "prop-types";


class SquareComponent extends React.Component {
    onCatchTheSquare(index) {
        const { currentIndex, backgroundColors, playerScore, timerId } = this.props;

        if( currentIndex === index && !backgroundColors[currentIndex].checked) {
            this.props.onSuccess(index);
            this.setState({ showIcon: true });

            if(playerScore === 9){
                this.props.onFinishGame();
                clearInterval(timerId);
            }
        }
    }

    render(){
        const { index, background } = this.props;
        return (
            <div
                index={index}
                className="squareComponent-item"
                style={{ background: background, display: index === 10 && 'none' }}
                onClick={() => this.onCatchTheSquare(index)}
            >
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        backgroundColors: state.gameReducer.backgroundColors,
        currentIndex: state.gameReducer.currentIndex,
        playerScore: state.gameReducer.playerScore,
        history: state.gameReducer.history,
        timerId: state.gameReducer.timerId
    }
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        onFinishGame: () => dispatch(finishTheGame()),
        onSuccess: (index) => dispatch(onSuccessToClickSquare(index))
    }
};

SquareComponent.propTypes = {
    history: PropTypes.array,
    currentIndex: PropTypes.number,
    backgroundColors: PropTypes.array,
    onCatchTheSquare: PropTypes.func,
    playerScore: PropTypes.number,
    timerId: PropTypes.number,
    onSuccess: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SquareComponent);