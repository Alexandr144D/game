import React from 'react';
import {connect} from "react-redux";
import {onSetTimer} from "../../reducer/actions";
import PropTypes from 'prop-types';


class TimeSetComponent extends React.Component {

    setTime(time){
        if(/\D/g.test(time) === true){
            return
        }
        if(/\D/g.test(time) === false) {
            this.props.onChangeValue(time)
        }
        if(time >= 10000) {
            this.props.onChangeValue('10000')
        }
    }
    render(){
        const { timeValue } = this.props;

        return(
            <div>
                <input
                    value={timeValue}
                    ref={(input) => { this.textInput = input; }}
                    onChange={() => this.setTime(this.textInput.value)}
                    placeholder='Set timer'
                    type='text'
                />
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        timeValue: state.gameReducer.timeValue
    }
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        onChangeValue: (value) => dispatch(onSetTimer(value))
    }
};

TimeSetComponent.propTypes = {
    onChangeValue: PropTypes.func,
    timeValue: PropTypes.string,
    setTime: PropTypes.func,

};

export default connect(mapStateToProps, mapDispatchToProps)(TimeSetComponent);