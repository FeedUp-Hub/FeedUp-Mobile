import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image} from 'react-native';

const Metrics = () => {

  return (
    <View style={styles.container}>

    <Image style={styles.logo} source={require('../assets/image.png')} />
      <Text style={styles.title}>Metricas</Text>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus interdum, felis eu maximus
          convallis, dolor orci euismod velit, non tempus nunc arcu id lacus. Vestibulum aliquam magna non
          justo tempor, ac malesuada nisi scelerisque. Duis nec ultrices nunc. Nullam volutpat vitae turpis ut
          fringilla. Nullam pulvinar malesuada urna at dignissim. Cras auctor odio sit amet aliquet
          vestibulum. Vivamus euismod magna et magna commodo, vel feugiat elit efficitur. Integer tempus quam
          sit amet sapien dapibus, vel varius enim laoreet. Curabitur gravida eu mi nec rutrum. Vestibulum
          convallis, risus in posuere cursus, libero justo dignissim dui, vel interdum tortor lectus nec leo.
          In non arcu nisi. Morbi in semper mauris. Pellentesque habitant morbi tristique senectus et netus
          et malesuada fames ac turpis egestas. Morbi bibendum auctor justo, sed consectetur magna consequat
          ac. Duis efficitur, purus nec dapibus pellentesque, lorem arcu vestibulum nibh, sit amet eleifend
          urna lorem vitae tellus.
        </Text>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    width: '100%',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default Metrics;