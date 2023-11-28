import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';

const Feed = () => {
  const handleImageClick1 = () => {
    const url = 'https://blog.myfitnesspal.com/ask-the-rd-how-much-protein-can-our-body-absorb/';
    Linking.openURL(url);
  };

  const handleImageClick2 = () => {
    const url = 'https://www.puregym.com/blog/';
    Linking.openURL(url);
  };

  const handleImageClick3 = () => {
    const url = 'https://www.puregym.com/blog/1-hour-gym-workouts/';
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
    const url = 'https://www.puregym.com/blog/the-ultimate-hiit-workout-for-men/';
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Your feed content goes here */}
        <TouchableOpacity onPress={handleImageClick1}>
          <Image
            source={require('../../assets/protein.jpg')} // Replace with the actual path to your image
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}> </Text>

        {/* Add more images and text here if needed */}
        <TouchableOpacity onPress={handleImageClick2}>
          <Image
            source={require('../../assets/puregym.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}>add description here add description here</Text>

        {/* Add more images and text here if needed */}
        <TouchableOpacity onPress={handleImageClick3}>
          <Image
            source={require('../../assets/workouts.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}>add description here add description here</Text>

        <TouchableOpacity onPress={handleImageClick4}>
          <Image
            source={require('../../assets/beginnergym.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}>add description here add description here</Text>

        <TouchableOpacity onPress={handleImageClick5}>
          <Image
            source={require('../../assets/teengym.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Workout Plan Teenagers</Text>

        <TouchableOpacity onPress={handleImageClick6}>
          <Image
            source={require('../../assets/hiit.jpg')}
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
    width: 325,
    height: 200,
    marginBottom: 10,
  },
  text: {
    color: 'white',
  },
});

export default Feed;
