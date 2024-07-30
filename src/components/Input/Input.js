import React from "react";
import { View, TextInput } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import styles from "./Input.style";

//onType onChangeText'e göndermek için verdiği herhangi bir isimlendirme
// sen onChangeText diye isimledirsen daha iyi

const Input = ({ placeholder, onType, value, secureTextEntry, iconName }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onType}
        value={value}
        secureTextEntry={secureTextEntry}
      />
      <Icon name={iconName} size={25} color="grey" />
    </View>
  );
};

export default Input;

/*Bu value kısmına {"Merve"} yazsaydın placeholder değerlerine 
default olarak Merve'yi atamış olacaktın
//Ama biz gelen value'ya göre değişsin kaydedilsin istediğimiz için value atadık.*/
