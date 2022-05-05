import { ArrowLeft } from "phosphor-react-native";
import React from "react";
import { Image, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { ScreenshotButton } from "../ScreenshotButton";
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

      <TextInput
        multiline
        style={styles.input}
        placeholder={
          "Algo nao esta funcionando bem? Queremos corrigir. Conte com detalhes o que esta acontecendo"
        }
        placeholderTextColor={theme.colors.surface_secondary}
      />
      <View style={styles.footer}>
        <ScreenshotButton
          onRemoveShot={() => {}}
          onTakeShot={() => {}}
          screenshot={""}
        />
      </View>
    </View>
  );
}
