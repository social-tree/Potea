import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const defaultTheme = async () => {
    
    const preferedTheme = Appearance.getColorScheme() 

    const savedTheme = await AsyncStorage.getItem("theme")

    return savedTheme || preferedTheme;
}