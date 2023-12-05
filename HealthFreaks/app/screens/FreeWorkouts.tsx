import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';

const HealthTips = () => {
  const handleImageClick1 = () => {
    const url = 'https://youtu.be/cbKkB3POqaY?si=WkRQ8T26S0JT8WLc';
    Linking.openURL(url);
  };

  const handleImageClick2 = () => {
    const url = 'https://youtu.be/ScInpT_5dIQ?si=pozBay_q-SknSfNn';
    Linking.openURL(url);
  };

  const handleImageClick3 = () => {
    const url = 'https://youtu.be/pHesd3IMTNI?si=6TR7gwwfAAF-JYkZ';
    Linking.openURL(url);
  };

  const handleImageClick4 = () => {
    const url = 'https://youtu.be/Mx9RrNZv2TI?si=CqIRqyd4X1MeKsq3';
    Linking.openURL(url);
  };

  const handleImageClick5 = () => {
    const url = 'https://youtu.be/ByUqMgbUdao?si=-51mXuTk1E7GiAnz';
    Linking.openURL(url);
  };

  const handleImageClick6 = () => {
    const url = 'https://youtu.be/mm47bCaCzpQ?si=g8v4mrMMx-SFvuUx';
    Linking.openURL(url);
  };

  const handleImageClick7 = () => {
    const url = 'https://youtu.be/OKKRTOX5DsE?si=Oe0HX8zCdKhBYqEi';
    Linking.openURL(url);
  };

  const handleImageClick8 = () => {
    const url = 'https://youtu.be/_PRk8DH2_mY?si=Ben0ztRjNyoA6k-c';
    Linking.openURL(url);
  };

  const handleImageClick9 = () => {
    const url = 'https://youtu.be/EGeI6GZm2aM?si=9IAn-PdkCQHBQWS5';
    Linking.openURL(url);
  };

  const handleImageClick10 = () => {
    const url = 'https://youtu.be/yV7fDgNlYKM?si=QAO2C0DZOL709h29';
    Linking.openURL(url);
  };

  const handleImageClick11 = () => {
    const url = 'https://youtu.be/6vlP9xPJbaQ?si=vA0EA6YKdIpWBeN-';
    Linking.openURL(url);
  };

  const handleImageClick12 = () => {
    const url = 'https://youtu.be/u_kea5iUQsg?si=CxEyM0irBgZOJfY5';
    Linking.openURL(url);
  };

  const handleImageClick13 = () => {
    const url = 'https://www.youtube.com/watch?v=ZC8qUpZzrgw';
    Linking.openURL(url);
  };

  const handleImageClick14 = () => {
    const url = 'https://youtu.be/C1MbRWFAM54?si=-SORFtgTodoOH6Br';
    Linking.openURL(url);
  };

  const handleImageClick15 = () => {
    const url = 'https://youtu.be/gxnYoddQIk0?si=0ShmwlTRKBJys31M';
    Linking.openURL(url);
  };

  const handleImageClick16 = () => {
    const url = 'https://youtu.be/VWj8ZxCxrYk?si=xh9kn9863YuYxybS';
    Linking.openURL(url);
  };

  const handleImageClick17 = () => {
    const url = 'https://youtu.be/Ba3qZjzPonI?si=xPE_A_1Wjib2lA80';
    Linking.openURL(url);
  };
  const handleImageClick18 = () => {
    const url = 'https://youtu.be/LE67JPeJsUQ?si=Hd6AtZ60qGINdXs6';
    Linking.openURL(url);
  };

  const handleImageClick19 = () => {
    const url = 'https://youtu.be/Eml2xnoLpYE?si=oUbtB-XRFgU-bqva';
    Linking.openURL(url);
  };

  const handleImageClick20 = () => {
    const url = 'https://youtu.be/y87vSUoIMGU?si=BofZS2p7wCtMby1G';
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        
        <TouchableOpacity onPress={handleImageClick1}>
          <Image
            source={require('../../assets/wrkfullbeginner.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        
        <TouchableOpacity onPress={handleImageClick2}>
          <Image
            source={require('../../assets/wrkfullinter.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>        
        <TouchableOpacity onPress={handleImageClick3}>
          <Image
            source={require('../../assets/wrkfulladv.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick4}>
          <Image
            source={require('../../assets/wrkupperbeginner.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick5}>
          <Image
            source={require('../../assets/wrkupperinter.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick6}>
          <Image
            source={require('../../assets/wrkupperadv.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}>  </Text>

        <TouchableOpacity onPress={handleImageClick7}>
          <Image
            source={require('../../assets/wrklowerbeginner.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick8}>
          <Image
            source={require('../../assets/wrklowerinter.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick9}>
          <Image
            source={require('../../assets/wrkloweradv.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick10}>
          <Image
            source={require('../../assets/wrkglutebeginner.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick11}>
          <Image
            source={require('../../assets/wrkgluteinter.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick12}>
          <Image
            source={require('../../assets/wrkgluteadv.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick13}>
          <Image
            source={require('../../assets/wrkcorebeginner.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick14}>
          <Image
            source={require('../../assets/wrkcoreinter.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick15}>
          <Image
            source={require('../../assets/wrkcoreadv.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick16}>
          <Image
            source={require('../../assets/wrkcardiobeginner.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick17}>
          <Image
            source={require('../../assets/wrkcardiointer.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick18}>
          <Image
            source={require('../../assets/wrkcardioadv.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick19}>
          <Image
            source={require('../../assets/wrkyoga.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick20}>
          <Image
            source={require('../../assets/wrkyoga2.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

      </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 200,
    marginBottom: 10,
  },
  text: {
    color: 'white',
  },
});

export default HealthTips;
