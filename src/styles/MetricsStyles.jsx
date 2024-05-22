import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const styles = StyleSheet.create({
  container: {
    paddingTop: 51,
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular'
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular'
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },
  pieChartText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 5
  }
});

export default styles;