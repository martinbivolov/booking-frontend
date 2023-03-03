import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, DatePickerIOS, TouchableOpacity, ScrollView } from "react-native";
import { StackMain } from "../components/Navigation";
import { BookingsContext } from "../components/PressNavigation";
import { BookingEntity } from "../entities/BookingEntity";

type deleteScreenProp = StackNavigationProp<StackMain, "Delete">;

export default function EditScreen(props: any) {
  const booking: BookingEntity = props.route.params.booking;
  const navigation = useNavigation<deleteScreenProp>();
  const [name, setName] = useState(booking.name);
  const [numberOfPeople, setNumberOfPeople] = useState(booking.numberOfPeople.toLocaleString());
  const [date, setDate] = useState(new Date(booking.date));
  const [phone, setPhone] = useState(booking.phone);
  const [email, setEmail] = useState(booking.email);
  const [comment, setComment] = useState(booking.comment);
  const { bookings, setBookings } = useContext(BookingsContext);

  const handleEdit = () => {
    const bookingId = props.route.params.booking.id;

    axios
      .put("http://c621-82-211-209-86.ngrok.io/bookings/" + bookingId, {
        name,
        numberOfPeople,
        date,
        phone,
        email,
        comment,
      })
      .then((response) => {
        console.log(response.data);
        const index = bookings.findIndex((booking) => booking.id === bookingId);
        if (index === -1) {
          setBookings(bookings);
        } else {
          const newBookings = [...bookings.slice(0, index), response.data, ...bookings.slice(index + 1)];
          setBookings(newBookings);
        }
      })
      .catch((error) => {
        console.log("Error:", error.message);
        console.log("Request:", error.config);
        console.log("Response:", error.response.data);
      });
  };

  return (
    <ScrollView>
      <View>
        <TextInput style={styles.input} onChangeText={(text) => setName(text)} defaultValue={name}></TextInput>
        <TextInput style={styles.input} onChangeText={(number) => setNumberOfPeople(number)} defaultValue={numberOfPeople}></TextInput>
        <DatePickerIOS maximumDate={new Date(2100, 11, 31)} date={date} onDateChange={(selectedDate) => setDate(selectedDate)}></DatePickerIOS>
        <TextInput style={styles.input} defaultValue={phone} onChangeText={(text) => setPhone(text)}></TextInput>
        <TextInput style={styles.input} defaultValue={email} onChangeText={(text) => setEmail(text)}></TextInput>
        <TextInput style={styles.input} defaultValue={comment} onChangeText={(text) => setComment(text)}></TextInput>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.text}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Delete", { booking })}>
          <Text style={styles.text}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 13,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,

    alignSelf: "center",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
  },
  text: {
    textAlign: "center",
  },
  btnContainer: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
