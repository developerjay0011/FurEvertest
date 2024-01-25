import React from 'react'
import { Provider } from 'react-redux'
import Navigation from './src/Navigation/Navigation'
import { store } from './src/Redux/store'
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from './Theme'
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store} >
        <StatusBar backgroundColor={"white"} barStyle="dark-content" />
        <ThemeProvider>
          <PaperProvider >
            <Navigation />
          </PaperProvider>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  )
}

export default App
