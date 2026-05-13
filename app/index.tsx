import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UNITS, convert, compatibleUnits } from '../lib/units';
import DismissKeyboardScroll from '../components/DismissKeyboardScroll';
import ConverterRow from '../components/ConverterRow';


export default function ConvertScreen() {
  const [fromValue, setFromValue] = useState("");
  const [fromUnitId, setFromUnitId] = useState("cup");
  const [toUnitId, setToUnitId] = useState("ml");
  
  // Look up the full Unit objects from their ids
  const fromUnit = UNITS.find((u) => u.id === fromUnitId)!;
  const toUnit = UNITS.find((u) => u.id === toUnitId)!;
  
  useEffect(() => {
    if (toUnit.category !== fromUnit.category) {
      const firstCompatible = compatibleUnits(fromUnit)[0];
      setToUnitId(firstCompatible.id);
    }
  }, [fromUnitId]);
  
  // Compute the result (derived from state, not stored in state)
  const computeResult = (): string => {
    if (fromValue === "") return "";
    const n = parseFloat(fromValue);
    if (isNaN(n)) return "";
    const result = convert(n, fromUnit, toUnit);
    if (result === null) return "—";
    return result.toFixed(2);
  };
  
  const toValue = computeResult();

  return (
    <DismissKeyboardScroll>
        <View style={styles.container}>
          <Text style={styles.title}>Convert</Text>
          
          {/* FROM row */}
        <ConverterRow
          value={fromValue}
          onValueChange={setFromValue}
          unitId={fromUnitId}
          onUnitChange={setFromUnitId}
          units={UNITS}
          editable={true}
        />
        
        <MaterialCommunityIcons 
          name="swap-vertical" 
          size={28} 
          color="#bbb" 
          style={styles.swap} 
        />
        
        <ConverterRow
          value={toValue}
          unitId={toUnitId}
          onUnitChange={setToUnitId}
          units={compatibleUnits(fromUnit)}
          editable={false}
        />
        </View>
    </DismissKeyboardScroll>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
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
  swap: {
    marginVertical: 16,
  },
});