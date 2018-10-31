import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';

import firebase from 'react-native-firebase';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      topic: ''
    };
  }

  async componentDidMount() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // user has permissions
      console.warn('You have permission to use messaging.');
      const topic = 'test001';
      await firebase.messaging().subscribeToTopic(topic);
      console.warn('Subscribed to topic', topic);
      // save topic into state
      this.setState({
        topic: topic
      });
    } else {
      // user doesn't have permission
      console.warn('You have no permission to use messaging');
      // ask for permission
      try {
        await firebase.messaging().requestPermission();
        // User has authorised
        console.warn('You gave permission to use messaging. Restart app.');
      } catch (error) {
        // User has rejected permissions
        console.warn('You rejected permission to use messaging');
      }
    }
  }

  render() {
    // read topic from state
    const { topic } = this.state;
    // get a boolean flag to make conditional rendering
    const registered = topic !== '';
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image source={require('./assets/ReactNativeFirebase.png')} style={[styles.logo]}/>
          <Text style={styles.welcome}>
            Notification Demo
          </Text>

          <Text style={styles.instructions}>
            To see the notifications, this app must{'\n'}be closed or put in the background
          </Text>

          {registered &&
            <Text style={styles.instructions}>
              This device is registered to receive{'\n'}notifications under topic {topic}
            </Text>
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 64,
    padding: 10,
    width: 135,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
