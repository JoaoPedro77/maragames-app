import { Pressable, PressableProps, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';

type ButtonProps = PressableProps & {
  title?: string;
  icon?: MaterialDesignIconsIconName;
  size?: number;
  color?: string;
};

export function Button({ title, icon, size, color, ...props }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      className="mt-3 h-14 items-center justify-center rounded-xl bg-red-600 active:bg-red-900"
      {...props}
    >
      <View className="flex-row items-center justify-center gap-2">
        {title && <Text className="text-lg font-bold text-white">{title}</Text>}
        {icon && <Icon name={icon} size={size} color={color || "white"} />}
      </View>
    </Pressable>
  );
}
