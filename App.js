import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from '@use-expo/font';
import { Asset } from "expo-asset";
import { Image } from "react-native";
import Screens from "./navigation/Screens";
import { Images, articles, AlerttmeeTheme } from "./constants";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.AlerttmeeLogo,
  Images.iOSLogo,
  Images.androidLogo
];
// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  // Pre-load fonts, make any API calls you need to do here
  const [fontsLoaded] = useFonts({
   'AlerttmeeExtra': require('./assets/font/alerttmee.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {        
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await Promise.all([...cacheImages(assetImages)]);
        await new Promise(resolve => setTimeout(resolve, 2000));
        // This tells the splash screen to hide immediately! If we call this after
        // `setAppIsReady`, then we may see a blank screen while the app is
        // loading its initial state and rendering its first pixels. So instead,
        // we hide the splash screen once we know the root view has already
        // performed layout.
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
      console.log('prepare is called');
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

return (
      <NavigationContainer>
        <GalioProvider theme={AlerttmeeTheme}>
          <Block flex>
            <Screens />
          </Block>
        </GalioProvider>
      </NavigationContainer>
    );
}