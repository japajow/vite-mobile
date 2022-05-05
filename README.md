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

## Criando o Menu BottomSheet

instalando o bottom sheet

expo install @gorhom/bottom-sheet@^4

> Precisamos instalar mais 2 biblioteca

reanimated para animação
gesture-handle seria a parte de gestos

https://docs.expo.dev/versions/latest/sdk/reanimated/

expo install react-native-reanimated

Precisamos colocar o plugin dentro do nosso babel

plugins: ['react-native-reanimated/plugin'],

```tsx
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
```

GestureHandle

expo install react-native-gesture-handler

import 'react-native-gesture-handler';
Colocamos no começo do App.tsx

```tsx
import "react-native-gesture-handler";
```

expo start --clear

importamos o BottomSheet

importamos o useRef do react
Widget/index.tsx
import React, { useRef } from "react";

```tsx
import React, { useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

// Criamos a referencia
const bottomSheetRef = useRef<BottomSheet>(null); //tipo dele e um BottomSheet

//utilizamos o BottomSheet
//snapPoints e fechado e aberto,  fechado começa por 1 e aberto fica em  280
<BottomSheet ref={bottomSheetRef} snapPoints={[1, 280]}></BottomSheet>;

//Criamos uma funcao chamada handleOpen , quando clicar no icone abre o menu (BottomSheet)
function handleOpen() {
  //pegamos a referencia e expandimos ele
  bottomSheetRef.current?.expand();
}

// passamo o onPress no TouchableOpacity
 <TouchableOpacity style={styles.button}  onPress={handleOpen}>
```

Agora importamos o gesture handle para quando arrastar fechar o bottom sheet

import :

```tsx
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

//tiramos o export do
//export function Widget()

function Widget();

//exportamos usando o gestureHandlerRootHOC
export default gestureHandlerRootHOC(Widget); //passando o Widget
```

> Estilizando o BottomSheet

- backgroundStyle={styles.modal}
- handleIndicatorStyle={styles.indicator}

```tsx
<BottomSheet
  ref={bottomSheetRef}
  snapPoints={[1, 280]}
  backgroundStyle={styles.modal}
  handleIndicatorStyle={styles.indicator}
></BottomSheet>
```

Vamos no styles.ts e estilizar
modal: {

},
indicator:{

}

```tsx
  modal: {
    backgroundColor: theme.colors.surface_primary,
    paddingBottom: getBottomSpace() + 16,
  },
  indicator: {
    backgroundColor: theme.colors.text_primary,
    width: 56,
  },

```

## Criando a parte do Copyright

Criando uma pasta components/Copyright/index.tsx e styles.ts

rnso e rnbc

Criando o components/Options/index.tsx e styles.ts

Options/index.tsx
importamos o Copyright

```tsx
import { Copyright } from "../Copyright";
<Copyright />;
```

Utilizamos o Copyright no Widget/index.tsx importando o Options
Dentro do BottomSheet

```tsx
<BottomSheet
  ref={bottomSheetRef}
  snapPoints={[1, 280]}
  backgroundStyle={styles.modal}
  handleIndicatorStyle={styles.indicator}
>
  <Options />
</BottomSheet>
```

> Colocando o conteúdo no Copyright

```tsx
import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";

export function Copyright() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Feito com ♥ pela Rocketseat</Text>
    </View>
  );
}
```

Colocando o estilo text

```tsx
import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: theme.colors.text_secondary,
    fontFamily: theme.fonts.medium,
  },
});
```

No Options/styles.ts

```tsx
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
```

## Criando um novo componente Option

components/Option/index.tsx styles.ts

Option/index.tsx
importamos o TouchableOpacity e TouchableOpacityProps

```tsx
import { View, TouchableOpacity, TouchableOpacityProps } from "react-native";
```

importamos tambem a Image e ImageProps e Text

```tsx
import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  ImageProps,
  Text,
} from "react-native";
```

Agora no JSX

```tsx
//criamos uma interface extendendo TouchableOpacityProps
interface Props extends TouchableOpacityProps {
  title: string;
  image: ImageProps;
}

//Passamos agora as props
export function Option({ title, image, ...rest }: Props) {}

//passamos o spreadOperator ...rest pregando qualquer outra propriedade
<TouchableOpacity style={styles.container} {...rest}></TouchableOpacity>;

//Importamos a imagem e o texto
<TouchableOpacity style={styles.container} {...rest}>
  <Image source={image} style={styles.image} />
  <Text style={styles.title}>Title</Text>
</TouchableOpacity>;
```

Estilizando o Option

