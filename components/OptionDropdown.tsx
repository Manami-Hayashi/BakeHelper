import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type Option = {
  id: string;
  label: string;
}

type Props = {
    selectedId: string;
    options: Option[];
    onChange: (id: string) => void;
    title?: string; // optional sheet title
}

export default function OptionDropdown({ selectedId, options, onChange, title ="Select an option", } : Props) {
    const [isOpen, setIsOpen] = useState(false);
    const insets = useSafeAreaInsets();

    const selected = options.find((o) => o.id === selectedId);
    const selectedLabel = selected?.label ?? "";

    const handleSelect = (id: string) => {
        onChange(id);
        setIsOpen(false);
    };

    return (
        <>
            <Pressable
            onPress={() => setIsOpen(true)}
            style={styles.trigger}>
                <Text style={styles.triggerText} numberOfLines={6}>{selectedLabel}</Text>
                <View style={{ flex:1 }} />
                <MaterialCommunityIcons
                name="chevron-down"
                size={18}
                color="#888"
                style={styles.chevron}
                />
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
                            {options.map((option) => {
                                const isSelected = option.id === selectedId;
                                return(
                                    <Pressable
                                    key={option.id}
                                    onPress={() => handleSelect(option.id)}
                                    style={({ pressed }) => [
                                        styles.option,
                                        pressed && styles.optionPressed
                                    ]}
                                    >
                                        <Text style={[
                                            styles.optionText,
                                            isSelected && styles.optionTextSelected
                                        ]}>
                                        {option.label}    
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  triggerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  chevron: {
    marginLeft: 6,
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
    paddingHorizontal: 12,
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