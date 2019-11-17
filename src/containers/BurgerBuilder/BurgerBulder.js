import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index'
import axios from '../../axios-orders';


class BurgerBulder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount () {
        this.props.onInitIngridients();
    }

    updatePurchaseState ( ingridients ) {
        const sum = Object.keys(ingridients).map(igKey => {
            return ingridients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum>0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };

        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = this.props.error ?  <p>Error</p> : <Spinner/>;

        if (this.props.ings){
            burger = (
                <Aux>
                    <Burger ingridients={this.props.ings} />
                    <BuildControls
                        ingridientAdded={this.props.onIngridientAdded}
                        ingridientRemoved={this.props.onIngridientRemoved}
                        disabled={disabledInfo}
                        purchaseable={ this.updatePurchaseState( this.props.ings )}
                        ordered={this.purchaseHandler}
                        price = {this.props.price}/>;
                </Aux>
            );
            orderSummary = <OrderSummary
                    ingridients={this.props.ings}
                    price={this.props.price.toFixed(2)}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingridients,
        price: state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngridientAdded: (ingName) => dispatch(burgerBuilderActions.addIngridient(ingName)),
        onIngridientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngridient(ingName)),
        onInitIngridients: () => dispatch(burgerBuilderActions.initIngridients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBulder, axios));