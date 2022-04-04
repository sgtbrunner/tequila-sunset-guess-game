import { Dimensions, StyleSheet, View, Text } from 'react-native';

import Colors from '../utils/constants/colors';

const deviceWidth = Dimensions.get('window').width;
const BREAKPOINT = 380;

const isSmallScreen = deviceWidth < BREAKPOINT;

const NumberContainer = ({ children }) => (
  <View style={styles.container}>
    <Text style={styles.numberText}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.white,
    padding: isSmallScreen ? 12 : 24,
    margin: isSmallScreen ? 12 : 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: Colors.white,
    fontSize: isSmallScreen ? 28 : 36,
    fontFamily: 'open-sans-bold',
  },
});

export default NumberContainer;
