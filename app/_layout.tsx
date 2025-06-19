import FiltersModal from "@/components/FiltersModal";
import LoginModal from "@/components/LoginModal";
import { ThemeProvider } from "@/context/ThemeContext";
import HomeTabs from "@/navigation/HomeTabs";
import BookingScreen from "@/screen/BookingScreen";
import ChatScreen from "@/screen/ChatScreen";

import PropertyDetailScreen from "@/screen/PropertyDetailScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider>
      {/* <NavigationContainer> */}
      <StatusBar style="dark" />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PropertyDetail"
          component={PropertyDetailScreen}
          options={{
            title: "Property Details",
            headerStyle: {
              backgroundColor: "#fff",
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: "#000",
          }}
        />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="LoginModal"
            component={LoginModal}
            options={{
              title: "Welcome to Soon",
              headerStyle: {
                backgroundColor: "#fff",
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: "#000",
            }}
          />
          <Stack.Screen
            name="FiltersModal"
            component={FiltersModal}
            options={{
              title: "Filters",
              headerStyle: {
                backgroundColor: "#fff",
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: "#000",
            }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              title: "Chat",
              headerStyle: {
                backgroundColor: "#fff",
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: "#2EC0CE",
            }}
          />

          <Stack.Screen
            name="Reservacion"
            component={BookingScreen}
            options={{
              title: "Chat",
              headerStyle: {
                backgroundColor: "#fff",
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: "#2EC0CE",
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
      {/* </NavigationContainer> */}
    </ThemeProvider>
  );
}
