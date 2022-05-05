import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
//icone
import { ChatTeardropDots } from "phosphor-react-native";
import { styles } from "./styles";
import { theme } from "../../theme";

//Menu
import BottomSheet from "@gorhom/bottom-sheet";

//Gesture handle
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { Options } from "../Options";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Form } from "../Form";
import { Success } from "../Success";

//Criando o tipo
export type FeedbackType = keyof typeof feedbackTypes;

export function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
          weight={"bold"}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        <Success />
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
