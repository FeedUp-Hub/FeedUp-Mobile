import React from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/PagesStyles';
import { useFonts } from 'expo-font';
import FONTS from "../styles/fonts/fonts";

export default function ThankYouPage() {
    const navigation = useNavigation();

    const backNewFeedup = () => {
        navigation.navigate('Feed'); // Navega para a tela de home
    };

    let [fontsLoaded] = useFonts({
      "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    });

    if (!fontsLoaded) {
      return <AppLoading />;
    }

    return (
        <View style={styles.containerThanks}>

            <View style={styles.headerThanks}>
                <TouchableOpacity onPress={backNewFeedup}>
                    {/*botao de retorno no topo*/}
                    <Image source={require('../assets/images/icons/right-icon.png')} style={styles.navButtonThanks} />
                </TouchableOpacity>
            </View>

            <View style={styles.logoTitleSubtitleContainerThanks}>
                <View style={styles.logoThanksSubtitle}>
                    <Image source={require('../assets/images/logos/mini-logo.png')} style={styles.logoThanks} />
                    <Text style={styles.thanksFeedUp}>FeedUp</Text>
                    <Text style={styles.titleThanks}>Seu feedback foi enviado</Text>
                </View>
                <Text style={styles.subtitleThanks}>Obrigado pela participação!</Text>
            </View>

            {/*trecho para imagem do meio*/}
            <View style={styles.contentThankYou}>
                <Image source={require('../assets/images/cards/nozes-coin.png')} style={styles.imageThanks} />
                <Text style={styles.nozesThanks}>200 nozes</Text>
            </View>
        </View>

    );
};
