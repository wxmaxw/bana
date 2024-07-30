import React from "react";
import { SafeAreaView, Text, Alert } from "react-native";
import { Formik } from "formik";

import styles from "./Login.style";
import Input from "../../../src/components/Input";
import Button from "../../../src/components/Button";
import usePost from "../../../src/hooks/usePost/usePost";

const loginUrl = process.env.EXPO_PUBLIC_API_URL;

const initialForm = {
  phone: "",
  password: "",
};

const Login = ({ navigation }) => {
  const errorMessage = {
    200: "Başarıyla giriş yaptınız.",
    201: "Telefon numarası veya şifre eksik girilmiş.",
    202: "Şifreniz hatalı.",
    203: "Bu telefon numarası ile kayıtlı kullanıcı bulunamadı.",
    500: "Hay aksi birşeyler yanlış gitti.",
  };

  const {post, response, error} = usePost();

  console.log("Response  in Login:", response);  //Test için yazdım

  const handleSignUp = () => {
    navigation.navigate("SignPage");
  };

  const handleFormSubmit = async(formValues) => {
    
    const payload ={
      api: "/user/login",
      data: {
        phone: formValues.phone,
        password: formValues.password,
      },
    };

    await post(loginUrl,payload);
    if (response==errorMessage[200]) {  //bunu bi dnee
      Alert.alert(
        "Başarıyla giriş yaptınız.",
        "",
        [
          {
            text: "Tamam",
            onPress: () => {
              navigation.navigate("HomePage");
            },
          },
        ]
      );
    }

    if (error) {
      Alert.alert("Başarısız", error);
    }
    
    console.log("Error in Login:", error);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>bana ne ?</Text>
      <Formik initialValues={initialForm} onSubmit={handleFormSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <>
            <Input
              value={values.phone}
              placeholder="Telefon numaranızı giriniz.."
              onType={handleChange("phone")}
            />
            <Input
              value={values.password}
              placeholder="Şifrenizi giriniz.."
              onType={handleChange("password")}
            />
            <Button text="Giriş Yap" onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <Button text="Kayıt Ol" theme="secondary" onPress={handleSignUp} />
    </SafeAreaView>
  );
};

export default Login;

/*Fragment kullanımı çok anlamadım */
