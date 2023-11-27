import {
    increaseCounter,
    decreaseCounter,
} from "../../redux/actions/counterAction";
import { connect } from "react-redux";
import './HomePage.scss'


function HomePage(props) {
    return (
        <div>
            <h1 className="text-center">HomePage</h1>
            <div className="mx-auto w-25">
                <h3 className="text-center">Count: {props.count}</h3>
                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn btn-primary mx-2" onClick={() => props.increaseCounter()}>Increase Count</button>
                    <button className="btn btn-warning mx-2" onClick={() => props.decreaseCounter()}>Decrease Count</button>
                </div>

            </div>
            <div className="p-5">
                <img className="image" src="anhdepvietnam.jpg" />
            </div>
        </div >
    );
}

const mapStateToProps = state => {
    return {
        count: state.counter.count,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        increaseCounter: () => dispatch(increaseCounter()),

        decreaseCounter: () => dispatch(decreaseCounter()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)