import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UNITS, convert, compatibleUnits, formatNumber } from '../lib/units';
import { theme } from '../lib/theme';
import DismissKeyboardScroll from '../components/DismissKeyboardScroll';
import ConverterRow from '../components/ConverterRow';
import Card from '../components/Card';

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
    return formatNumber(result);
  };
  
  const toValue = computeResult();

  const handleSwap =() => {
    const newFromValue = toValue;
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
    setFromValue(newFromValue);
  };

  return (
    <DismissKeyboardScroll>
        <View style={styles.container}>

          <View style={styles.header}>
            <View style={styles.iconBadge}  >
              <MaterialCommunityIcons name="swap-horizontal" size={24} color={theme.colors.primaryDark} />
            </View>
          <Text style={styles.title}>Convert</Text>
          </View>
          <Text style={styles.subtitle}>Volume & Weight</Text>
          {/* FROM row */}
          <Card style={styles.card}>
            <Text style={styles.cardLabel}>From</Text>
            <ConverterRow
              value={fromValue}
              onValueChange={setFromValue}
              unitId={fromUnitId}
              onUnitChange={setFromUnitId}
              units={UNITS}
              editable={true}
            />
          </Card>
          <Pressable
            onPress={handleSwap}
            style={({ pressed }) => [
              styles.swapButton,
              pressed && styles.swapButtonPressed,
            ]}>
            <MaterialCommunityIcons name="swap-vertical" size={30} color={theme.colors.primary} />
          </Pressable>
          <Card style={styles.card}>
            <Text style={styles.cardLabel}>To</Text>
            <ConverterRow
              value={toValue}
              unitId={toUnitId}
              onUnitChange={setToUnitId}
              units={compatibleUnits(fromUnit)}
              editable={false}
            />
          </Card> 
        </View>
    </DismissKeyboardScroll>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSize.title,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.fontSize.label,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xl,
  },
  card: {
    marginBottom: theme.spacing.sm,
  },
  cardLabel: {
    fontSize: theme.fontSize.label,
    color: theme.colors.textFaint,
    marginBottom: theme.spacing.sm,
  },
  swapButton: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: theme.spacing.xs,
    ...theme.shadow,
  },
  swapButtonPressed: {
    backgroundColor: theme.colors.primarySoft,
  },
});