// @ts-nocheck
import React from "react";
class Test extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			brand: "Ford",
			model: "Mustang",
			color: "red",
			year: 1964,
		};
	}

	changeDetail = () => {
		this.setState({ color: "blue", brand: "Tesla", model: "Model S", year: 2020 });
	};

	componentDidMount(): void {
		console.log("Component did mount");
	}

	componentWillUnmount(): void {
		console.log("Component will unmount");
	}

	componentDidUpdate(): void {
		console.log("Component did update");
	}

	render() {
		return (
			<div>
				<h1>My {this.state.brand}</h1>
				<p>
					Color: {this.state.color} - Model: {this.state.model} from {this.state.year}.
				</p>
				<button type="button" onClick={this.changeDetail}>
					Change color
				</button>
			</div>
		);
	}
}

export default Test;
