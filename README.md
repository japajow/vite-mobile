## NLW Return Quarto dia React Native projeto mobile

> instalando o expo

npm install -g expo-cli

expo init

projeto blank(Typescript)

> Transferimos as pastas
> assets
> theme
> utils

> criamos a pasta components

executando a aplicação

expo start

> Criamos uma pasta nova dentro components/Widget/index.tsx e styles.ts

instalamos o R Component

com rnbo e rnso conseguimos fazer o esqueleto mais rápido

> no components/Widget/index.tsx

```tsx
import React from "react";
import { Text, View } from "react-native";

import { styles } from "./styles";

export function Widget() {
  return <View style={styles.container}></View>;
}
```

> no components/Widget/styles.ts

```tsx
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {},
});
```

> no App.tsx

```tsx
//modificamos o estilo
export default function App() {
  return (
    <View
      //temos como colocar o estilo direto também da seguinte forma
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Widget />
      // colocamos estilo light no StatusBar e cor transparente
      <StatusBar style="light" backgroundColor="transparent" />
    </View>
  );
}
```

## Configurando fonte personalizada

pesquisar no google por expo google fontes

instalar
expo install expo-font @expo-google-fonts/inter

expo install expo-app-loading

**loading tem a funcao de verificar se a fonte foi carregada , caso nao ele fica com o icone splash carregando**

> importamos

import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

App.tsx

```tsx
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
```

Colocamos a variável fontes useFonts dentro App(){}

```tsx
let [fontsLoaded] = useFonts({
  Inter_400Regular,
  Inter_500Medium,
});
```

Colocamos o if com loading

```tsx
if (!fontsLoaded) {
  return <AppLoading />;
}
```

## Criando criação do botão flutuando

> importando o TouchableOpacity
> Elemento flutuante de clique

instalando a biblioteca de icones phosphor

npm install --save phosphor-react-native

> Instalando a biblioteca react native svg que lida com SVG

expo install react-native-svg

importando o icone ChatTeardropDots

Widget/index.tsx

```tsx
//icone
import { ChatTeardropDots } from "phosphor-react-native";

<ChatTeardropDots
  size={24}
  color={theme.colors.text_on_brand_color}
  weight={"bold"}
/>;
```

Colocamos um estilo no TouchableOPacity

no styles.ts

```tsx
import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.brand,

    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 16,
    bottom: 16, // aqui no bottom o iPhone fica um pouco apagado para isso instalamos uma biblioteca
  },
});
```

> instalando a biblioteca para footer no iPhone
> npm install react-native-iphone-x-helper

Agora importamos o getBottomSpace from react-native-iphone-x-helper

```tsx
import { getBottomSpace } from "react-native-iphone-x-helper";
```

Agora usamos ele

```tsx

  bottom: getBottomSpace() + 16,

```

## Criando o Menu 

