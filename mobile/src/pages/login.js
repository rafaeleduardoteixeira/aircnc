import React, { useState, useEffect } from "react";
import { StyleSheet, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View, Image, AsyncStorage } from "react-native";
import api from "../services/api";
import logo from "../assets/logo.png";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [techs, setTechs] = useState("");
  async function handleSubmit() {
    const response = await api.post("/sessions", {
      email,
    });
    const { _id } = response.data;
    await AsyncStorage.setItem("user", _id);
    await AsyncStorage.setItem("techs", techs);
    navigation.navigate("ListSpots");
  }

  useEffect(() => {
    async function getUserLogged() {
      const user = await AsyncStorage.getItem("user");
      if (user){
        navigation.navigate("ListSpots");
      }
    }
    getUserLogged();
  }, []);

  return (
    <KeyboardAvoidingView enabled={Platform.OS === "ios"} behavior="padding" style={styles.container}>
      <Image source={logo} />
      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL*</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o seu email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.label}>TECNOLOGIAS*</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={(text) => setTechs(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.textButton}>Encontrar spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 30,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 6,
  },
  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
