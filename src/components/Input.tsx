import { Text, TextInput, TextInputProps, View } from 'react-native';
import type { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';
import { Icon } from './Icon';


type InputProps = TextInputProps & {
  label?: string;
  icon?: MaterialDesignIconsIconName;
  size?: number;
  color?: string;
};

export function Input({ label, icon, size, color, ...props }: InputProps) {
  return (
    <View>
      <View className="flex-row justify-between items-center gap-2 mb-1 mx-2">
        <Text className="text-lg font-semibold text-slate-700 dark:text-slate-400">
          {label}
        </Text>
        {icon && <Icon name={icon} size={size} color={color || "white"} />}
      </View>

      <TextInput
        accessibilityLabel={label}
        className="h-14 rounded-xl border border-slate-300 bg-slate-50 px-4 text-lg text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        placeholderTextColor="#64748b"
        {...props}
      />
    </View>
  );
}
