import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, AsyncStorage, Image, ScrollView } from "react-native";
import SpotList from "../component/spotlist";
import logo from "../assets/logo.png";

export default function listSpot() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    async function getTechs() {
      let techsArray = await AsyncStorage.getItem("techs");
      techsArray = techsArray.split(",").map((tech) => tech.trim());
      setTechs(techsArray);
    }
    getTechs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <ScrollView>
        {techs.map((tech) => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10,
  },
});
