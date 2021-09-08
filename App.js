import React from 'react';
import { StyleSheet } from 'react-native';
import Naigator from './routes/drawer';

export default function App() {

  return (
    <Naigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
});
