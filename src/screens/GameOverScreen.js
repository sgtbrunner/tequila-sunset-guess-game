import {
  Dimensions,
  Image,
  View,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';

import Title from '../components/Title';
import PrimaryButton from '../components/PrimaryButton';
import Colors from '../utils/constants/colors';

const SuccessImage = require('../../assets/images/success.png');

const deviceWidth = Dimensions.get('window').width;

const WIDTH_BREAKPOINT = 380;
const HEIGHT_BREAKPOINT = 400;

const isSmallScreen = deviceWidth < WIDTH_BREAKPOINT;

const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {
  const { height, width } = useWindowDimensions();

  let imageSize = 300;

  if (width < WIDTH_BREAKPOINT) imageSize = 150;
  if (height < HEIGHT_BREAKPOINT) imageSize = 80;

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.root}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image style={styles.image} source={SuccessImage} />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{' '}
          rounds to guess the number
          <Text style={styles.highlight}>{userNumber}</Text>
        </Text>
        <PrimaryButton onPress={onStartNewGame}>START NEW GAME</PrimaryButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  root: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: isSmallScreen ? 150 : 300,
    height: isSmallScreen ? 150 : 300,
    borderRadius: isSmallScreen ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500,
  },
});

export default GameOverScreen;
