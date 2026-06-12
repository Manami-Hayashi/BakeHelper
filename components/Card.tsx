import {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {theme} from '../lib/theme';

type Props ={
    children: ReactNode;
    style?: ViewStyle;
};

export default function Card({children, style}: Props) {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.md,
        ...theme.shadow,
        }
})
