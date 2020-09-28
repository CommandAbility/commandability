import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.background.one,
      padding: 24,
    },
    label: {
      color: colors.primary,
      marginLeft: 24,
    },
    nameInput: {
      height: 48,
      color: colors.text.main,
      backgroundColor: colors.background.two,
      margin: 24,
    },
    opacity: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.two,
      padding: 48,
      margin: 24,
    },
    opacityText: {
      fontSize: 42,
      color: colors.text.main,
    },
    icon: {
      fontSize: 42,
      color: colors.primary,
      marginRight: 30,
    },
    backButton: {
      color: colors.primary,
      fontSize: 42,
    },
    backBar: {
      alignSelf: 'flex-start',
      margin: 24,
    },
    promptContainer: {
      flex: 1,
      justifyContent: 'center',
    },
  });
