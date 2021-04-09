import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      color: colors.text.main,
      backgroundColor: colors.background.three,
      borderRadius: 5,
      width: '100%',
      marginBottom: 16,
    },
    queryInput: {
      height: 40,
      color: colors.text.main,
      borderColor: colors.primary,
      borderBottomWidth: 1,
      marginBottom: 16,
      marginTop: 8,
      marginHorizontal: 8,
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 4,
    },
    headerContent: {
      fontSize: 14,
      color: colors.text.main,
    },
  });
