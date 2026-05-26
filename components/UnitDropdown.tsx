import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Unit } from '../lib/units';

type Props = {
    selectedUnitId: string;
    units: Unit[];
    onUnitChange: (id: string) => void;
}

export default function UnitDropdown({ selectedUnitId, units, onUnitChange} : Props) {
    const [isOpen, setIsOpen] = useState(false);
    const insets = useSafeAreaInsets();

    const selectedUnit = units.find((u) => u.id === selectedUnitId);
    const selectedLabel = selectedUnit?.label ?? "";

    const handleSelect = (id: string) => {
        onUnitChange(id);
        setIsOpen(false);
    };

    return (
        <>
            <Pressable
            onPress={() => setIsOpen(true)}
            style={styles.trigger}>
                <Text style={styles.triggerText}>{selectedLabel}</Text>
                <MaterialCommunityIcons
                name="chevron-down"
                size={20}
                color="#888"/>
            </Pressable>

            <Modal
            visible={isOpen}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsOpen(false)}>
                <Pressable
                style={styles.backdrop}
                onPress={() => setIsOpen(false)}>
                    <Pressable
                    style={[styles.sheet, { paddingBottom: insets.bottom + 16}]}
                    onPress={(e) => e.stopPropagation}
                    >
                        <View style={styles.handle} />
                        <Text style={styles.title}>Select unit</Text>

                        <ScrollView style={styles.list}>
                            {units.map((unit) => {
                                const isSelected = unit.id === selectedUnitId;
                                return(
                                    <Pressable
                                    key={unit.id}
                                    onPress={() => handleSelect(unit.id)}
                                    style={({ pressed }) => [
                                        styles.option,
                                        pressed && styles.optionPressed
                                    ]}
                                    >
                                        <Text style={[
                                            styles.optionText,
                                            isSelected && styles.optionTextSelected
                                        ]}>
                                        {unit.label}    
                                        </Text>
                                        {isSelected && (
                                            <MaterialCommunityIcons
                                            name="check"
                                            size={20}
                                            color="#e67e22"
                                            />
                                        )}
                                    </Pressable>
                                );
                            })}
                        </ScrollView>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
}


const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    minWidth: 100,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  triggerText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    marginRight: 8,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
    paddingHorizontal: 16,
    maxHeight: '70%',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 12,
    color: '#333',
  },
  list: {
    marginTop: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionPressed: {
    backgroundColor: '#f9f9f9',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  optionTextSelected: {
    color: '#e67e22',
    fontWeight: '600',
  },
});