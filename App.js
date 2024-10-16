import React,{useEffect} from 'react';
import { View, Text, TouchableOpacity ,Platform,AppState,Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { AppContextProvider } from './store/context';
import WelcomeScreen from './screen/stack/WelcomeScreen';
import {
  TabFootbalIntroScreen,
  TabQuizScreen,
  TabTrainingScreen,
  TabUserScreen,
} from './screen/tab';
import {
  StackFootballPlay,
  StackQuizLevelScreen,
  StackTrainingDetailScreen,
  StackTrainingProgramScreen,
} from './screen/stack';
import { playBackgroundMusic,resetPlayer } from './components/bgSound/setupPlayer';
import userIcon from './assets/icons/user.png';
import footballIcon from './assets/icons/football.png';
import quizIcon from './assets/icons/quiz.png';
import trainingIcon from './assets/icons/training.png';

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
        height: 100,
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

        // Add this function to get the icon based on the route name
        const getTabIcon = (routeName) => {
          switch (routeName) {
            case 'TabUserScreen':
              return userIcon;
            case 'TabFootbalIntroScreen':
              return footballIcon;
            case 'TabQuizScreen':
              return quizIcon;
            case 'TabTrainingScreen':
              return trainingIcon;
            default:
              return null;
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
            <Image
              source={getTabIcon(route.name)}
              style={{
                width: 40,
                height: 40,
                marginBottom: 2,
                tintColor: isFocused ? '#ffffff' : 'rgba(255,255,255,0.6)',
              }}
            />
            <Text
              style={{
                color: isFocused ? '#ffffff' : 'rgba(255,255,255,0.6)',
                fontWeight: 'bold',
                fontSize: 12,
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
        name="TabUserScreen"
        component={TabUserScreen}
        options={{ tabBarLabel: 'User' }}
      />
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
    </Tab.Navigator>
  );
};

function App() {

  useEffect(() => {
    const initializePlayer = async () => {
      try {
        await playBackgroundMusic();
      } catch (error) {
        console.error('Error initializing player:', error);
      }
    };

    initializePlayer();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        resetPlayer();
      } else if (nextAppState === 'active') {
        playBackgroundMusic();
      }
    });

    return () => {
      subscription.remove();
      resetPlayer();
    };
  }, []);

  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            animationDuration: 1000,
          }}
        >
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />

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
