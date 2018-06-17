import * as React from 'react';
import NavMenu from './NavMenu';
import Footer from './Footer';

export default class Layout extends React.Component<{}, {}> {
    public render() {
        return <div className='sh-site'>
            <section className='sh-content'>
                { this.props.children }
            </section>
            <Footer />
        </div>;
    }
}
