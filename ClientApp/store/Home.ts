import { Reducer } from 'redux';
import { AppThunkAction } from 'ClientApp/store';
import { addTask } from 'domain-task';

interface Testimonial {
    customerName: string;
    text: string;
}

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface HomeState {
    testimonial: Testimonial;
    isLoading: boolean;
}

const initialState: HomeState = {
    testimonial: {} as Testimonial,
    isLoading: false
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.
interface RequestTestimonialAction { type: 'REQUEST_TESTINOMIAL_ACTION' };
interface ReceiveTestimonialAction { type: 'RECEIVE_TESTIMONIAL_ACTION', testimonial: Testimonial }

type KnownAction = RequestTestimonialAction | ReceiveTestimonialAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const actionCreators = {
    requestTestimonial: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch(`/api/Testimonials`)
            .then(resposne => resposne.json() as Promise<Testimonial>)
            .then(data => {
                dispatch({ type: 'RECEIVE_TESTIMONIAL_ACTION', testimonial: data });
            });
        
        dispatch({ type: 'REQUEST_TESTINOMIAL_ACTION' });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer: Reducer<HomeState> = (state: HomeState, action: KnownAction) => {
    switch (action.type) {
        case 'REQUEST_TESTINOMIAL_ACTION':
            return { ...state, isLoading: true };
        case 'RECEIVE_TESTIMONIAL_ACTION':
            return { ...state, isLoading: false, testimonial: action.testimonial };
        default:
            const exhaustiveCheck: never = action; 
    }

    return state || { ...initialState };
};
