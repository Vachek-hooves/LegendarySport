import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { AppContextProvider } from './store/context';
import WelcomeScreen from './screen/WelcomeScreen';
import {
  TabFootbalIntroScreen,
  TabQuizScreen,
  TabTrainingScreen,
  TabUserScreen,
} from './screen/tab';
import { StackFootballPlay, StackQuizLevelScreen, StackTrainingDetailScreen, StackTrainingProgramScreen,  } from './screen/stack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <LinearGradient
      colors={['#00FFFF', '#FF00FF', '#FF1493']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        flexDirection: 'row',
        height: 80,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text
              style={{
                color: isFocused ? '#ffffff' : 'rgba(255,255,255,0.6)',
                fontWeight: 'bold',
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="TabFootbalIntroScreen"
        component={TabFootbalIntroScreen}
        options={{ tabBarLabel: 'Football' }}
      />
      <Tab.Screen
        name="TabQuizScreen"
        component={TabQuizScreen}
        options={{ tabBarLabel: 'Quiz' }}
      />
      <Tab.Screen
        name="TabTrainingScreen"
        component={TabTrainingScreen}
        options={{ tabBarLabel: 'Training' }}
      />
      <Tab.Screen
        name="TabUserScreen"
        component={TabUserScreen}
        options={{ tabBarLabel: 'User' }}
      />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen
            name="StackFootballPlay"
            component={StackFootballPlay}
          />
          <Stack.Screen
            name="StackQuizLevelScreen"
            component={StackQuizLevelScreen}
          />
          <Stack.Screen
            name="StackTrainingDetailScreen"
            component={StackTrainingDetailScreen}
          />
          <Stack.Screen
            name="StackTrainingProgramScreen"
            component={StackTrainingProgramScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}

export default App;