```tsx
import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    width: 104,
    height: 112,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: theme.colors.surface_secondary,
  },
  title: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary,
  },
  image: {
    width: 40,
    height: 40,
  },
});
```

Agora dentro de Options renderizamos o nosso Option

Options/index.tsx
importamos Option e FeedbackTypes

```tsx
import React from "react";
import { View } from "react-native";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Copyright } from "../Copyright";
import { Option } from "../Option";

import { styles } from "./styles";

export function Options() {
  return (
    <View style={styles.container}>
      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option key={key} title={value.title} image={value.image} />
        ))}
      </View>
      <Copyright />
    </View>
  );
}
```

Colocando o Titulo no BottomSheet
Options/index.tsx

```tsx

<View style={styles.container}>
      <Text style={styles.title}></Text>

```

No Options/styles.ts
incluímos o estilo no title

```tsx
  title: {
    fontSize: 20,
    marginBottom: 32,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary,
  },
```

## Criando um novo componente Form

Criando components/Form/styles.ts e index.tsx
importamos TextInput, Image,Text, TouchableOpacity

usamos ArrowLeft

e o Titulo sera vindo de forma aleatória

```tsx
import { ArrowLeft } from "phosphor-react-native";
import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { theme } from "../../theme";

import { styles } from "./styles";

export function Form() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <ArrowLeft
            size={24}
            weight={"bold"}
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}></Text>
        </View>
      </View>
    </View>
  );
}
```

Como o titulo e aleatório vamos criar o type dele no Widget/index.tsx para tipar
Widget/index.tsx

```tsx
export type FeedbackType = keyof typeof FeedbackTypes;
```

Agora vamos no Form/index.tsx
Criamos uma interface para definir as propriedades

```tsx
interface Props {
  feedbackType: FeedbackType;
}

//usamos ele na props do Form
export function Form({ feedbackType }: Props) {
  //criamos uma variável info  e buscamos pela lista no feedbackTypes
  const feedbackTypeInfo = feedbackTypes[feedbackType];
  //Agora conseguimos recuperar o title e a imagem vindo pelo props
  <View style={styles.titleContainer}>
    <Image source={feedbackTypeInfo.image} style={styles.image} />
    <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
  </View>;
}
```

> Ficando assim o Form completo

```tsx
import { ArrowLeft } from "phosphor-react-native";
import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { FeedbackType } from "../Widget";

import { styles } from "./styles";

interface Props {
  feedbackType: FeedbackType;
}
export function Form({ feedbackType }: Props) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <ArrowLeft
            size={24}
            weight={"bold"}
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>
    </View>
  );
}
```

> Vamos estilizar o nosso Form

Form/styles.ts

```tsx
import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    marginVertical: 16,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 24,
  },
  titleText: {
    fontSize: 20,
    color: theme.colors.text_primary,
    fontFamily: theme.fonts.medium,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});
```

Agora vamos no Widget/index.tsx

```tsx
//colocamos o Form temporariamente
<Form feedbackType="BUG" />
```

Vamos voltar ao Form/index.tsx
Adicionamos a parte do input

```tsx
<TextInput
  multiline
  style={styles.input}
  placeholder={
    "Algo nao esta funcionando bem? Queremos corrigir. Conte com detalhes o que esta acontecendo"
  }
  placeholderTextColor={theme.colors.surface_secondary}
/>
```

volitamos no Form/styles.ts

```tsx

  input: {
    height: 112,
    padding: 12,
    marginBottom: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    color: theme.colors.text_primary,
    fontFamily: theme.fonts.regular,
  },

```

## Criando um novo componente chamado screenshot

Criamos a pasta components/Screenshot/index.tsx e styles.ts
Importamos o TouchableOpacity e Image

Criamos uma interface passando screenshot e uma funcao

```tsx
interface Props {
  screenshot: string | null;
  onTakeShot: () => void;
  onRemoveShot: () => void;
}

//passamos a props no ScreenshotButton
export function ScreenshotButton({
  screenshot,
  onTakeShot,
  onRemoveShot,
}: Props) {}

// E no TouchableOpacity passamos onPress uma condição

<TouchableOpacity
  style={styles.container}
  onPress={screenshot ? onRemoveShot : onTakeShot}
></TouchableOpacity>;
```

Deixamos o ScreenshotButton/index.tsx assim

