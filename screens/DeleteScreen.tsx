import { useContext } from "react";
import axios from "axios";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BookingsContext } from "../components/PressNavigation";

export default function DeleteScreen(props: any) {
  const { bookings, setBookings } = useContext(BookingsContext);

  const deleteBooking = () => {
    const bookingId = props.route.params.booking.id;
    console.log(bookingId);
    axios
      .delete(`"http://c621-82-211-209-86.ngrok.io/bookings/` + bookingId)
      .then((response) => {
        console.log(response.data);
        const newBookings = bookings.filter((booking) => booking.id !== bookingId);
        setBookings(newBookings);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <Text style={styles.title}>Are you sure you want to delete this booking?</Text>
      <TouchableOpacity style={styles.button} onPress={deleteBooking}>
        <Text style={styles.buttonText}> Yes </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    margin: 13,
  },
  button: {
    backgroundColor: "#ff6666",
    padding: 10,
    margin: 15,
    height: 40,
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    fontSize: 18,
  },
});
