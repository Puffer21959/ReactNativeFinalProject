import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const TestConnect = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://reactnativebackend.local/api.php', {
        crud_req: 'login',
        email: email, 
        password: password,
      });

      setResponseMessage(response.data.message); // Assuming your PHP script returns a JSON object with a 'message' field
    } catch (error) {
      console.error(error);
      setResponseMessage('Error connecting to server');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      {responseMessage && <Text>{responseMessage}</Text>}
    </View>
  );
};

export default TestConnect;
