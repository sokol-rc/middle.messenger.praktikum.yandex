import isEqual from 'utils/helpers/isequal';
import Block from './Block';

export default function connect(
    mapStateToProps: (state: Indexed) => Indexed,
    mapDispatchToProps: Indexed = {}
) {
    // eslint-disable-next-line func-names
    return function (Component: typeof Block) {
        return class extends Component<any> {
            constructor(props: any) {
                const { store } = window;

                const state = mapStateToProps(store.getState());

                const actionCreators: Indexed = {};

                Object.keys(mapDispatchToProps).forEach((actionCreator) => {
                    actionCreators[actionCreator] = (payload: unknown) =>
                        store.dispatch(
                            mapDispatchToProps[actionCreator],
                            payload
                        );
                });

                super({ ...props, ...state, ...actionCreators });

                store.on('changed', (prevState: Indexed) => {
                    const newState = mapStateToProps(store.getState());

                    if (!isEqual(prevState, newState)) {
                        this.setProps({ ...newState });
                    }

                    prevState = newState;
                });
            }
        };
    };
}
