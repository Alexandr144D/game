import React from 'react';
import './SquareComponent.css';
import { connect } from 'react-redux';
import { onSuccessToClickSquare } from '../../reducer/actions';
import PropTypes from "prop-types";


class SquareComponent extends React.Component {
    onCatchTheSquare(index) {
        const { currentIndex, backgroundColors } = this.props;

        if( currentIndex === index && !backgroundColors[currentIndex].checked) {
            this.props.onSuccess(index);
            this.setState({ showIcon: true })
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
        history: state.gameReducer.history
    }
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        onSuccess: (index) => dispatch(onSuccessToClickSquare(index))
    }
};

SquareComponent.propTypes = {
    history: PropTypes.array,
    currentIndex: PropTypes.number,
    backgroundColors: PropTypes.array,
    onCatchTheSquare: PropTypes.func,
    onSuccess: PropTypes.func,

};

export default connect(mapStateToProps, mapDispatchToProps)(SquareComponent);