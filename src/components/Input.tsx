import { Text, TextInput, TextInputProps, View } from 'react-native';

type InputProps = TextInputProps & {
  label: string;
};

export function Input({ label, ...props }: InputProps) {
  return (
    <View>
      <Text className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-400">
        {label}
      </Text>

      <TextInput
        accessibilityLabel={label}
        className="h-14 rounded-xl border border-slate-300 bg-slate-50 px-4 text-base text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        placeholderTextColor="#64748b"
        {...props}
      />
    </View>
  );
}
