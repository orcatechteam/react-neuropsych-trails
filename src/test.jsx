import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Toolbar, Button, withStyles } from 'material-ui';
import Trails from './trails';

const UnicodeStart = 97;

const styles = {
	toolbar: {
		position: "fixed",
		bottom: 0,
		left: 0,
		width: "100%",
		textAlign: "right"
	}
}

class Test extends React.Component {

	static propTypes = {
		part: PropTypes.string.isRequired,
	}

	state = {
		start: undefined,
		stop: undefined,
		data: [],
		progress: 0,
		showTest: true
	}

	componentWillMount() {
		this.state.start = new Date().getTime();
	}

	update = (type, date, correctToken, selectedToken) => {
		this.setState(prev => {
			prev.data.push({ stamp: date.getTime(), type: type, correctToken: correctToken, selectedToken: selectedToken });
			if (type === "Success") {
				prev.progress++
			}
			return { data: prev.data, progress: prev.progress };
		});
	}

	handleSuccess = (date, token) => {
		this.update("Success", date, token, token);
	}

	handleError = (date, correctToken, selectedToken) => {
		this.update("Error", date, correctToken, selectedToken);
	}

	handleCompleted = (date) => {
		this.setState({ stop: date.getTime() });
	}

	handleMiss = (date, correctToken, x, y) => {
		this.update("Miss", date, correctToken, { text: "", x: x, y: y });

	}

	renderContent = () => {
		if (this.state.showTest) {
			return (
				<Trails
						part={this.props.part}
						progress={this.state.progress}
						feedback={true}
						errorText="X"
						errorDuration={500}
						completedText={"Completed! Please press the next button"}
						onSuccess={this.handleSuccess}
						onError={this.handleError}
						onMiss={this.handleMiss}
						onCompleted={this.handleCompleted}
					/>);
		}
		return <pre style={{textAlign:"left"}}>{
			JSON.stringify(
			{
				start: this.state.start,
				stop: this.state.stop,
				data: this.state.data
			}
			,null,2) }
		</pre>;
	}

	renderButton = () => {
		if (this.state.showTest) {
			return <Button onClick={()=>{ this.setState({showTest:false})}}>Show Data</Button>
		}
		return <Button onClick={()=>{ this.setState({showTest:true})}}>{"Show Trails " + this.props.part}</Button>
	}

	render() {
		return (
			<div>
				<div style={{textAlign:"center", height:"100vh"}}>
					{ this.renderContent() }
				</div>
				<div className={this.props.classes.toolbar}>
					{ this.renderButton() }
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(Test);