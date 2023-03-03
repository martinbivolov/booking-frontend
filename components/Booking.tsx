import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { BookingEntity } from '../entities/BookingEntity'
import { useNavigation } from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack';
import { StackMain } from './Navigation';
import { StyleSheet } from "react-native";

type bookingScreenProp = StackNavigationProp<StackMain, 'Edit'>;

export default function Booking({booking}: {booking: BookingEntity}) {
    const navigation = useNavigation<bookingScreenProp>();

    return (
    <TouchableOpacity onPress={() => navigation.navigate("Edit", { booking })}>
      <Text>{booking.name} {booking.phone}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "pink",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
