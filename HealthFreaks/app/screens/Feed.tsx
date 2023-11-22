// Feed.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { parse } from 'react-native-rss-parser';

const Feed = () => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const response = await fetch('https://humnutrition.com/blog/feed/?x=1');
        const text = await response.text();
        const parsed = await parse(text);
        setFeedData(parsed.items);
      } catch (error) {
        console.error('Error fetching or parsing RSS feed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={feedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            {/* Add more fields based on your feed structure */}
          </View>
        )}
      />
    </View>
  );
};

export default Feed;