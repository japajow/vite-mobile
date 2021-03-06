import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import  Widget  from "./src/components/Widget";
import { theme } from "./src/theme";

//fontes
import AppLoading from "expo-app-loading";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text>Ola mundo!</Text>
      <StatusBar style="light" backgroundColor="transparent" />
      <Widget />
    </View>
  );
}
