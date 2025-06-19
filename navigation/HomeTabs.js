import HomeScreen from "@/screen/HomeScreen";
import InboxScreen from "@/screen/InboxScreen";
import ProfileScreen from "@/screen/ProfileScreen";
import TripsScreen from "@/screen/TripsScreen";
import WishlistScreen from "@/screen/WishlistScreen";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

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
      <Tab.Screen name="Wishlist" component={WishlistScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Trips" component={TripsScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Inbox" component={InboxScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

export default HomeTabs;


// export default function App() {
//   return (
//     <ThemeProvider>
//       <StatusBar style="dark" />
//       <InitialNavigator />
//     </ThemeProvider>
//   );
// }