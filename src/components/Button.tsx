import { Pressable, PressableProps, Text } from 'react-native';

type ButtonProps = PressableProps & {
  title: string;
};

export function Button({ title, ...props }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      className="mt-3 h-14 items-center justify-center rounded-2xl bg-red-600 active:bg-red-900"
      {...props}
    >
      <Text className="text-base font-bold text-white">{title}</Text>
    </Pressable>
  );
}
