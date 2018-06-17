import * as React from 'react';
import * as Modal from 'react-modal';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as ModalDialogStore from '../store/ModalDialog';

type ModalDialogProps = ModalDialogStore.ModalDialogState
    & { callback: Function }
    & typeof ModalDialogStore.actionCreator;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0
    }
}

class ModalDialog extends React.Component<ModalDialogProps, {}> {
    componentDidMount() {
        this.props.onRef(this);
    }
    componentWillMount() {
        this.props.onRef(undefined);
    }
    
    public close = () => {
        this.props.close();
        this.props.callback();
    }

    public open = () => {
        this.props.open();
    }

    public render() {
        return <Modal 
            isOpen={this.props.isModalOpen}
            contentLabel='Modal'
            style={customStyles}
            onRequestClose={this.close}> 
            {this.props.children}
        </Modal>
    }
}

export default connect(
    (state: ApplicationState) => state.modalDialog,
    ModalDialogStore.actionCreator
)(ModalDialog) as any;