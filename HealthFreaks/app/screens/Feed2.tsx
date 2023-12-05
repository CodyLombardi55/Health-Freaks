import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, ScrollView, ImageBackground } from 'react-native';

const HealthTips = () => {
  const handleImageClick1 = () => {
    const url = 'https://www.puregym.com/blog/what-is-pre-workout/';
    Linking.openURL(url);
  };

  const handleImageClick2 = () => {
    const url = 'https://www.puregym.com/blog/the-best-leg-workout-routine-for-beginners/';
    Linking.openURL(url);
  };

  const handleImageClick3 = () => {
    const url = 'https://www.puregym.com/blog/what-to-eat-marathon-training/';
    Linking.openURL(url);
  };

  const handleImageClick4 = () => {
    const url = 'https://www.puregym.com/blog/the-best-gym-workout-plans-for-beginners/';
    Linking.openURL(url);
  };

  const handleImageClick5 = () => {
    const url = 'https://www.puregym.com/blog/the-best-workout-plans-for-teenagers/';
    Linking.openURL(url);
  };

  const handleImageClick6 = () => {
    const url = 'https://www.puregym.com/blog/easy-vegan-recipes-for-national-vegan-day/';
    Linking.openURL(url);
  };

  const handleImageClick7 = () => {
    const url = 'https://www.puregym.com/blog/osteoarthritis-and-exercise/';
    Linking.openURL(url);
  };

  const handleImageClick8 = () => {
    const url = 'https://www.puregym.com/blog/the-truth-about-the-gym-and-detox-diets/';
    Linking.openURL(url);
  };

  const handleImageClick9 = () => {
    const url = 'https://blog.myfitnesspal.com/healthy-snacks-to-support-your-immune-system/';
    Linking.openURL(url);
  };

  const handleImageClick10 = () => {
    const url = 'https://www.puregym.com/blog/yoga-for-runners/';
    Linking.openURL(url);
  };

  const handleImageClick11 = () => {
    const url = 'https://www.puregym.com/blog/the-best-full-body-toning-workout-plan-for-women/';
    Linking.openURL(url);
  };

  const handleImageClick12 = () => {
    const url = 'https://www.puregym.com/blog/why-exercise-is-so-important-for-heart-health/';
    Linking.openURL(url);
  };

  const handleImageClick13 = () => {
    const url = 'https://www.puregym.com/blog/the-ultimate-hiit-workout-for-men/';
    Linking.openURL(url);
  };

  const handleImageClick14 = () => {
    const url = 'https://www.puregym.com/blog/5-fitness-tips-for-busy-dads/';
    Linking.openURL(url);
  };

  const handleImageClick15 = () => {
    const url = 'https://www.puregym.com/blog/low-carb-or-low-fat-which-is-best-for-muscle-definition/';
    Linking.openURL(url);
  };

  const handleImageClick16 = () => {
    const url = 'https://www.puregym.com/blog/feeling-lonely-how-the-gym-can-help/';
    Linking.openURL(url);
  };

  const handleImageClick17 = () => {
    const url = 'https://www.puregym.com/blog/the-best-yoga-poses-for-sleep-and-relaxation/';
    Linking.openURL(url);
  };
  const handleImageClick18 = () => {
    const url = 'https://www.puregym.com/blog/carb-cycling/';
    Linking.openURL(url);
  };

  const handleImageClick19 = () => {
    const url = 'https://www.puregym.com/blog/healthy-ways-to-keep-your-stress-levels-down/';
    Linking.openURL(url);
  };

  const handleImageClick20 = () => {
    const url = 'https://www.puregym.com/blog/6-of-the-best-exercises-to-combine-hiit-pilates/';
    Linking.openURL(url);
  };

  return (
    <ImageBackground source={require('../../assets/BACKGROUND.png')} resizeMode='cover' style={styles.background}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        
        <TouchableOpacity onPress={handleImageClick1}>
          <Image
            source={require('../../assets/preworkout.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        
        <TouchableOpacity onPress={handleImageClick2}>
          <Image
            source={require('../../assets/legs.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>        
        <TouchableOpacity onPress={handleImageClick3}>
          <Image
            source={require('../../assets/marathon.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick4}>
          <Image
            source={require('../../assets/beginnergym.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick5}>
          <Image
            source={require('../../assets/teengym.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick6}>
          <Image
            source={require('../../assets/vegan.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}>  </Text>

        <TouchableOpacity onPress={handleImageClick7}>
          <Image
            source={require('../../assets/osteo.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick8}>
          <Image
            source={require('../../assets/detox.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick9}>
          <Image
            source={require('../../assets/snacks.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick10}>
          <Image
            source={require('../../assets/yoga.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick11}>
          <Image
            source={require('../../assets/womenfull.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick12}>
          <Image
            source={require('../../assets/heart.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick13}>
          <Image
            source={require('../../assets/strength.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick14}>
          <Image
            source={require('../../assets/dads.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick15}>
          <Image
            source={require('../../assets/carborfat.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick16}>
          <Image
            source={require('../../assets/lonely.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick17}>
          <Image
            source={require('../../assets/sleep.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick18}>
          <Image
            source={require('../../assets/carbcycling.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick19}>
          <Image
            source={require('../../assets/stresslevels.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        <TouchableOpacity onPress={handleImageClick20}>
          <Image
            source={require('../../assets/hiitpilates.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

      </View>
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  image: {
    width: 325,
    height: 200,
    marginBottom: 10,
  },
  text: {
    color: 'white',
  },
});

export default HealthTips;
