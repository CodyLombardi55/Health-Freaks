import { useEffect, useState } from "react";
import { Platform } from "react-native";
import appleHealthKit, { HealthInputOptions, HealthKitPermissions, HealthUnit } from "react-native-health";

const { Permissions } = appleHealthKit.Constants
const permissions: HealthKitPermissions = {
    permissions: {
        read: [
            Permissions.Steps,
            Permissions.DistanceWalkingRunning,
        ],
        write: [],
    },
};

const useHealthData = () => {
    const [steps, setSteps] = useState(0);
    const [calories, setCalories] = useState(0);
    const [distance, setDistance] = useState(0);
    const [hasPermssions, setHasPermssions] = useState(false);

    useEffect(() => {
        // check if running on an ios device
        if (Platform.OS != 'ios'){
            return;
        }

        appleHealthKit.initHealthKit(permissions, (err) => {
            if (err){
                console.log('Failed to get permissions');
                return;
            }
            setHasPermssions(true);
        });
    }, []);

    // HealthKit implementation
    return { steps, calories, distance };
};

export default useHealthData;