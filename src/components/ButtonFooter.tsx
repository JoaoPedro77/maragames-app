import { Pressable, PressableProps, Text, View } from 'react-native';
import { useRouter } from 'expo-router'
import { Icon } from '@/components/Icon';
import type { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';

type ButtonProps = PressableProps & {
  title?: string;
  icon?: MaterialDesignIconsIconName;
  size?: number;
  color?: string;
  route?: string
};

export function ButtonFooter({ title, icon, size, color, route, ...props }: ButtonProps) {
  const router = useRouter()
  
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(route)}
      className={
        "h-16 w-28 items-center p-3 justify-center rounded-lg"
        /*
        ? "h-16 w-28 items-center p-3 justify-center rounded-2xl bg-red-600 active:bg-red-900"
        : "h-16 w-28 items-center p-3 justify-center rounded-lg"*/
    }
      {...props}
    >
      <View className="flex-grow items-center justify-center gap-1.5">
        {icon && <Icon name={icon} size={size} color={color || "white"} />}
        {title && <Text className="text-md font-bold text-white">{title}</Text>}
      </View>
    </Pressable>
  );
}