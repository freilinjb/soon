import FiltersModal from "@/components/FiltersModal";
import LoginModal from "@/components/LoginModal";
import { ThemeProvider } from "@/context/ThemeContext";
import ChatScreen from "@/screen/ChatScreen";
import HomeScreen from "@/screen/HomeScreen";
import InboxScreen from "@/screen/InboxScreen";
import ProfileScreen from "@/screen/ProfileScreen";
import PropertyDetailScreen from "@/screen/PropertyDetailScreen";
import TripsScreen from "@/screen/TripsScreen";
import WishlistScreen from "@/screen/WishlistScreen";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Explore") {
            iconName = focused ? "search" : "search-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Wishlist") {
            iconName = focused ? "heart" : "heart-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Trips") {
            iconName = focused ? "airplane" : "airplane-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Inbox") {
            iconName = focused ? "mail" : "mail-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "#2EC0CE",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen
        name="Explore"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Trips" component={TripsScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

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
        </Stack.Group>
      </Stack.Navigator>
      {/* </NavigationContainer> */}
    </ThemeProvider>
  );
}
