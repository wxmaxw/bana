import React from "react";
import { Alert, SafeAreaView, Text } from "react-native";
import { Formik } from "formik";

import styles from "./Sign.style";
import Input from "../../../src/components/Input";
import Button from "../../../src/components/Button";
import usePost from "../../../src/hooks/usePost/usePost";

const signUrl = process.env.EXPO_PUBLIC_API_URL;

const initialForm = {
  name: "",
  phone: "",
  password: "",
};

const errorMessage = {
  201: "Bu telefon ile daha önce kayıt olunmuş. Giriş yapınız.",
  500: "Hay aksi birşeyler yanlış gitti.",
};

const Sign = ({ navigation }) => {

  const { post, response, error } = usePost(errorMessage);

  const handleLogin = () => {
    navigation.goBack(); 
  };

  const handleFormSubmit = async (formValues) => {
    // API isteği için doğru yapıyı gönderiyoruz
    const payload = {
      api: "/user/register",
      data: {
        name: formValues.name,
        phone: formValues.phone,
        password: formValues.password,
      },
    };

    await post(signUrl, payload);

    console.log("Response in SignPage", response); //Test için yazdım

    if (response) {
      Alert.alert(
        "Başarıyla kayıt oldunuz, sms ile hesabınızı doğrulayınız.",
        "",
        [
          {
            text: "Tamam",
            onPress: () => {
              handleLogin(); // `handleLogin` fonksiyonunu çağırır
            },
          },
        ]
      );
    }

    /* ALERTIN YAPISI
    Alert.alert(
    title, // (1) Başlık
    message, // (2) Mesaj
    buttons, // (3) Butonlar
    options // (4) Opsiyonel seçenekler
);
 */

    if (error) {
      Alert.alert("Başarısız", error);
    }       
    console.log("Error in SignPage:", error);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>bana ne ?</Text>
      <Formik initialValues={initialForm} onSubmit={handleFormSubmit}>
        {({ values, handleChange, handleSubmit}) => (
          <>
            <Input
              value={values.name}
              placeholder="Ad-Soyad giriniz..."
              onType={handleChange("name")}
            />
            <Input
              value={values.phone}
              placeholder="Telefon numaranızı giriniz..."
              onType={handleChange("phone")} //onChangeText
            />
            <Input
              value={values.password}
              placeholder="Şifrenizi giriniz..."
              onType={handleChange("password")}
              //secureTextEntry
            />
            <Button text="Kayıt Ol" theme="secondary" onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <Button text="Geri" onPress={handleLogin} />
    </SafeAreaView>
  );
};

export default Sign;
