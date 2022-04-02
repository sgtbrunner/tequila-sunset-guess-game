import { useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

import StartGameScreen from './src/screens/StartGameScreen';
import GameOverScreen from './src/screens/GameOverScreen';
import GameScreen from './src/screens/GameScreen';
import Colors from './src/utils/constants/colors';

const BackgroundImage = require('./assets/images/background.png');

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(true);
  const [roundsNumber, setRoundsNumber] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  const pickedNumberHandler = (number) => {
    setUserNumber(number);
    setGameIsOver(false);
  };

  const gameOverHandler = (numberOfRounds) => {
    setRoundsNumber(numberOfRounds);
    setGameIsOver(true);
  };

  const onStartNewGame = () => {
    setUserNumber(null);
    setRoundsNumber(0);
  };

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber)
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );

  if (gameIsOver && userNumber)
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={roundsNumber}
        onStartNewGame={onStartNewGame}
      />
    );

  return !fontsLoaded ? (
    <AppLoading />
  ) : (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.root}
    >
      <ImageBackground
        source={BackgroundImage}
        resizeMode='cover'
        imageStyle={styles.backgroundImage}
        style={styles.root}
      >
        <SafeAreaView style={styles.root}>{screen}</SafeAreaView>
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
