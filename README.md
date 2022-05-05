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

##  Configurando fonte personalizada

pesquisar no google por expo google fontes

instalar
expo install expo-font @expo-google-fonts/inter

expo install expo-app-loading

**loading tem a funcao de verificar se a fonte foi carregada , caso nao ele fica com o icone splash carregando**




