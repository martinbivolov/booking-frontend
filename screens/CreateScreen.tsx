import axios from "axios";
import { useState, useContext, useRef } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, DatePickerIOS } from "react-native";
import { BookingsContext } from "../components/PressNavigation";

export default function CreateScreen(props: any) {
  const [name, setName] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [date, setChosenDate] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const { addBooking } = useContext(BookingsContext);

  const createBooking = async () => {
    axios
      .post("http://c621-82-211-209-86.ngrok.io/bookings/", {
        name,
        numberOfPeople,
        date,
        phone,
        email,
        comment,
      })
      .then((response) => {
        console.log(response.data);
        addBooking(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    clearForm();
  };
  const clearForm = () => {
    setName("");
    setNumberOfPeople("");
    setChosenDate(new Date());
    setPhone("");
    setEmail("");
    setComment("");
  };
  const input1Ref = useRef<TextInput>(null);
  const input2Ref = useRef<TextInput>(null);
  const input3Ref = useRef<TextInput>(null);
  const input4Ref = useRef<TextInput>(null);
  const input5Ref = useRef<TextInput>(null);
  const handleInput1Submit = () => {
    if (input2Ref.current) {
      input2Ref.current.focus();
    }
  };
  const handleInput2Submit = () => {
    if (input3Ref.current) {
      input3Ref.current.focus();
    }
  };
  const handleInput3Submit = () => {
    if (input4Ref.current) {
      input4Ref.current.focus();
    }
  };
  const handleInput4Submit = () => {
    if (input5Ref.current) {
      input5Ref.current.focus();
    }
  };
  return (
    <View>
      <View>
        <TextInput ref={input1Ref} style={styles.input} placeholder="Name" value={name} onChangeText={(text) => setName(text)} onSubmitEditing={handleInput1Submit}></TextInput>
        <TextInput ref={input2Ref} style={styles.input} placeholder="Number of people" value={numberOfPeople} onSubmitEditing={handleInput2Submit} onChangeText={(text) => setNumberOfPeople(text)}></TextInput>
        <DatePickerIOS maximumDate={new Date(2100, 11, 31)} date={date} onDateChange={(date) => setChosenDate(date)}></DatePickerIOS>
        <TextInput ref={input3Ref} style={styles.input} placeholder="Phone" onSubmitEditing={handleInput3Submit} value={phone} onChangeText={(text) => setPhone(text)}></TextInput>
        <TextInput ref={input4Ref} style={styles.input} placeholder="Email" onSubmitEditing={handleInput4Submit} value={email} onChangeText={(text) => setEmail(text)}></TextInput>
        <TextInput ref={input5Ref} style={styles.input} placeholder="Comment" value={comment} onChangeText={(text) => setComment(text)}></TextInput>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={createBooking}>
          <Text style={styles.text}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
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
