import { ReactNode } from "react";
import { Keyboard, KeyboardAvoidingView,Platform, ScrollView, StyleSheet, View } from 'react-native';

type Props = { children: ReactNode };

export default function DismissKeyboardScroll({ children} : Props) {

    // On web, no keyboard handling needed
    if (Platform.OS === 'web'){
        return <View>{children}</View>
    }

    // On mobile, KeyboardAvoiingView + SchollView wrapper to dismiss keyboard when tapping outside
    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={ Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag">
                {children}
            </ScrollView>
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    }

})