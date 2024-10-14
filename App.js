import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider } from './store/context';
import WelcomeScreen from './screen/WelcomeScreen';
import { TabFootbalIntroScreen, TabSimulatorScreen } from './screen/tab';
import { StackFootballPlay } from './screen/stack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {/* <Tab.Screen name="TabSimulatorScreen" component={TabSimulatorScreen} /> */}
      <Tab.Screen
        name="TabFootbalIntroScreen"
        component={TabFootbalIntroScreen}
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
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}

export default App;
