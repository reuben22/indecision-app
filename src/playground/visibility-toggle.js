class VisibilityToggle extends React.Component {
	constructor(props) {
		super(props);
		this.toggleShowDetails = this.toggleShowDetails.bind(this);
		this.state = {
			showDetails: false
		};
	}

	toggleShowDetails() {
		this.setState((prevState) => {
			return {
				showDetails: !prevState.showDetails
			}
		})
	};

	render() {
		return (
				<div>
					<h1>Visibility Toggle</h1>
					<button onClick={this.toggleShowDetails}>{ this.state.showDetails ? "Hide Details" : "Show Details"}</button>
					{ this.state.showDetails && <p>Hey, These are some details you can now see!</p>}
				</div>
			)
	}


}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));



/*const appDetails = {
	buttonLabel: "Show Details",
	showDetails: false
};

const toggleShowDetails = () => {
	appDetails.showDetails = !appDetails.showDetails;
	appDetails.buttonLabel = appDetails.showDetails ? "Hide Details" : "Show Details";
	render();
};

const appRoot = document.getElementById('app');

const render = () => {
	const template = (
		<div>
			<h1>Visibility Toggle</h1>
			<button onClick={toggleShowDetails}>{appDetails.buttonLabel}</button>
			{ appDetails.showDetails && <p>Hey, These are some details you can now see!</p>}
		</div>
	);
	ReactDOM.render(template, appRoot);
}

render();*/