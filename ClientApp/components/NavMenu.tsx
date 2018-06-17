import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import Auth from './Auth';
import * as NavMenuStore from '../store/NavMenu';

type NavMenuProps =
    NavMenuStore.NavMenuState
    & typeof NavMenuStore.actionCreators
    & RouteComponentProps<{}>;

class NavMenu extends React.Component<NavMenuProps, {}> {

    public render() {
        return <div className={`sh-nav_menu ${this.props.isHome ? 'is-home' : ''}`}>
            <Link to={'/'} className='sh-nav_menu-container'>
                <img className={`sh-nav_menu-logo ${this.props.isHome ? 'is-home' : ''}`} src='/assets/images/logo.svg' />
            </Link>
            <ul className='sh-nav_menu-links'>
                <Auth />
            </ul>
        </div>;
    }
    public componentDidMount() {
        this.props.listen(this.props.history);
    }
}

export default connect(
    (state: ApplicationState) => state.nav,
    NavMenuStore.actionCreators
)(NavMenu) as typeof NavMenu;