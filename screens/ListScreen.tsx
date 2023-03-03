import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { View, Text, Button, SafeAreaView, FlatList, Platform } from "react-native";
import Booking from "../components/Booking";
import { BookingEntity } from "../entities/BookingEntity";
import { StyleSheet } from "react-native";
import { BookingsContext } from "../components/PressNavigation";

export default function ListScreen() {
  const { bookings, setBookings } = useContext(BookingsContext);
  const local = Platform.OS === "ios" ? "localhost" : "10.0.2.2";

  useEffect(() => {
    const fetchBookings = async () => {
      axios
        .get("http://c621-82-211-209-86.ngrok.io/bookings")
        .then((response) => {
          setBookings(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchBookings();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Reservations</Text>
      <SafeAreaView style={styles.listContainer}>
        <FlatList data={bookings} renderItem={({ item }: { item: BookingEntity }) => <Booking booking={item} />} keyExtractor={(item) => "" + item.id} style={styles.list} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f321",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  list: {
    paddingHorizontal: 10,
  },
});
