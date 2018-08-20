# ORCATECH Trail Making Tests

[![Build Status](https://travis-ci.org/orcatechteam/react-neuropsych-trails.svg?branch=v0.0.4)](https://travis-ci.org/orcatechteam/react-neuropsych-trails)

The [Trailing Making Tests A & B](https://en.wikipedia.org/wiki/Trail_Making_Test)
implemented as a [React](https://reactjs.org) component. The component will size
itself to it's parent element while maintaining it's aspect ratio. It will not expand
the parent element.

## Install

The ORCATECH Trail Making Tests are available as an [NPM package](https://www.npmjs.com/package/@orcatech/react-neuropsych-trails).

```sh
npm install @orcatech/react-neuropsych-trails
```

## Trail Making Test Types

There are two types of tests, A & B. In test A the user must click or touch each
numbered circle is ascending order starting with number 1. i.e. 1, 2, 3, etc.
In test B the user must click or touch each numbered and lettered circle in alternating,
ascending order starting with the number 1. i.e. 1, A, 2, B, 3, C, etc.

To specify TrailsA vs TrailsB, set the "part" property to one of the following:

| Part  | Description                                                          |
|-------|----------------------------------------------------------------------|
| A     | Full test with only numbers                                          |
| A12   | Abbreviated test (12 circles) with only numbers                      |
| B     | Full test with numbers and letters                                   |
| B12   | Abbreviated test (12 circles) test will numbers and letters          |

## Demo

After installing, open the
[Trails Test Demo](dist/test/index.html)

## Usage

Here's a quick example to get you started:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Trails from '@orcatech/react-neuropsych-trails';

export default class Demo extends React.Component {

	static propTypes = {
		part: PropTypes.string.isRequired,
	}

	state = {
		progress: 0
	}

	constructor(props) {
		super(props);
		this.data = {
			start: undefined,
			stop: undefined,
			events: []
		};
	}

	componentWillMount() {
		this.data.start = new Date().getTime();
	}

	update = (type, date, correctToken, selectedToken) => {
		this.data.events.push({
			stamp: date.getTime(),
			type: type,
			correctToken: correctToken,
			selectedToken: selectedToken
		});
		console.log(this.data.events[this.data.events.length-1]);
	}

	handleMiss = (date, correctToken, x, y) => {
		this.update("Miss", date, correctToken, { text: "", x: x, y: y });
	}

	handleSuccess = (date, token) => {
		this.update("Success", date, token, token);
		this.setState(prev => ({ progress: ++prev.progress }));
	}

	handleError = (date, correctToken, selectedToken) => {
		this.update("Error", date, correctToken, selectedToken);
	}

	handleCompleted = (date) => {
		this.data.stop = date.getTime();
		console.log("Trails Data:");
		console.log(this.data);
	}

	render() {
		return <Trails
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
					/>;
	}
}

ReactDOM.render(<Demo part="A12"/>, document.getElementById('root'));
```
