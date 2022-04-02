import { useState, useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import Card from '../components/Card';
import InstructionText from '../components/InstructionText';
import NumberContainer from '../components/NumberContainer';
import PrimaryButton from '../components/PrimaryButton';
import Title from '../components/Title';

const generateRandomNumberBetween = ({ min, max, exclude }) => {
  debugger;
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  return randomNumber === exclude
    ? generateRandomNumberBetween(min, max, exclude)
    : randomNumber;
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomNumberBetween({
    min: 1,
    max: 100,
    exclude: userNumber,
  });
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) onGameOver();
  }, [currentGuess, userNumber, onGameOver]);

  const nextGuessHandler = ({ direction }) => {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert(`Stop lying!`, 'We know you are...', [
        { text: 'Okey dokey!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') maxBoundary = currentGuess;
    if (direction === 'greater') minBoundary = currentGuess + 1;

    const newRandomNumber = generateRandomNumberBetween({
      min: minBoundary,
      max: maxBoundary,
      exclude: currentGuess,
    });
    setCurrentGuess(newRandomNumber);
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.card}>
        <InstructionText style={styles.instructionText}>
          Lower or higher?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() => nextGuessHandler({ direction: 'lower' })}
            >
              -
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() => nextGuessHandler({ direction: 'greater' })}
            >
              +
            </PrimaryButton>
          </View>
        </View>
      </Card>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
  },
  card: {
    marginTop: 50,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});

export default GameScreen;
