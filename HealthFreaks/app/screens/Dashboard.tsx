import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform, ImageBackground } from "react-native";
//import GoogleFit, { Scopes } from 'react-native-google-fit';

export default function Dashboard() {
    const [steps, setSteps] = useState(0);
    const [calories, setCalories] = useState(0);
    const [msg, setMsg] = useState('default');

    /*
    const options = {
        scopes: [
            Scopes.FITNESS_ACTIVITY_READ,
            Scopes.FITNESS_ACTIVITY_WRITE,
            Scopes.FITNESS_BODY_READ,
            Scopes.FITNESS_BODY_WRITE,
            Scopes.FITNESS_BLOOD_PRESSURE_READ,
            Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
            Scopes.FITNESS_BLOOD_GLUCOSE_READ,
            Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
            Scopes.FITNESS_NUTRITION_WRITE,
            Scopes.FITNESS_SLEEP_READ,
        ],
    };
    GoogleFit.checkIsAuthorized();
    var authorized = GoogleFit.isAuthorized;
    console.log(authorized);
    if (false) {
        // if already authorized, fetch data
        setMsg('already');
    } else {
        // Authentication if already not authorized for a particular device
        GoogleFit.authorize(options).then(authResult => {
            if (authResult.success) {
                console.log('AUTH_SUCCESS');

                // if successfully authorized, fetch data
                setMsg('authorized');
            } else {
                console.log('AUTH_DENIED ' + authResult.message);
                setMsg(authResult.message);
            }
        })
            .catch(() => {
                console.log('AUTH_ERROR');
            });
    }

    var today = new Date();
    var lastWeekDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 8,
    );
    const opt = {
        startDate: lastWeekDate.toISOString(), // required ISO8601Timestamp
        endDate: today.toISOString(), // required ISO8601Timestamp
        bucketUnit: 'DAY', // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
        bucketInterval: 1, // optional - default 1.
    };

    async function fetchStepsData(opt: any) {
        const res = await GoogleFit.getDailyStepCountSamples(opt);
        if (res.length !== 0) {
            for (var i = 0; i < res.length; i++) {
                if (res[i].source === 'com.google.android.gms:estimated_steps') {
                    let data = res[i].steps.reverse();
                    //dailyStepCount = res[i].steps;
                    setSteps(data[0].value);
                }
            }
        } else {
            console.log('Not Found');
        }
    };
    async function fetchCaloriesData(opt: any) {
        const res = await GoogleFit.getDailyCalorieSamples(opt);
        let data = res.reverse();
        if (data.length === 0) {
            setCalories(-1);
        } else {
            setCalories(Math.round(data[0].calorie * -1 * 100) / 100);
        }
    };
    */

    return (
        <ImageBackground source={require('../../assets/BACKGROUND.png')} resizeMode='cover' style={styles.background}>
            <View style={styles.container}>
                <View style={styles.bubble}>
                    <Text style={{ fontSize: 24, alignSelf: 'center' }}>
                        {msg}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.container, { alignItems: 'center' }]}>
                            <Text style={styles.text}>Steps</Text>
                            <Text style={styles.text}>{steps}</Text>
                        </View>
                        <View style={[styles.container, { alignItems: 'center' }]}>
                            <Text style={styles.text}>Calories</Text>
                            <Text style={styles.text}>{calories}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'transparent', //makes the background image visible
        padding: 8,
    },
    bubble: {
        margin: 20,
        borderWidth: 1,
        borderRadius: 4,
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.69)',
        shadowColor: 'deeppink',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
    },
    text: {
        fontSize: 20,
        height: 200,
        width: '100%',
        color: 'red',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
});
