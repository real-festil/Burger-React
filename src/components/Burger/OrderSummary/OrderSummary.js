import React from 'react';
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Aux';

const orderSummary = ( props ) => {
    const ingridientsSummary = Object.keys(props.ingridients)
        .map(igKey => {
            return (
            <li>
                <span style={{textTransform: 'capitalize'}}>
                {igKey}: {props.ingridients[igKey]}</span>
            </li>);
        });

    return (
      <Aux>
          <h3>Your order</h3>
          <p>A delicious burger with a following ingridients:</p>
          <ul>
            {ingridientsSummary}
          </ul>
          <p>Total price: {props.price}</p>
          <p>Continue to check out?</p>
          <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
          <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    );
};

export default orderSummary;