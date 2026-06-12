import { StyleSheet, TextInput, View } from "react-native";
import OptionDropdown from "./OptionDropdown";
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
            <OptionDropdown
            selectedId={unitId}
            options={units}
            onChange={onUnitChange}
            title="Select unit"
            />
        </View>
    );
}


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 60,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    fontSize: 28,
    textAlign: 'center',
    marginRight: 12,
    backgroundColor: '#fff',
  },
  inputReadOnly: {
    backgroundColor: '#f0f0f0',
    color: '#333',
  }
});