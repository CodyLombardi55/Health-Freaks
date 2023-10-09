import { View, Text, StyleSheet } from "react-native";

export default function Dashboard() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{'\t\t\t'}Goals{'\n\t'} Steps{'\t\t\t\t'} Calories
                {'\n\t'} 10782 {'\t\t\t\t'}1992
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingTop: 0.1,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    text: {
        fontSize: 25,
        height: 200,
        width: '100%',
        backgroundColor: 'purple',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 4
    }
});