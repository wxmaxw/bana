import React from "react";
import { Text, TouchableOpacity, ActivityIndicator, View } from "react-native";
import Icon  from "react-native-vector-icons/MaterialIcons";

import styles from "./Button.style";

/*
const obj = {
  user:{
  name: "Ayşe",
  },
};

obj.user.name;
obj["user"].name ile aynı ifade etme şekli bir dot notation daha makbul ama
*/ 

const Button = ({ text, onPress, loading, iconName, theme="primary"}) => {
  return (
    <TouchableOpacity
      style={styles[theme].container}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <View style={styles[theme].button_container}>
          <Icon name={iconName} size={18} color="white"/>
          <Text style={styles[theme].title}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

//disabled loading true olduğunda yani loading yapılırken butona tekrar basmayı engelliyor