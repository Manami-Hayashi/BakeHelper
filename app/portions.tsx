import { useState } from 'react';
import { StyleSheet, Text, TextInput, View} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UNITS, formatNumber} from '../lib/units';
import DismissKeyboardScroll from '../components/DismissKeyboardScroll';
import ConverterRow from '../components/ConverterRow';

export default function PortionsScreen(){
  // top harf : servings
  const [fromServings, setFromServings] = useState("")
  const [toServings, setToServings] = useState("")

  // Bottom half: ingredient amount + unit
  const [amount, setAmount] = useState("")
  const [unitId, setUnitId] = useState("g")
  
  // Compute the multiplier (derived, not stored)
  const computeMultiplier = (): number | null => {
    const from = parseFloat(fromServings)
    const to = parseFloat(toServings)
    if (isNaN(from) || isNaN(to) || from === 0) return null;
    return to / from;
  }
  
  const multiplier = computeMultiplier();

  const computeScaled = (): string => {
    if (amount === "" || multiplier === null) return "";
    const n = parseFloat(amount);
    if (isNaN(n)) return "";
    return formatNumber(n * multiplier);
  };

  const scaledAmount = computeScaled();

  return (
    <DismissKeyboardScroll>
      <View style={styles.container}>
        <Text style={styles.title}>Portions</Text>

        {/*Top half: servings inputs*/ }
        <View style={styles.servingsRow}>
          <View style={styles.servingsCell}>
            <Text style={styles.label}>From</Text>
            <TextInput 
              style={styles.servingsInput}
              value={fromServings}
              onChangeText={setFromServings}
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.arrow}>→</Text>

          <View style={styles.servingsCell}>
            <Text style={styles.label}>To</Text>
            <TextInput 
              style={styles.servingsInput}
              value={toServings}
              onChangeText={setToServings}
              keyboardType='numeric'
            />
          </View>
        </View>

        <Text style={styles.multiplier}>
          {multiplier !== null ? `x ${formatNumber(multiplier)}` : '-'}
        </Text>

        <View style={styles.divider} />

                {/* Bottom half: ingredient scaler */}
        <Text style={styles.subheading}>Scale an amount</Text>
        
        <ConverterRow
          value={amount}
          onValueChange={setAmount}
          unitId={unitId}
          onUnitChange={setUnitId}
          units={UNITS}
          editable={true}
        />
        
        <MaterialCommunityIcons 
          name="arrow-down" 
          size={28} 
          color="#bbb" 
          style={styles.downArrow} 
        />
        
        <ConverterRow
          value={scaledAmount}
          unitId={unitId}
          onUnitChange={setUnitId}
          units={UNITS}
          editable={false}
        />
      </View>
    </DismissKeyboardScroll>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  servingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  servingsCell: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  servingsInput: {
    width: 80,
    height: 60,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    fontSize: 28,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  arrow: {
    fontSize: 32,
    color: '#aaa',
    marginHorizontal: 16,
    marginTop: 18, // align with the inputs below the labels
  },
  multiplier: {
    fontSize: 28,
    fontWeight: '600',
    color: '#e67e22',
    marginTop: 16,
    marginBottom: 24,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  subheading: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
    marginTop: 8,
  },
  downArrow: {
    marginVertical: 12,
  },
});