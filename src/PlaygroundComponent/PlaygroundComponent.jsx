import React from 'react';
import SquareComponent from "./SquareComponent/SquareComponent";
import './PlaygroundComponent.css';
import {connect} from "react-redux";
import StartGameComponent from "./StartGameComponent/StartGameComponent";
import TimeSetComponent from "./TimeSetComponent/TimeSetComponent";
import Modal from 'react-responsive-modal';
import { onReset } from "../reducer/actions";
import PropTypes from 'prop-types';

class PlaygroundComponent extends React.Component {

    adjustTime(time) {
        if(time.length < 4) {
            return time / 1000
        }
        if(time.length === 4) {
            return (time / 1000).toFixed(1)
        }
        else {
            return Math.round(time / 1000 )
        }
    }

    render(){
        const { backgroundColors, playerScore, computerScore, modal } = this.props;

        return (
            <div className="playground-wrapperState">
                <div className="top-bar">
                    <div className="score-container">
                        <div className="item-score computer">{ computerScore }</div>
                        <div className='action-container'>
                            <TimeSetComponent/>
                            { this.props.timeValue && <p className='current-time'>Speed { this.adjustTime(this.props.timeValue)} sec</p> }
                            <StartGameComponent />
                        </div>
                        <div className="item-score player">{ playerScore }</div>
                    </div>
                </div>
                <Modal open={modal} onClose={() => this.props.onReset()} center>
                    <h2>
                        {
                            playerScore > computerScore ? 'You won the game!' : 'You lost the game!'
                        }
                    </h2>
                </Modal>
                <div className="squares-container">
                    {
                        backgroundColors.map((item, index) => {
                            return (
                                <SquareComponent
                                    key={index}
                                    index={index}
                                    background={item.background}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        modal: state.gameReducer.modal,
        timeValue: state.gameReducer.timeValue,
        playerScore: state.gameReducer.playerScore,
        computerScore: state.gameReducer.computerScore,
        backgroundColors: state.gameReducer.backgroundColors,
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        onReset: () => dispatch(onReset())
    }
}

PlaygroundComponent.propTypes = {
    modal: PropTypes.bool,
    timeValue: PropTypes.string,
    playerScore: PropTypes.number,
    computerScore: PropTypes.number,
    backgroundColors: PropTypes.array,
    adjustTime: PropTypes.func,
    onReset: PropTypes.func,

};

export default connect(mapStateToProps, mapDispatchToProps)(PlaygroundComponent);