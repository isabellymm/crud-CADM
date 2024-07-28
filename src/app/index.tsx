import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import CreateProducts from '@/screens/CreateProducts';
import ListProducts from '@/screens/ListProducts';
import UpdateProducts from '@/screens/UpdateProducts';

const Stack = createNativeStackNavigator();

function App() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="ListProducts" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="ListProducts" component={ListProducts} />
          <Stack.Screen name="CreateProducts" component={CreateProducts} />
          <Stack.Screen name="UpdateProducts" component={UpdateProducts} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default App;
