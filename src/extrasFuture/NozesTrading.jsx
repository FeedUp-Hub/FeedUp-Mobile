import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import styles from '../styles/PagesStyles'

const NozesTrading = () => {

  return (
    <View style={styles.shapeOnboarding}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../assets/images/logos/mini-logo-blue.png')} />
          <Text style={styles.textOnboarding}>Trade</Text>
      </View>
      <Text style={styles.subtitleOnboarding}>Em breve você poderá trocar suas Nozes por brindes incríveis! {'\n'}Fique ligado...</Text>
      {/* trecho para imagem do meio */}
      <View style={styles.contentOnboarding}>
          <Image source={require('../assets/images/cards/nozes-coin.png')} style={styles.imageOnboarding} />
      </View>
</View>

  );
};

export default NozesTrading;