import * as React from 'react';
import NavigationStack from './src/navigation/NavigationStack';
import UtilitiesContext from './src/context/UtilitiesContext';
import { useFonts } from 'expo-font';

function App() {

    const [loaded] = useFonts({
      	pp_regular: require('./assets/fonts/Poppins-Regular.ttf'),
      	pp_light: require('./assets/fonts/Poppins-Light.ttf'),
      	pp_bold: require('./assets/fonts/Poppins-Bold.ttf'),
      	pp_medium: require('./assets/fonts/Poppins-SemiBold.ttf')
    });

	if (!loaded) return null

	return (
		<>
			<UtilitiesContext.Provider>
				<NavigationStack />
			</UtilitiesContext.Provider>
		</>
	)
}

export default App;