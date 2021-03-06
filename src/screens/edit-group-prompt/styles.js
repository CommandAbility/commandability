import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    pickerContainer: {
      borderRadius: 4,
      marginVertical: 16,
      backgroundColor: colors.background.two,
    },
    picker: {
      color: colors.text.main,
    },
  });
