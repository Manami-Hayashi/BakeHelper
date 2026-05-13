import { StyleSheet, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import type {Unit} from "../lib/units";

type Props = {
    value: string;
    onValueChange?: (text: string) => void;
    unitId: string;
    onUnitChange: (id: string) => void;
    units: Unit[];
    editable: boolean;
};

export default function ConverterRow({
    value, onValueChange, unitId, onUnitChange, units, editable,
}: Props) {
    return (
        <View style={styles.row}>
            <TextInput
            style={[styles.input, !editable&& styles.inputReadOnly]}
            value={value}
            onChangeText={onValueChange}
            editable={editable}
            placeholder="0"
            keyboardType="numeric"
            />
            <Picker
            selectedValue={unitId}
            onValueChange={onUnitChange}
            style={styles.picker}
            >
            {units.map((unit) => (
                <Picker.Item key={unit.id} label={unit.label} value={unit.id} />
            ))}
            </Picker>
        </View>
    );
}


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 140,
    height: 80,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    fontSize: 32,
    textAlign: 'center',
    marginRight: 12,
    backgroundColor: '#fff',
  },
  inputReadOnly: {
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
  picker: {
    width: 130,
    height: 50,
  },
});