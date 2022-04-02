import { StyleSheet, Text } from 'react-native';

import Colors from '../utils/constants/colors';

const Title = ({ children }) => <Text style={styles.title}>{children}</Text>;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: 'open-sans-bold',
    color: Colors.accent500,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: Colors.accent500,
    padding: 12,
  },
});

export default Title;
