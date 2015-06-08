var React = require('react-native');

var {
  View,
  Text,
  Image,
  StyleSheet,
} = React;

var Header = React.createClass({

	render: function() {
		return (
			<View style={styles.header}>
				<Image source={{uri: 'https://avatars1.githubusercontent.com/u/1897172?v=3&s=460'}}
         style={styles.logoImg} />
         		<Text style={styles.titleText}>React Todo</Text>
         	</View>
		);
	}
});

var styles = StyleSheet.create({
	header: {
		alignItems: 'center',
	},
	titleText: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 30,
	},
	logoImg: {
		width: 120,
		height: 120,
		marginBottom: 10,
	}
});

module.exports = Header;
