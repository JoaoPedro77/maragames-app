import { Text, TextInput, TextInputProps, View } from 'react-native';
import type { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';
import { Icon } from './Icon';


type InputProps = TextInputProps & {
  label?: string;
  icon?: MaterialDesignIconsIconName;
  size?: number;
  color?: string;
  darkColor?: string;
};

export function Input({ label, icon, size, color, darkColor, ...props }: InputProps) {
  return (
    <View>
      <View className="flex-row items-center gap-2 mb-1 mx-1">
        {icon && <Icon name={icon} size={size} color={color || "white"} darkColor={darkColor} />}
        <Text className="text-lg font-semibold text-slate-700 dark:text-slate-400">
          {label}
        </Text>
      </View>

      <TextInput
        accessibilityLabel={label}
        className="h-14 rounded-xl border border-slate-300 bg-slate-50 px-4 text-lg text-slate-900 dark:border-slate-700 dark:bg-slate-700/50 dark:text-white"
        placeholderTextColor="#64748b"
        {...props}
      />
    </View>
  );
}
