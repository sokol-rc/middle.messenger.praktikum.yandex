const withAuthRedirect = (Component) => {
	const { store } = () => (window.store);
    return class extends Component<any> {
        constructor(props) {
            super(props);
        }
    };
};
export default withAuthRedirect;
