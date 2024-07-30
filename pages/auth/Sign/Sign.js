import React, { useEffect } from "react";
import { Alert, SafeAreaView, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from 'yup';

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

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Ad-Soyad gerekli"),
  phone: Yup.string().required("Telefon gerekli"),
  password: Yup.string().required("Şifre gerekli"),
});

const Sign = ({ navigation }) => {
  const { post, response, error } = usePost(errorMessage);

  const handleLogin = () => {
    navigation.goBack(); 
  };

  const handleFormSubmit = async (formValues) => {
    const payload = {   //Endpoint tek url olduğu için api değerleri üzerinden ayrışıyorlar
      api: "/user/register",
      data: {
        name: formValues.name,
        phone: formValues.phone,
        password: formValues.password,
      },
    };

    await post(signUrl, payload);
  };

  useEffect(() => {
    if (response && response.status == 200) {
      Alert.alert(
        "Başarıyla kayıt oldunuz, sms ile hesabınızı doğrulayınız.",
        "",
        [
          {
            text: "Tamam",
            onPress: () => {
              navigation.navigate("LoginPage");
            },
          },
        ]
      );
    }
    
    else if (response && errorMessage[response.status]) {
      Alert.alert("Başarısız", errorMessage[response.status]);
    }else if(error){
      Alert.alert("Başarısız", "Ups!");
    }
  }, [response, error, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Kayıt Ol</Text>
      <Formik
        initialValues={initialForm} //initialForm bir nesne
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}  //Form gönderildiğinde çalışacak fonksiyonu belirler.
      >
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
              onType={handleChange("phone")}
              
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
