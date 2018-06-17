import * as React from 'react';

type SwitchProps = {
    label: string,
    checked?: boolean
}

export default class Switch extends React.Component<SwitchProps, {}> {
    private id = Math.random() + '';
    private handleOnChange = () => {}

    public render() {
        return <div className='sh-switch'>
            <label className='sh-switch-button'>
                <input type='checkbox' id={this.id} onChange={this.handleOnChange} />
                <span className='sh-switch-slider'></span>
            </label>
            <label htmlFor={this.id} className='sh-switch-title'>{this.props.label}</label>
        </div>;
    }
}