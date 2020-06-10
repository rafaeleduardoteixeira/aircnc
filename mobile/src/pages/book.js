import React, { useState } from "react";
import { SafeAreaView, Alert, AsyncStorage, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import api from "../services/api";

export default function Book({ navigation }) {
  const [date, setDate] = useState("");
  const id = navigation.getParam("id");

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem("user");

    await api.post(
      `/spots/${id}/bookings`,
      {
        date,
      },
      {
        headers: { user_id },
      }
    );
    Alert.alert("Solicitação de reserva enviada.");
    returnList();
  }

  function handleCancel() {
    returnList();
  }

  function returnList() {
    navigation.navigate("ListSpots");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Data de interesse*</Text>
      <TextInput
        style={styles.input}
        placeholder="Qual data você quer reservar"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        value={date}
        onChangeText={(text) => setDate(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.textButton}>Solicitar reserva</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.textButton}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#444",
    marginTop: 20,
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
  cancelButton: {
    height: 42,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginTop: 10,
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
