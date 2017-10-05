import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, Touchable, Touch} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startButtonTitle: 'Start',
      redScore: 0,
      blueScore: 0,
      redTapping: false,
      blueTapping: false,
      fighting: false,
      starting: false,
      gameTimer: 10,
      countdown: null,
    };
  }
  startButtonPress = () => {
    if (this.state.starting === false) {
      this.state.starting = true;
      setTimeout( () => {
        this.state.fighting = true;
        this.setState({ startButtonTitle: this.state.gameTimer.toString()});
        this.state.countdown = setInterval( () => {
          if (this.state.gameTimer > 0) {
            this.setState({ gameTimer: this.state.gameTimer - 1 });
            this.setState({ startButtonTitle: this.state.gameTimer.toString()});
          } else {
            this.state.gameTimer = 10;
            this.state.fighting = false;
            clearInterval(this.state.countdown);
            if (this.state.redScore > this.state.blueScore) {
              this.setState({ startButtonTitle: 'Red wins! Tap here to play again.'});
            } else if (this.state.redScore < this.state.blueScore) {
              this.setState({ startButtonTitle: 'Blue wins! Tap here to play again.'});
            } else {this.setState({ startButtonTitle: 'Tie! Tap here to play again.'});} 
            this.state.blueScore = 0;
            this.state.redScore = 0;
            this.state.starting = false;
          }
        }, 1000)
      }, 1000)
    }
  }
    
  redTap = () => {
    if (this.redTapping === false && this.state.fighting === true) {
      this.redTapping = true;
      this.setState({ redScore: this.state.redScore + 1 });
    }
  }
  redRelease = () => {
    this.redTapping = false;
  }
  blueTap = () => {
    if (this.blueTapping === false && this.state.fighting === true) {
      this.blueTapping = true;
      this.setState({ blueScore: this.state.blueScore + 1 });
    }
  }
  blueRelease = () => {
    this.blueTapping = false;
  }
  
  render() {
    return (
      <View style={ styles.container }>
        <View
          onTouchStart={ this.redTap }
          onTouchEnd={ this.redRelease }
          style={ styles.redSide }>
          <View>
            <Text style={ styles.redSideText }>Red Side</Text>
            <Text style={ styles.redScoreStyles }> { this.state.redScore }</Text>
          </View>
        </View>
        <TouchableHighlight
          style={ styles.startButton }
          onPress={ this.startButtonPress }
          underlayColor="green">
          <Text style={ styles.startButtonText }>
            { this.state.startButtonTitle }
          </Text>
        </TouchableHighlight>
        <View
          onTouchStart={ this.blueTap }
          onTouchEnd={ this.blueRelease }
          style={ styles.blueSide }>
          <View>
            <Text style={ styles.blueSideText }>Blue Side</Text>
            <Text style={ styles.blueScoreStyles }> { this.state.blueScore }</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redSide: {
    flex: 1,
    backgroundColor: '#F69193',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '180deg' }]
  },
  blueSide: {
    flex: 1,
    backgroundColor: '#A6C1F9',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    backgroundColor: 'lightgreen',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'green',
  },
  startButtonText: {
    color: 'white',
    fontSize: 20,
  },
  redSideText: {
    color: 'white',
  },
  blueSideText: {
    color: 'white',
  },
  redScoreStyles: {
    color: 'purple',
    fontSize: 30,
  },
  blueScoreStyles: {
    color: 'purple',
    fontSize: 30,
  },
});
