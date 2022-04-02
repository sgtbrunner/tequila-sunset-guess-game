import { Text, View, Pressable, StyleSheet } from 'react-native';

import Colors from '../utils/constants/colors';

const PrimaryButton = ({ children, onPress }) => (
  <View style={styles.buttonOuterContainer}>
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.pressed, styles.buttonInnerContainer]
          : styles.buttonInnerContainer
      }
      onPress={onPress}
      android_ripple={{ color: Colors.primary600 }}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,

    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});

export default PrimaryButton;