```tsx
import { Camera, Trash } from "phosphor-react-native";
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { theme } from "../../theme";

import { styles } from "./styles";

interface Props {
  screenshot: string | null;
  onTakeShot: () => void;
  onRemoveShot: () => void;
}

export function ScreenshotButton({
  screenshot,
  onTakeShot,
  onRemoveShot,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={screenshot ? onRemoveShot : onTakeShot}
    >
      {screenshot ? (
        <Trash
          size={22}
          color={theme.colors.text_secondary}
          weight={"fill"}
          style={styles.removeIcon}
        />
      ) : (
        <Camera size={24} color={theme.colors.text_secondary} weight={"bold"} />
      )}
    </TouchableOpacity>
  );
}
```

Vamos estilizado o screenshotButton/styles.ts

```tsx
import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: theme.colors.surface_secondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    position: "relative",
  },
  removeIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
```

Vamos importar o ScreenshotButton no nosso Form/index.tsx

```tsx
<View style={styles.footer}>
  <ScreenshotButton
    onRemoveShot={() => {}}
    onTakeShot={() => {}}
    screenshot={""}
  />
</View>
```

Incluindo a estilização do footer no Form/styles.ts

```tsx

 footer: {
    flexDirection: "row",
    marginBottom: 16,
  },

```

## Criando um novo componente botão de enviar o feedback

Criamos um components/Button/index.tsx e styles.ts

importamos o Text, TouchableOpacity, TouchableOpacityProps,ActivityIndicator

Button/index.tsx

```tsx
//Criamos a interface
interface Props extends TouchableOpacityProps {
  isLoading: boolean;
}

//passamos a props no Button
export function Button({ isLoading, ...rest }: Props) {}

// fazemos ima condicional
<TouchableOpacity style={styles.container} {...rest}>
  {isLoading ? (
    <ActivityIndicator color={theme.colors.text_on_brand_color} />
  ) : (
    <Text style={styles.title}>Enviar Feedback</Text>
  )}
</TouchableOpacity>;
```

Agora no Button/styles.ts

```tsx
import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    backgroundColor: theme.colors.brand,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  title: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_on_brand_color,
  },
});
```

Agora vamos no Form/index.tsx
importamos o nosso Button

```tsx
<View style={styles.footer}>
  <ScreenshotButton
    onRemoveShot={() => {}}
    onTakeShot={() => {}}
    screenshot={"https://github.com/japajow.png"}
  />

  <Button isLoading={true} />
</View>
```

Modificando um pouco o nosso ScreenshotButton

```tsx
De


<Trash
  size={22}
  color={theme.colors.text_secondary}
  weight={"fill"}
  style={styles.removeIcon}
/>

PARA

<View>
  <Image source={{ uri: screenshot }} style={styles.image} />
  <Trash
    size={22}
    color={theme.colors.text_secondary}
    weight={"fill"}
    style={styles.removeIcon}
  />
</View>

```

Adicionando o estilo image no ScreenshotButton/styles.ts

```tsx
  image: {
    width: 40,
    height: 40,
  },
```

## Criando o ultimo componente Success

Criamos components/Success/index.tsx e styles.ts
importamos o Image,Text,TouchableOpacity

import successImg from "../../assets/success.png";
**Porem vai dar erro**
criamos uma pasta @types/png.d.ts

```tsx
declare module "*.png";
```

No Success/index.tsx

```tsx
import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import successImg from "../../assets/success.png";
import { Copyright } from "../Copyright";

import { styles } from "./styles";

export function Success() {
  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />
      <Text style={styles.title}>Agradecemos o feedback!</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonTitle}>Quero enviar outro</Text>
      </TouchableOpacity>
      <Copyright />
    </View>
  );
}
```

No Success/styles.ts

```tsx
import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
  container: { alignItems: "center" },
  image: {
    width: 36,
    height: 36,
    marginTop: 42,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 24,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary,
  },
  button: {
    height: 40,
    backgroundColor: theme.colors.surface_secondary,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    marginBottom: 56,
  },
  buttonTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary,
  },
});
```

Agora vamos testar e ver como ficou la no Widget/index.tsx

```tsx
//temporariamente colocamos o componente Success
<Success />
```

## Capturando a tela e fazendo aparecer

Vamos no nosso Widget/index.tsx e mudar o Success para Form

Vamos no Form/index.tsx e fazer o botão do screenshot funcionar

instalando a biblioteca react-native-view-shot
npm install react-native-view-shot

importamos uma funcao chamada captureScreen

```tsx
import { captureScreen } from "react-native-view-shot";
```

e importamos tambem o useState para guardar o valor da screenshot feita

