import React, { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import FormField from "../FormField";

type AuthStep = "signIn" | "signUp";

export const Password = () => {
  const { signIn } = useAuthActions();

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
    <Card>
      <CardHeader>
        <CardDescription style={{ textAlign: "center" }}>
          {isSigningIn
            ? "Welcome back! Login to continue."
            : "Create an account to get started."}
        </CardDescription>
      </CardHeader>
      <CardContent style={{ gap: 16 }}>
        {!isSigningIn && (
          <Input
            value={name}
            variant="outline"
            placeholder="Username"
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
            editable={!loading}
          />
        )}

        <Input
          value={email}
          variant="outline"
          placeholder="me@example.com"
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          editable={!loading}
        />

        <FormField
          title="Password"
          value={password}
          handleChangeText={setPassword}
          otherStyles="my-4"
        />

        {!!error && <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>}

        <Button onPress={handleAuth} disabled={loading} loading={loading}>
          {isSigningIn ? "Login" : "Create new account"}
        </Button>

        <Button
          variant="link"
          onPress={() => changeStep(isSigningIn ? "signUp" : "signIn")}
          disabled={loading}
        >
          {isSigningIn
            ? "Create new account"
            : "Already have an account? Login"}
        </Button>
      </CardContent>
    </Card>
  );
};
