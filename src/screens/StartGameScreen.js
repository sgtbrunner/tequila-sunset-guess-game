import { useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';

import Card from '../components/Card';
import Colors from '../utils/constants/colors';
import InstructionText from '../components/InstructionText';
import PrimaryButton from '../components/PrimaryButton';
import Title from '../components/Title';

const StartGameScreen = ({ onPickNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState('');

  const resetInputHandler = () => {
    setEnteredNumber('');
  };

  const confirmInputHandler = () => {
    const choseNumber = parseInt(enteredNumber);

    if (isNaN(choseNumber) || choseNumber < 0 || choseNumber > 99) {
      Alert.alert('Invalid Number', 'Must be a number between 1 an 99', [
        { text: 'Okay', onPress: resetInputHandler, style: 'destructive' },
      ]);
      return;
    }
    onPickNumber(choseNumber);
  };

  return (
    <View style={styles.rootContainer}>
      <Title>Guess the number</Title>
      <Card>
        <InstructionText>Enter a number</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType='number-pad'
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={setEnteredNumber}
          value={enteredNumber}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});

export default StartGameScreen;
