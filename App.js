import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, Touchable, Touch, Modal, Image} from 'react-native';

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
      startScreenVisible: true,
      instructionsScreenVisible: false,

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

  playButtonPress = () => {
    this.setState({ startScreenVisible: false });
    this.setState({ instructionsScreenVisible: false });
  }
  instructionsButtonPress = () => {
    this.setState({ instructionsScreenVisible: true });
    this.setState({ startScreenVisible: false });
  }
  
  render() {
    return (
      <View style={ styles.container }>
        <Modal 
          style={ styles.startScreen }
          animationType="slide"
          visible={ this.state.startScreenVisible }>
          <Image 
            source={ require('./tapwars.jpg') }
            style={ {alignSelf: 'stretch', flex: 1, height: undefined, width: undefined} }
            />
          <TouchableHighlight
            style={ styles.instructionsButton }
            onPress={ this.instructionsButtonPress }>
            <Text style={ styles.startScreenInstructionsText }>Instructions</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={ styles.playButton }
            onPress={ this.playButtonPress }
            underlayColor="lightblue">
            <Text style={ styles.startScreenPlayText }>Play</Text>
          </TouchableHighlight>
        </Modal>
        <Modal
          style={ styles.instructionsScreen }
          animationType="slide"
          visible={ this.state.instructionsScreenVisible }>
          <Text style={ styles.instructionsText }>After pressing the start button, tap on your side as fast as you can for 10 seconds. The side with the most taps wins!</Text>
          <TouchableHighlight
            style={ styles.playButton }
            onPress={ this.playButtonPress }
            underlayColor="lightblue">
            <Text style={ styles.startScreenPlayText }>Play</Text>
          </TouchableHighlight>
        </Modal>
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

  startScreen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionsScreen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    marginTop: 475,
    marginLeft: '55%',
    marginRight: '20%',
    position: 'absolute',
    backgroundColor: 'blue',
    width: '25%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightblue',
  },
  instructionsButton: {
    position: 'absolute',
    marginTop: 475,
    marginLeft: '20%',
    marginRight: '55%',
    backgroundColor: 'purple',
    width: '25%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'pink',
  },
  instructionsText: {
    marginTop: 250,
    marginLeft: '10%',
    marginRight: '10%',
    
  },
  startScreenPlayText: {
    color: 'white',
  },
  startScreenInstructionsText: {
    color: 'white',
  },
});
