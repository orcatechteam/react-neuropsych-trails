var styles = {
	marker: {
		'&:hover': {
			cursor: 'pointer',
		},
		'& text': {
			userSelect: "none",
		}
	},
	popUp: {
		width: "100%",
		left: "0%",
		top: "50%",
		position: "absolute",
		textAlign: "center",
		fontSize: "1em",
		display: "inline-block",
		textAlign: "center"
	},
	'popUpContent': {
		maxWidth: "100%",
		display: "inline-block",
		verticalAlign: "middle",
		margin: "0px auto",
		wordWrap: "normal",
		textAlign: "center",
		border: "1px solid #999",
		borderRadius: "5px",
		padding: "10px 15px",
	}
}

export default styles;