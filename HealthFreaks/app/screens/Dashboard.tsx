import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Dashboard() {
    const [steps, setSteps] = useState(0);
    const [calories, setCalories] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.bubble}>
                <Text style={{ fontSize: 24, alignSelf: 'center' }}>
                    Goal
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.container, { alignItems: 'center' }]}>
                        <Text style={{ fontSize: 20 }}>Steps</Text>
                        <Text style={{ fontSize: 20 }}>{steps}</Text>
                    </View>
                    <View style={[styles.container, { alignItems: 'center' }]}>
                        <Text style={{ fontSize: 20 }}>Calories</Text>
                        <Text style={{ fontSize: 20 }}>{calories}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    bubble: {
        margin: 20,
        borderWidth: 1,
        borderRadius: 4,
        flexDirection: 'column',
    }
});