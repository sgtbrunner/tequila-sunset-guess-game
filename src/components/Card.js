import { Dimensions, StyleSheet, View } from 'react-native';

import Colors from '../utils/constants/colors';

const deviceWidth = Dimensions.get('window').width;
const BREAKPOINT = 380;

const isSmallScreen = deviceWidth < BREAKPOINT;

const Card = ({ children, style }) => (
  <View style={[styles.inputContainer, style]}>{children}</View>
);

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: isSmallScreen ? 18 : 36,
    marginHorizontal: 24,
    borderRadius: 8,
    padding: 16,
    backgroundColor: Colors.primary800,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});

export default Card;
