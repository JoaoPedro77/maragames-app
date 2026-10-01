import { Pressable, PressableProps, Text } from 'react-native';

type ButtonProps = PressableProps & {
  title: string;
  icon: string;
};

export function Button({ title, icon, ...props }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      className="mt-3 h-14 items-center justify-center rounded-xl bg-red-600 active:bg-red-900"
      {...props}
    >
      <Text className="text-lg font-bold text-white">{icon} {title}</Text>
    </Pressable>
  );
}
