import React from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/PagesStyles'
import { useFonts } from 'expo-font';
import FONTS from "../styles/fonts/fonts";

export default function ThankYouPage() {
    const navigation = useNavigation();

    const backNewFeedup = () => {
        navigation.navigate('Home'); // Navega para a tela de home
    };

    let [fontsLoaded] = useFonts({
      "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    });

    if (!fontsLoaded) {
      return <AppLoading />;
    }

    return (
        <View style={styles.containerOnboarding}>

            <View style={styles.headerOnboarding}>
                <TouchableOpacity onPress={backNewFeedup}>
                    {/*botao de retorno no topo*/}
                    <Text style={styles.navButtonOnboarding}>{'<'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.logoTitleSubtitleContainerOnboarding}>
                <View style={styles.logoTitleContainerOnboarding}>
                    <Image source={require('../assets/images/logos/mini-logo.png')} style={styles.logoOnboarding} />
                    <Text style={styles.titleOnboarding}>Seu feedback foi enviado</Text>
                </View>
                <Text style={styles.subtitleOnboarding}>Obrigado pela participação!</Text>
            </View>

            {/*trecho para imagem do meio*/}
            <View style={styles.contentThankYou}>
                <Image source={require('../assets/images/cards/nozes-coin.png')} style={styles.imageOnboarding} />
            </View>
        </View>

    );
};
