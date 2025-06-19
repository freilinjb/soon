// Crea un nuevo archivo InitialNavigator.js
import OnboardingScreen from "@/screen/OnboardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import HomeTabs from "../app/_layout"; // Asegúrate de exportar HomeTabs desde tu archivo actual

const Stack = createStackNavigator();

const InitialNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null; // Puedes mostrar un splash screen aquí si quieres
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstLaunch ? (
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
        />
      ) : null}
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
      />
    </Stack.Navigator>
  );
};

export default InitialNavigator;
