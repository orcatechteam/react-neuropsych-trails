import React from 'react';
import PropTypes from 'prop-types';
import Styles from 'styles';
import Theme from 'theme';
import { withStyles } from 'material-ui';

let popup = (props) => {
	if (props.onlyIf === false) {
		return null;
	}

	let styles = {}
	styles.color = props.theme.color;
	styles.fontFamily = Theme.fontFamily;
	styles.background = Theme.default.fill;
	if (typeof props.fontSize !== 'undefined') {
		styles.fontSize = props.fontSize;
	}
	if (typeof props.width !== 'undefined') {
		//styles.width = props.width + "px";
	}

	return (
		<div className={props.classes.popUp}>
			<div style={styles} className={props.classes.popUpContent}>
				{ props.children }
			</div>
		</div>
	);
}

popup.propTypes = {
	onlyIf: PropTypes.bool,
	text: PropTypes.string,
	theme: PropTypes.any,
	fontSize: PropTypes.string,
	width: PropTypes.number
}

popup.defaultTypes = {
	text: "",
	onlyIf: true,
	theme: Theme.default,
}

export default withStyles(Styles)(popup);