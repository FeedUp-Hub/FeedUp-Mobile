import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const styles= StyleSheet.create({
  splashLogo: {
    backgroundColor: '#5271FF',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  splashTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingBottom: 50,
    color: 'white',
  },
  containerLoginPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logoContainerLoginPage: {
    left: 20,
    marginBottom: 20,
    marginLeft: '-70%',
  },
  logoLoginPage: {
    width: 200,
    height: 200,
    left: 100,
  },
  titleContainerLoginPage: {
    marginBottom: 20,
    marginLeft: '-15%',
  },
  titleLoginPage: {
    left: 20,
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 50,
  },
  titleSecondaryLoginPage: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    paddingLeft: 20,
  },
  inputContainerLoginPage: {
    width: '80%',
    alignItems: 'center',
  },
  inputLoginPage: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  forgotTextLoginPage: {
    alignSelf: 'flex-end',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    marginBottom: 10,

  },
  loginButtonLoginPage: {
    width: '100%',
    height: 50,
    backgroundColor: '#5271FF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextLoginPage: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  containerOnboarding: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  shapeOnboarding: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#5271FF',
    borderBottomLeftRadius: 140,
    borderBottomRightRadius: 140,
  },
  headerOnboarding: {
    fontSize: 25,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
  navButtonOnboarding: {
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
  },
  disabledOnboarding: {
    opacity: 0.3,
  },
  logoTitleSubtitleContainerOnboarding: {

    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 16,
    paddingBottom: 10,
  },
  logoTitleContainerOnboarding: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoOnboarding: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  titleOnboarding: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: 'black',
    fontWeight: 'bold',
  },
  subtitleOnboarding: {
    padding: 20,
    paddingTop: 10,
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
  contentOnboarding: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOnboarding: {
    paddingTop: 87,
    width: 350,
    height: 350,
    alignSelf: 'center',
  },
  dotsContainerOnboarding: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20
  },
  dotOnboarding: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#cccccc',
    margin: 5,
  },
  activeDotOnboarding: {
    backgroundColor: '#5271FF',
  },
  nextButtonOnboarding: {
    backgroundColor: '#5271FF',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    margin: 20,
    alignSelf: 'stretch',
  },
  nextButtonTextOnboarding: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  textOnboarding: {
    paddingTop: 10,
    paddingLeft: 10,
    color: '#ffffff',
    fontSize: 25,
    fontFamily: 'Poppins-Regular',
  },
  containerHome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  rowHome: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuItemHome: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  menuImageHome: {
    width: 100,
    height: 100,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  menuTextHome: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleHome: {
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  titleSecondaryHome: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    marginBottom: 60,
    textAlign: 'center',
  },
  footerHome: {
    position: 'absolute',
    bottom: 10,
  },
  footerTextHome: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#888',
  },
  containerSignup: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20
  },
  headerSignup: {
    marginBottom: 20
  },
  headerTextSignup: {
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
  },
  fieldsSignup: {
    marginBottom: 10,
  },
  inputSignup: {
    width: 327,
    height: 35,
    padding: 10,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    borderRadius: 20,
    borderColor: 'black',
    backgroundColor: 'gray',
  },
  checkboxContainerSignup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxSignup: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkmarkSignup: {
    color: '#fff',
  },
  buttonSignup: {
    width: 327,
    height: 35,
    backgroundColor: '#5271FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingStart: 24,
    paddingEnd: 24,
    borderRadius: 20,

  },
  loginTextSignup: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#454B60',
    fontWeight: 'bold',
    marginLeft: 5,
  },
   logoSignup: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  TextButtonSignup: {
    color: 'white',
    fontWeight: 'bold',
  },
  containerNewFeedup: {
    flex: 1,
    padding: 20,
    paddingTop: 113,
    backgroundColor: '#fff',
  },
  headerTextNewFeedup: {
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
  },
  subtitleNewFeedup: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
    paddingTop: 10,
    textAlign: 'justify'
  },
  inputNewFeedup: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'white'
  },
  textAreaNewFeedup: {
    height: 100,
    textAlignVertical: 'top'
  },
  checkboxContainerNewFeedup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonNewFeedup: {
    backgroundColor: '#5271FF',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  buttonTextNewFeedup: {
    color: 'white',
    fontWeight: 'bold',
  },
  checkboxNewFeedup: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  checkmarkNewFeedup: {
    color: '#fff',
  },
  logoNewFeedup: {
    width: 100,
    height: 100,
    marginBottom: 20
  },
  pickerGeralNewFeedup: {
  marginBottom: 10,
  borderWidth: 1,
  borderRadius: 50
  },
  contentThankYou: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
});

export default styles;
