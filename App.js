import { ImageBackground, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import StartGameScreen from './src/screens/StartGameScreen';

const BackgroundImage = require('./assets/images/background.png');

export default function App() {
  return (
    <LinearGradient colors={['#4e0329', '#ddb52f']} style={styles.root}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode='cover'
        imageStyle={styles.backgroundImage}
        style={styles.root}
      >
        <StartGameScreen />
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
