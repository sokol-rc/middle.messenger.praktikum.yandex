import { RootStateType } from 'index';
import {
    ActionsTypes,
    Dispatch,
    DispatchThunk,
    RootReducerType,
} from 'reducers/authReducer';
import isEqual from 'utils/helpers/isequal';
import EventBus from '../EventBus';

export type StoreEvents = 'updated';
export interface Store {
    [x: string]: unknown;
}

export class Store extends EventBus {
    private state: any = {};

    private rootReducer: RootReducerType;

    private nextState: Partial<RootStateType>;

    private isDispatching: boolean;

    constructor(defaultState: RootStateType, rootReducer: RootReducerType) {
        super();
        this.state = defaultState;
        this.rootReducer = rootReducer;
        this.isDispatching = false;
        this.nextState = {};
        this.set(defaultState);
    }

    public getState() {
        return this.state;
    }

    public set(nextState: Partial<RootStateType>) {
        const prevState = { ...this.state };

        if (!isEqual(prevState, nextState)) {
            this.state = { ...this.state, ...nextState };

            this.emit('changed', prevState, nextState);
        }
    }

    dispatch(
        actionCreatorOrThunk: Dispatch<ActionsTypes> | DispatchThunk,
        payload: any
    ) {
        const action = actionCreatorOrThunk(payload);

        if (this.isDispatching) {
            throw new Error('1 action за раз');
        }

        if (typeof action === 'function') {
            // @ts-expect-error
            action(this.dispatch.bind(this));
        } else {
            try {
                this.isDispatching = true;
                // @ts-expect-error
                this.nextState = this.rootReducer(this.state, action);
            } finally {
                this.isDispatching = false;
                this.set({
                    ...this.state,
                    ...this.nextState,
                });
            }
        }
    }
}
