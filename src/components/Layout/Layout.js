import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Sidedrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer:true});
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer:false});
    }

    render () {
        return (
            <Aux>
                <Toolbar opened={this.sideDrawerOpenHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler}
                    />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
     }
}

export default Layout;