import isEqual from 'utils/helpers/isequal';
import EventBus from '../EventBus';

export enum StoreEvents {
    Updated = 'updated',
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
export class Store<State extends Record<string, any>> extends EventBus {
    private state: Indexed = {};

    constructor(defaultState: State, rootReducer) {
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

    public set(nextState: Partial<State>) {
		const prevState = { ...this.state };

		if (!isEqual(prevState, nextState)) { 
			this.state = { ...this.state, ...nextState };

			this.emit('changed', prevState, nextState);
		}
	}
	

	dispatch(actionCreatorOrThunk: Action<State>, payload: any) {

		const action = actionCreatorOrThunk(payload);
		

		if (this.isDispatching) {
            throw new Error('1 action за раз');
		}

		if (typeof action === 'function') {
			action(this.dispatch.bind(this));
		  } else {
			try {
				this.isDispatching = true;
				this.nextState = this.rootReducer(this.state, action);
			}
			finally {
				this.isDispatching = false;
				this.set({
					...this.state,
					...this.nextState,
				});
			}
		  }

		

        


        // if (typeof nextStateOrAction === 'function') {
        //     nextStateOrAction(this.dispatch.bind(this), this.state, payload);
        // } else {
        //     this.set({ ...this.state, ...nextStateOrAction });
        // }
    }
}
