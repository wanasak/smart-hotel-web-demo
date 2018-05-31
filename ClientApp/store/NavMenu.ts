import { Reducer } from 'redux';
import { History, Location } from 'history';
import { AppThunkAction } from 'ClientApp/store';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface NavMenuState {
    isHome: boolean;
}

const initialState: NavMenuState = {
    isHome: true
};

interface NavigationAction { type: 'NAVIGATE_ACTION' }
interface NavigationHomeAction { type: 'NAVIGATE_HOME_ACTION' }

type KnowAction = NavigationAction | NavigationHomeAction;

// ---------------
// FUNCTIONS - Our functions to reuse in this code.
function checkIsHome(pathName: string): boolean {
    return pathName === './';
}

function chooseDispatcher(location: Location, dispatch: (action: KnowAction) => void): void {
    if (checkIsHome(location.pathname)) {
        dispatch({ type: 'NAVIGATE_HOME_ACTION' });
        return;
    }

    dispatch({ type: 'NAVIGATE_ACTION' });
}

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const actionCreators = {
    listen: (history: History): AppThunkAction<KnowAction> => (dispatch, getState) => {
        history.listen((location: Location) => chooseDispatcher(location, dispatch));
        chooseDispatcher(history.location, dispatch);
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer: Reducer<NavMenuState> = (state: NavMenuState, action: KnowAction) => {
    switch (action.type) {
        case 'NAVIGATE_ACTION':
            return { ...state, isHome: false };
        case 'NAVIGATE_HOME_ACTION':
            return { ...state, isHome: true };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || { ...initialState };
};
