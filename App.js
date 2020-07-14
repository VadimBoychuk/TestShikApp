/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Animated, Image, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Swipes from './components/Swipes/Swipes';
import InfoScreen from './components/InfoScreen/InfoScreen';
import InfoDetail from './components/InfoDetail/InfoDetail';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

function HomeScreen() {
  return (
    <View
      style={{
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        ackgroundColor: 'white',
      }}>
      <Text style={{}}>Welcome to test App</Text>

      <Image
        style={{width: '100%', height: '40%', resizeMode: 'contain'}}
        source={{
          uri:
            'https://lh3.googleusercontent.com/G_9paloBLxTVrVisHnZgwgvInFNROJQi9ioRo66uI9MBf0g5NSVJriCu1yJ9NKdWrFg',
        }}
      />
    </View>
  );
}
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Stack = createStackNavigator();

function App() {
  const [currentRouteName, setRouteName] = useState('Home');
  const [stateChange, setStateChange] = useState(false);
  const ref = React.useRef(null);
  console.disableYellowBox = true;
  return (
    <NavigationContainer
      ref={ref}
      onStateChange={() => {
        const name = ref.current.getCurrentRoute().name;
        setRouteName(name);
        setStateChange(!stateChange);
      }}>
      <StatusBar barStyle="dark-content" />

      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InfoScreen"
          component={InfoScreen}
          options={{
            headerShown: false,
            lazy: true,
            gestureEnabled: false,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        />
        <Stack.Screen
          name="InfoDetail"
          component={InfoDetail}
          options={{
            headerShown: false,
            lazy: true,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
      {currentRouteName !== 'InfoDetail' && (
        <Swipes
          navigation={ref}
          currentRouteName={currentRouteName}
          stateChange={stateChange}
        />
      )}
    </NavigationContainer>
  );
}

export default App;
