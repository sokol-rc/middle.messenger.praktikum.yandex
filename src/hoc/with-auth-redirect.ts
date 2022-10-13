const withAuthRedirect = (Component) => {
	const { store } = () => (window.store);
   // console.log(window.store.getState());
    console.log(store);

    return class extends Component<any> {
        constructor(props) {
            super(props);
        }
    };
};
export default withAuthRedirect;
