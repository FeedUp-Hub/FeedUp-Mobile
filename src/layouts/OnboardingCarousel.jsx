import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/PagesStyles';
import cardPhoneChat from '../assets/images/cards/card-phone-chat.png';
import cardChating from '../assets/images/cards/card-chating.png';
import cardRespect from '../assets/images/cards/card-respect.png';
import cardBenefits from '../assets/images/cards/card-benefits.png';

//A logica do carrossel está nessa funcao
export default function OnboardingCarousel() {
    const navigation = useNavigation();
    const [pageIndex, setPageIndex] = useState(0);

    const pages = [
        {
            title: 'FeedUp',
            subtitle: 'FeedUp é uma \nplataforma desenvolvida \npara feedbacks entre \ncolaboradores',
            image: cardPhoneChat, // TROCAR PARA IMAGEM DESSA PAGINA DO ONBOARDING
        },
        {
            title: 'FeedUp',
            subtitle: 'A realização de \nfeedbacks pelo FeedUp \nnão tem o intuito de \ndescartar avaliações \nformais de desempenho',
            image: cardChating, // TROCAR PARA IMAGEM DESSA PAGINA DO ONBOARDING
        },
        {
            title: 'FeedUp',
            subtitle: 'Feedbacks construtivos \nsão incentivados, mas \nprocure sempre manter \no respeito com outros \ncolaboradores',
            image: cardRespect, // TROCAR PARA IMAGEM DESSA PAGINA DO ONBOARDING
        },
        {
            title: 'FeedUp',
            subtitle: 'Engajar com os \nfeedbacks te proporciona \nbonificações e maior \nprestígio na plataforma',
            image: cardBenefits, // TROCAR PARA IMAGEM DESSA PAGINA DO ONBOARDING
        },
    ];

    //Funcao pra proxima
    const handleVoltarOnboarding = () => {
        if (pageIndex < pages.length - 1) { //Verifica se ja nao é a primeira pagina do onboarding
            setPageIndex(pageIndex + 1); //Se nao, aumenta index pra prosseguir
        }
    };

    //Funcao pra pagina anterior
    const handleSeguirOnboarding = () => {
        if (pageIndex > 0) {  //Verifica se ja nao é a primeira pagina do onboarding
            setPageIndex(pageIndex - 1); //se nao, reduz indez pra voltar
        }
    };

    return (
        <GestureRecognizer onSwipeLeft={handleVoltarOnboarding} onSwipeRight={handleSeguirOnboarding} style={styles.containerOnboarding}>
            <View style={styles.shapeOnboarding} />

            <View style={styles.headerOnboarding}>
                <TouchableOpacity onPress={handleSeguirOnboarding} disabled={pageIndex === 0}>
                    {/*botao de retorno no topo*/}
                    <TouchableOpacity onPress={handleSeguirOnboarding} disabled={pageIndex === 0}>
                        <Image source={require('../assets/images/icons/right-icon.png')} style={[pageIndex === 0 && styles.disabledOnboarding]} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', paddingLeft: 10,}}>
                <Image source={require('../assets/images/logos/mini-logo-blue.png')}/>
                <Text style={styles.textOnboarding}>FeedUp</Text>
            </View>
            <Text style={styles.subtitleOnboarding}>{pages[pageIndex].subtitle}</Text>
            {/*trecho para imagem do meio e dos 'dots'*/}
            <View style={styles.contentOnboarding}>
                <Image source={pages[pageIndex].image} style={styles.imageOnboarding} />

                <View style={styles.dotsContainerOnboarding}>
                    {/*logica para o funcionamento dos dots. Um laço de repetição que percorre o numero de pagina, quando está na pagina ativa, colore o dot*/}
                    {Array.from({ length: pages.length }, (_, i) => (
                        <View key={i} style={[styles.dotOnboarding, i === pageIndex && styles.activeDotOnboarding]} />
                    ))}
                </View>
            </View>

            {/*Logica das paginas seguintes*/}
            <TouchableOpacity
                style={styles.nextButtonOnboarding}
                onPress={() => {
                    if (pageIndex === pages.length - 1) {
                        navigation.navigate('Home');
                    } else {
                        setPageIndex(pageIndex + 1);
                    }
                }}
            >
                {/*Se chegar na ultima pagina do onboarding, botao muda*/}
                <Text style={styles.nextButtonTextOnboarding}>{pageIndex === pages.length - 1 ? 'Prosseguir para a Home' : 'Seguinte'}</Text>
            </TouchableOpacity>
        </GestureRecognizer>
    );
};
