import { useState } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { fahrenheitToCelsius, celsiusToFahrenheit } from '../lib/temperature';
import DismissKeyboardScroll from '../components/DismissKeyboardScroll';

export default function TemparetureScreen() {
    const [fahrenheit, setFahrenheit] = useState("");
    const [celsius, setCelsius] = useState("");

    const handleFahrenheisChange = (text: string) => {
        setFahrenheit(text);

        if (text === "") {
            setCelsius("")
            return;
        }

        const f = parseFloat(text);
        if (isNaN(f)) {
            setCelsius("");
            return;
        }

        const c = fahrenheitToCelsius(f);
        setCelsius(c.toFixed(1));
    };

    const handleCelsiusChange = (text: string) => {
        setCelsius(text);

        if (text === ""){
            setFahrenheit("");
            return;
        }

        const c = parseFloat(text);
        if (isNaN(c)) {
            setFahrenheit("");
            return;
        }

        const f = celsiusToFahrenheit(c);
        setFahrenheit(f.toFixed(1));
    };

    return (
        <DismissKeyboardScroll>
            <View style={styles.container}>
                <Text style={styles.title}>Temperature</Text>
                
                <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        value={fahrenheit}
                        onChangeText={handleFahrenheisChange}
                        placeholder="0"
                        keyboardType="numeric"
                        />
                
                    <Text style={styles.unit}>°F</Text>
                
                </View>
                
                <Ionicons name="swap-vertical" size={24} color="black" style={styles.equals} />

                <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        value={celsius}
                        onChangeText={handleCelsiusChange}
                        placeholder="0"
                        keyboardType='numeric'
                    />
                <Text style={styles.unit}>°C</Text>
                </View>
            </View>
        </DismissKeyboardScroll>    
    );
}


const styles = StyleSheet.create({
  flex:{ flex: 1},
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  input: {
    width: 160,
    height: 80,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    fontSize: 36,
    textAlign: 'center',
    marginRight: 12,
    backgroundColor: '#fff',
  },
  unit: {
    fontSize: 32,
    fontWeight: '600',
    color: '#444',
    width: 50,
  },
  equals: {
    marginVertical: 20,
  },
});