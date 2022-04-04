import { useState, useEffect } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  View,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import GuessLog from '../components/GuessLog';
import InstructionText from '../components/InstructionText';
import NumberContainer from '../components/NumberContainer';
import PrimaryButton from '../components/PrimaryButton';
import Title from '../components/Title';

const generateRandomNumberBetween = ({ min, max, exclude }) => {
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
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const { width } = useWindowDimensions();
  const guessRoundsListLength = guessRounds.length;

  useEffect(() => {
    if (currentGuess === userNumber) onGameOver(guessRoundsListLength);
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

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
    setGuessRounds((previousGuessRounds) => [
      newRandomNumber,
      ...previousGuessRounds,
    ]);
  };

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Lower or higher?
        </InstructionText>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() => nextGuessHandler({ direction: 'lower' })}
            >
              <Ionicons name='md-remove' size={24} color='white' />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() => nextGuessHandler({ direction: 'greater' })}
            >
              <Ionicons name='md-add' size={24} color='white' />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() => nextGuessHandler({ direction: 'lower' })}
            >
              <Ionicons name='md-remove' size={24} color='white' />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() => nextGuessHandler({ direction: 'greater' })}
            >
              <Ionicons name='md-add' size={24} color='white' />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLog
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(round) => round}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    marginTop: Platform.select({ android: 50 }),
    alignItems: 'center',
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    marginTop: 25,
  },
});

export default GameScreen;
