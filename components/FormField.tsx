import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { icons } from "../constants";

interface FormFieldProps {
    title: string;
    value: string;
    placeholder?: string;
    handleChangeText: (text: string) => void;
    otherStyles?: string;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "ascii-capable" | "numbers-and-punctuation" | "url" | "name-phone-pad" | "decimal-pad" | "twitter" | "web-search";
}



const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
        <View style={[styles.container]}>
      <Text style={styles.label}>{title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#4B5563',
    fontFamily: 'Poppins-Medium',
    marginBottom: 8,
  },
  inputContainer: {
    width: '100%',
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(147, 197, 253, 0.3)', // primary/30 equivalent
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
});