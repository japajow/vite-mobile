import { ArrowLeft } from "phosphor-react-native";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Button } from "../Button";
import { ScreenshotButton } from "../ScreenshotButton";
import { FeedbackType } from "../Widget";
import { styles } from "./styles";

import { captureScreen } from "react-native-view-shot";
import { api } from "../../libs/api";

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}
export function Form({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}: Props) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const [screenshot, setScreenShot] = useState<string | null>(null);

  const [isSendFeedback, setIsSendFeedback] = useState(false);

  const [comment, setComment] = useState("");

  function handleScreenShot() {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    })
      .then((uri) => setScreenShot(uri))
      .catch((error) => console.log(error));
  }

  function handleScreenshotRemove() {
    setScreenShot(null);
  }

  async function handleSendFeedback() {
    if (isSendFeedback) {
      return;
    }

    setIsSendFeedback(true);

    try {
      await api.post("/feedbacks", {
        type: feedbackType,
        screenshot,
        comment,
      });

      onFeedbackSent();
    } catch (error) {
      console.log(error);
      setIsSendFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
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
        autoCorrect={false}
        onChangeText={setComment}
      />
      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenShot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />

        <Button isLoading={isSendFeedback} onPress={handleSendFeedback} />
      </View>
    </View>
  );
}
