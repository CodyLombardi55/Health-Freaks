import { StyleSheet, Text, View, SafeAreaView, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'



const FitScreen = () => {
    const route = useRoute();
    console.log(route.params);
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const exercise = route.params.exercises;
    const current = exercise[index];
    console.log(current, "first exercise")
    return (
        <SafeAreaView>
            <Image style={{
                width: "100%",
                height: 370,
                marginTop: 50
            }}

                source={{ uri: current.image }} />

            <Text style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 30,
                fontSize: 30,
                fontWeight: "bold"
            }}>{current.name}</Text>

            <Text style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 30,
                fontSize: 38,
                fontWeight: "bold"
            }}>
                x{current.sets}</Text>

            {index + 1 >= exercise.length ? (
                <Pressable
                    onPress={() => {
                        navigation.navigate("Home")
                    }}
                    style={{
                        backgroundColor: "blue",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 30,
                        borderRadius: 20, 
                        padding: 10,
                        width: 150
                    }}>

                    <Text
                        style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: 20,
                            color: "white"
                        }}
                    >DONE</Text>
                </Pressable>
            ) : (
                <Pressable
                    onPress={() => {
                        navigation.navigate("Rest")

                        setTimeout(() => {

                            setIndex(index + 1)
                        }, 2000);

                    }}
                    style={{
                        backgroundColor: "blue",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 30,
                        borderRadius: 20,
                        padding: 10,
                        width: 150
                    }}>

                    <Text
                        style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: 20,
                            color: "white"
                        }}
                    >DONE</Text>

                </Pressable>
            )}

            <Pressable style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 30
            }}>

                <Pressable
                disabled={index === 0} 
                onPress={() => {
                    navigation.navigate("Rest");

                    setTimeout(() =>{
                        setIndex(index-1)        
                    },2000)
                }}                    
                style={{
                    backgroundColor: "green",
                    padding: 10,
                    borderRadius: 15,
                    marginHorizontal: 20,
                    width: 100
                }}>

                    <Text style={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>
                        PREV</Text>
                </Pressable>
                {index + 1 >= exercise.length ? (
                    <Pressable
                    onPress={() => {
                        navigation.navigate("Home")
                    }}
                    style={{
                        backgroundColor: "green",
                        padding: 10,
                        borderRadius: 15,
                        marginHorizontal: 20,
                        width: 100
                    }}>

                    <Text style={{
                            color: "white",
                            fontWeight: "bold",
                            textAlign: "center"
                        }}>
                            SKIP
                        </Text>
                    </Pressable>
                ) : (
                    <Pressable
                    onPress={() => {
                        navigation.navigate("Rest")

                        setTimeout(() => {

                            setIndex(index + 1)
                        }, 2000);

                    }}
                    style={{
                        backgroundColor: "green",
                        padding: 10,
                        borderRadius: 15,
                        marginHorizontal: 20,
                        width: 100
                    }}>

                    <Text style={{
                            color: "white",
                            fontWeight: "bold",
                            textAlign: "center"
                        }}>
                            SKIP
                        </Text>
                    </Pressable>
                )} 
                
                   
                </Pressable>
        </SafeAreaView>
    )
}

export default FitScreen

const styles = StyleSheet.create({})