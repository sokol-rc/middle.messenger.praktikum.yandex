import isEqual from 'utils/helpers/isequal';
import Block from './Block';

export default function connect(mapStateToProps: (state: Indexed) => Indexed, mapDispatchToProps = {}) {

    return function (Component: typeof Block) {
        return class extends Component<any> {
            constructor(props) {
				const { store } = window;

                // сохраняем начальное состояние
				const state = mapStateToProps(store.getState());
				
				const actionCreators = {}

				Object.keys(mapDispatchToProps).forEach((actionCreator) => { 
					actionCreators[actionCreator] = (payload) => store.dispatch(mapDispatchToProps[actionCreator], payload)
				})

                super({ ...props, ...state, ...actionCreators });

                // подписываемся на событие
                store.on('changed', (state) => {
                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    // не забываем сохранить новое состояние
                    state = newState;
                });
            }
        };
    };
}
