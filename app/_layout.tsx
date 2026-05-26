import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets} from 'react-native-safe-area-context';

export default function TabLayout() {
    const insets = useSafeAreaInsets();
    
    return(
        <Tabs screenOptions={{ 
            headerShown: false,
            tabBarActiveTintColor: '#e67e22',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: {
                backgroundColor: '#fff',
                borderTopColor: '#eee',
                height: 60 + insets.bottom,
                paddingBottom: 8 + insets.bottom,
                paddingTop: 8,
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '500',
            },
        }}>
            <Tabs.Screen
            name="index"
            options={{ 
                title: 'Convert',
                tabBarIcon: ({ color, size}) => (
                    <MaterialCommunityIcons name="swap-horizontal" size={size} color={color} />
                )
            }}
            />
            <Tabs.Screen 
            name="ingredients" 
            options={{ 
                title: 'Ingredients',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="chef-hat" size={size} color={color} />
                )
            }} 
            />
            <Tabs.Screen 
            name="temperature" 
            options={{ 
            title: 'Temp',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="thermometer" size={size} color={color} />
            ),
            }} 
        />
        <Tabs.Screen 
            name="portions" 
            options={{ 
            title: 'Portions',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="scale-balance" size={size} color={color} />
            ),
            }} 
        />
        </Tabs>
    )
}