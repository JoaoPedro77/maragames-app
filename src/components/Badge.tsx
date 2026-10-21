import { Text, View } from 'react-native';

type BadgeProps = {
  label: string;
  value: string | number;
  className?: string;
};

export function Badge({ label, value, className = '' }: BadgeProps) {
  return (
    <View
      className={`flex-row gap-2 rounded-lg bg-slate-200 p-1 px-2 dark:bg-slate-900 ${className}`}
    >
      <Text className="text-md font-semibold text-slate-600 dark:text-slate-400">
        {label}:
      </Text>
      <Text className="text-md font-extrabold dark:text-slate-100">{value}</Text>
    </View>
  );
}
