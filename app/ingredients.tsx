import { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UNITS, formatNumber } from '../lib/units';
import { INGREDIENTS, convertIngredient } from '../lib/ingredients';
import DismissKeyboardScroll from '../components/DismissKeyboardScroll';
import ConverterRow from '../components/ConverterRow';
import OptionDropdown from '../components/OptionDropdown';

export default function IngredientsScreen() {
    const [ingredientId, setIngredientId] = useState("flour_ap");
    const [fromValue, setFromValue] = useState("");
    const [fromUnitId, setFromUnitId] = useState("cup");
    const [toUnitId, setToUnitId] = useState("g");

    // Look up the full objects from their ids
    const ingredient = INGREDIENTS.find((i) => i.id === ingredientId)!;
    const fromUnit = UNITS.find((u) => u.id === fromUnitId)!;
    const toUnit = UNITS.find((u) => u.id === toUnitId)!;

    // Compute the result (derived, not stored)
    const computeResult = () : string => {
      if (fromValue === "") return "";
      const n = parseFloat(fromValue);
      if (isNaN(n)) return "";
      const result = convertIngredient(n, fromUnit, toUnit, ingredient);
      return formatNumber(result);
    };

    const toValue = computeResult();

    return (
    <DismissKeyboardScroll>
      <View style={styles.container}>  
          <Text style={styles.title}>Ingredients</Text>

          <View style={styles.ingredientRow}>
            <Text style={styles.label}>Ingredient</Text>
            <OptionDropdown
              selectedId={ingredientId}
              options={INGREDIENTS}
              onChange={setIngredientId}
              title="Select ingredient"
            />
          </View>
        
        <ConverterRow
          value={fromValue}
          onValueChange={setFromValue}
          unitId={fromUnitId}
          onUnitChange={setFromUnitId}
          units={UNITS}
          editable={true}
        />

        <MaterialCommunityIcons 
          name="arrow-down" 
          size={28} 
          color="#bbb" 
          style={styles.arrow} 
        />
        
        <ConverterRow
          value={toValue}
          unitId={toUnitId}
          onUnitChange={setToUnitId}
          units={UNITS}
          editable={false}
        />

       {/* Quick reference at the bottom */}
        <View style={styles.divider} />
        
        <Text style={styles.referenceTitle}>Quick reference</Text>
        <Text style={styles.referenceLine}>1 tsp baking powder  =  4.6 g</Text>
        <Text style={styles.referenceLine}>1 tsp instant yeast  =  3.1 g</Text>

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
  ingredientRow: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  arrow: {
    marginVertical: 16,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 32,
  },
  referenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  referenceLine: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
    fontVariant: ['tabular-nums'],  // makes numbers align nicely
  },
});