import { StyleSheet, Text } from 'react-native';

import Colors from '../utils/constants/colors';

const InstructionText = ({ children, style }) => (
  <Text style={[styles.instructionText, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },
});

export default InstructionText;
