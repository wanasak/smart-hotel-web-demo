import * as React from 'react';

type LoadingProps = {
    isBright?: boolean
};

export default class Loading extends React.Component<LoadingProps, {}> {
    public render() {
        return <div className="{'sh-loading' + ()}">
            Loading...
        </div>;
    }
}
