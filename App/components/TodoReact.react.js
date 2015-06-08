var Header = require('./Header.react');
var TodoList = require('./TodoList.react');
var React = require('react-native');

var {
  View,
  Text,
  TextInput,
  TabBarIOS,
  AlertIOS,
  StyleSheet,
} = React;


var todoId = (function(){
	var id = 3;
	return function(){
		return (id++);
	}
})();

var TodoReact = React.createClass({


  getInitialState: function() {
  
    return {
      items: [
                {id: 1, todo: 'Learn react native', complete: false},
                {id: 2, todo: 'Make a to-do app', complete: true}
            ],
      value: '',
      selectedTab: 'todo'
    };
  },

  alertMenu: function(rowData, rowID) {
      AlertIOS.alert(
          'どうする？',
          null,
          [
              {text: 'Doneにする', onPress: () => this._done(rowData)},
              {text: '消す', onPress: () => this._del(rowData)},
              {text: 'Cancel'}
          ]
      )
  },
  alertMenuDone: function(rowData, rowID) {
      AlertIOS.alert(
          'どうする？',
          null,
          [
              {text: '消す', onPress: () => this._del(rowData)},
              {text: 'Cancel'}
          ]
      )
  },


  render: function() {

  	return (

  	  <TabBarIOS
        tintColor="black"
        barTintColor="#3abeff"
        style={styles.tab}>

        <TabBarIOS.Item 
          selected={this.state.selectedTab === 'todo'} 
          title="Todo"
          icon={{uri :'List'}} 
          onPress={() => {
              this.setState({
                  selectedTab: 'todo',
              });
          }}>
          <View style={styles.container}>
	        <Header />
	        <TextInput
	        	style={styles.todoInput}
	        	id={this.props.id}
	        	value={this.state.value}
	        	onChangeText={(text) => this.setState({value: text})}
	        	onBlur={(event) => this._save(event)} />
	        <TodoList items={this._getTodo(this.state.items)}
	        			onPress={this.alertMenu} />
	      </View>
 		</TabBarIOS.Item>

        <TabBarIOS.Item 
          selected={this.state.selectedTab === 'done'}  
          title="Done"
          icon={{uri :'Done'}}
            onPress={() => {
                this.setState({
                    selectedTab: 'done',
                });
            }}>
          
          <View style={styles.container}>
            <View style={styles.header}>
          	  <Text style={styles.titleText}>Doneしたやつ</Text>
            </View>
	        <TodoList items={this._getDone(this.state.items)}
	        			onPress={this.alertMenuDone} />
	      </View>
        </TabBarIOS.Item>
      </TabBarIOS>
  	);
  },

  _getTodo: function(items){
  	  return items.filter(function(v){
	    return v.complete === false;
	  });
  },

  _getDone: function(items){
  	  return items.filter(function(v){
	    return v.complete === true;
	  });
  },

  _save: function(event) {

  	var text = [ {id: todoId(), todo: event.nativeEvent.text, complete: false }]

    this.setState({
      items: this.state.items.concat(text),
      value: ''
    });
  },

  _done: function(rowData) {

  	var items = this.state.items.filter(function(v){
	    if (v.id == rowData.id){
	    	v.complete = true;
	    }
	    return v
	  });

  	this.setState({items: items})
  },

  _del: function(rowData) {
      var items = this.state.items;

      items = items.filter(function(v){
	    return v.id != rowData.id;
	  });
      this.setState({items: items})
  }

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#F5FCFF',
  },
  header: {
	alignItems: 'center',
  },
  todoInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    fontSize: 15,
  },
  titleText: {
	fontSize: 20,
	fontWeight: 'bold',
	margin:20,
  },
});


module.exports = TodoReact;