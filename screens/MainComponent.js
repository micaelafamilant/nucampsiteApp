//MainComponent.js: Loads the campsite data and hands it off to DirectoryScreen.

import DirectoryScreen from "./DirectoryScreen";
import { Platform, View } from "react-native";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import Constants from "expo-constants";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AboutScreen from "./AboutScreen";
import ContactScreen from "./ContactScreen";

const Drawer = createDrawerNavigator();

const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: "#5637DD" },
};

const HomeNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
    </Stack.Navigator>
  );
};

const AboutNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: "About" }}
      />
    </Stack.Navigator>
  );
};

const ContactNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{ title: "Contact Us" }}
      />
    </Stack.Navigator>
  );
};

const DirectoryNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Directory" screenOptions={screenOptions}>
      <Stack.Screen
        name="Directory"
        component={DirectoryScreen}
        options={{ title: "Campsite Directory" }}
      />
      <Stack.Screen
        name="CampsiteInfo"
        component={CampsiteInfoScreen}
        options={({ route }) => ({ title: route.params.campsite.name })}
      />
    </Stack.Navigator>
  );
};

const Main = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
      <Drawer.Navigator
        initialRouteName="HomeNav"
        screenOptions={{ drawerStyle: { backgroundColor: "#CEC8FF" } }}
      >
        <Drawer.Screen
          name="HomeNav"
          component={HomeNavigator}
          options={{ title: "Home" }}
        />
        <Drawer.Screen
          name="DirectoryNav"
          component={DirectoryNavigator}
          options={{ title: "Directory" }}
        />
        <Drawer.Screen
          name="About"
          component={AboutNavigator}
          option={{ title: "About" }}
        />
        <Drawer.Screen
          name="ContactNav"
          component={ContactNavigator}
          options={{ title: "Contact Us" }}
        />
      </Drawer.Navigator>
    </View>
  );
};

export default Main;
