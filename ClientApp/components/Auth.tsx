import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import Loading from './Loading';
import * as UserStore from '../store/User';

type AuthProps = UserStore.UserState
    & typeof UserStore.actionCreators;

class Auth extends React.Component<AuthProps, {}> {
    private renderLogin() {
        if (!this.props.name && !this.props.isLoading) {
            return <li>
                <span className='sh-auth-link' onClick={() => this.props.login() }>Login</span>
            </li>;
        }
    }

    private renderLoading() {
        if (this.props.isLoading) {
            return <li>
                <Loading isBright={true} />
            </li>
        }
    }

    private renderLogout() {
        if (this.props.name && !this.props.isLoading) {
            return <li className='sh-auth-group'>
                <section className='sh-auth-profile'>
                    <div className='sh-auth-name'>
                        {this.props.name}
                    </div>
                    <span className='sh-auth-link' onClick={() => this.props.logout() }>Logout</span>
                </section>
                <img src={this.props.gravatar} title={this.props.name} className='sh-auth-picture'/>
            </li>;
        }
    }

    public render() {
        return <div className='sh-auth'>
            {this.renderLogin()}
            {this.renderLoading()}
            {this.renderLogout()}
        </div>;
    }

    public componentDidMount() {
        this.props.init();
    }
}

export default connect(
    (state: ApplicationState) => state.user,
    UserStore.actionCreators
)(Auth) as any;