```tsx
//string ou null
const [screenshot, setScreenShot] = useState<string | null>(null);

//criamos uma funcao
function handleScreenShot() {
  captureScreen({
    format: "jpg",
    quality: 0.8,
  })
    .then((uri) => setScreenShot(uri))
    .catch((error) => console.log(error.message));
}
// passamos a funcao handleScreenshot no onTakeShot
<View style={styles.footer}>
  <ScreenshotButton
    onRemoveShot={handleScreenShot}
    onTakeShot={() => {}}
    screenshot={"https://github.com/japajow.png"}
  />

  <Button isLoading={true} />
</View>;

//Criamos a funcao pra remover o screenshot

function handleScreenshotRemove() {
  setScreenShot(null);
}

//passamos a funcao handleScreenshotRemove
<View style={styles.footer}>
  <ScreenshotButton
    onTakeShot={handleScreenShot}
    onRemoveShot={handleScreenshotRemove}
    screenshot={screenshot}
  />

  <Button isLoading={false} />
</View>;
```

## Fazendo as rotas funcionarem

No Widget/index.tsx

Pegando as informação que foi selecionado pelas Options

```tsx
const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
const [feedbackSent, setFeedbackSent] = useState(false);

//fazemos um condicional para pegar mudar a tela conforme houver o feedbackSent ou feedbackType
{
  feedbackSent ? (
    <Success />
  ) : (
    <>{feedbackType ? <Form feedbackType={feedbackType} /> : <Options />}</>
  );
}

// no Options passamos um propriedade que vai pegar os feedbacks selecionados
{
  feedbackSent ? (
    <Success />
  ) : (
    <>
      {feedbackType ? (
        <Form feedbackType={feedbackType} />
      ) : (
        <Options onFeedbackTypeChanged={setFeedbackType} />
      )}
    </>
  );
}
```

No Options/index.tsx

Criamos uma interface passando o onFeedbackTypeChanged tipando ele com o FeedbackType

```tsx
interface Props {
  onFeedbackTypeChanged: (feedbackType: FeedbackType) => void;
}

//Passamos o onFeedbackTypeChanged na props da Options
export function Options({ onFeedbackTypeChanged }: Props) {}

//Passando no onPress qual foi a chave selecionada
{
  Object.entries(feedbackTypes).map(([key, value]) => (
    <Option
      key={key}
      title={value.title}
      image={value.image}
      onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
    />
  ));
}
```

> Agora vamos fazer o botão de voltar funcionar

Form/index.tsx
Adicionamos na interface mais 2 funcao

```tsx
interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

// colocamos no props da Form
export function Form({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}: Props) {}

//pegamos o onFeedbackCanceled e colocamos
<TouchableOpacity onPress={onFeedbackCanceled}>
  // <ArrowLeft size={24} weight={"bold"} color={theme.colors.text_secondary} />
</TouchableOpacity>;
```

Voltamos ao Widget/index.tsx

```tsx
{
  feedbackSent ? (
    <Success />
  ) : (
    <>
      {feedbackType ? (
        <Form
          feedbackType={feedbackType}
          onFeedbackCanceled={criamos uma funcao para resetar}
          onFeedbackSent={() => {}}
        />
      ) : (
        <Options onFeedbackTypeChanged={setFeedbackType} />
      )}
    </>
  );
}

function handleRestartFeedback(){
  setFeedbackType(null)
  setFeedbackSent(false)
}

//Usamos a funcao handleRestartFeedback no onFeedbackCanceled

  //  {feedbackSent ? (
  //         <Success />
  //       ) : (
  //         <>
  //           {feedbackType ? (
  //             <Form
                feedbackType={feedbackType}
                onFeedbackCanceled={handleRestartFeedback}
                onFeedbackSent={() => {}}
    //           />
    //         ) : (
    //           <Options onFeedbackTypeChanged={setFeedbackType} />
    //         )}
    //       </>
    //     )}
    //   </BottomSheet>
    // </>

    //E para o  onFeedbackSent criamos outra funcao

    function handleFeedbackSent(){
      setFeedbackSent(true)
    }

     feedbackType={feedbackType}
     onFeedbackCanceled={handleRestartFeedback}
     onFeedbackSent={handleFeedbackSent}
```

No Form/index.tsx criamos uma funcao para o Button para fazer um submit

```tsx
// criamos uim estado
const [isSendFeedback, setIsSendFeedback] = useState(false);

async function handleSendFeedback() {
  if (isSendFeedback) {
    return;
  }

  await setIsSendFeedback(true);
}

// E no nosso Button colocamos handleSendFeedback
<Button isLoading={isSendFeedback} onPress={handleSendFeedback} />;

//Criamos agora um try catch para fazer o tratamento de requisição

async function handleSendFeedback() {
  if (isSendFeedback) {
    return;
  }

  setIsSendFeedback(true);

  try {
  } catch (error) {}
}
```

## integrando o nosso projeto com backend usando Axios
