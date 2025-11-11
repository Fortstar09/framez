import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { useAuthActions } from "@convex-dev/auth/react";
import { Text } from "@/components/ui/text";
import FormField from "../FormField";
import { Button } from "@/components/ui/button";
import { lightColors } from "@/theme/colors";
import { useColor } from "@/hooks/useColor";

type AuthStep = "signIn" | "signUp";

export const Password = () => {
  const { signIn } = useAuthActions();
  const textColor = useColor("text");

  const [step, setStep] = useState<AuthStep>("signIn");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetFormState = () => {
    setEmail("");
    setPassword("");
    setError("");
    setLoading(false);
  };

  const changeStep = (newStep: AuthStep) => {
    resetFormState();
    setStep(newStep);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const validatePassword = (value: string) => {
    if (value.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const handleAuth = async () => {
    if (!validateEmail(email) || !validatePassword(password)) return;

    setLoading(true);
    setError("");

    try {
      await signIn("password", { name, email, password, flow: step });
    } catch (err: any) {
      console.error(`${step} error:`, err);
      setError("Authentication failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const isSigningIn = step === "signIn";

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.innerContainer}>
        <Text variant="heading" style={[styles.title, {color:textColor}]}>{isSigningIn ? "Welcome back" : "Create an account"}</Text>

        <View style={styles.form}>
          {!isSigningIn && (
            <FormField
              title="Username"
              value={name}
              handleChangeText={setName}
            />
          )}
          <FormField
            title="Email"
            value={email}
            handleChangeText={setEmail}
          />
          <FormField
            title="Password"
            value={password}
            handleChangeText={setPassword}
          />

          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <Button
            style={[styles.button, {backgroundColor:lightColors.brand}]}
            onPress={handleAuth}
            disabled={loading}
            loading={loading}
          >
            {isSigningIn ? "Sign In" : "Sign Up"}
          </Button>

          <Button
          variant="link"
          onPress={() => changeStep(isSigningIn ? "signUp" : "signIn")}
          disabled={loading}
        >
          {isSigningIn
            ? "Create account, if you don't have one"
            : "Already have an account? Login"}
        </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  innerContainer: {
    width: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "800",
    maxWidth:200,
    lineHeight:45,
    textAlign: "left",
    marginBottom: 36,
  },
  form: {
    width: "100%",
    gap: 12,
  },
  button: {
    marginVertical: 12,
    backgroundColor: "#22c55e",
    borderRadius: 8,
    paddingVertical: 14,
  },
  switchText: {
    textAlign: "center",
    marginTop: 16,
    textDecorationLine: "underline",
    opacity: 0.8,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 4,
  },
});
