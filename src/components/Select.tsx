import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';
import { Icon } from './Icon';
import { selectionHaptic } from '@/lib/haptics';

export type SelectOption = {
  label: string;
  value: string;
};

type SelectOptionInput = string | SelectOption;

type SelectProps = {
  label?: string;
  icon?: MaterialDesignIconsIconName;
  size?: number;
  color?: string;
  darkColor?: string;
  placeholder?: string;
  options: readonly SelectOptionInput[];
  value?: string | null;
  onChange: (value: string) => void;
};

export function Select({
  label,
  icon,
  size = 20,
  color,
  darkColor,
  placeholder,
  options,
  value,
  onChange,
}: SelectProps) {
  const [open, setOpen] = useState(false);

  const normalizedOptions = options.map((option) =>
    typeof option === 'string' ? { label: option, value: option } : option
  );
  const selectedOption = normalizedOptions.find((option) => option.value === value);

  return (
    <View>
      <View className="flex-row items-center gap-2 mb-1 mx-1">
        {icon && <Icon name={icon} size={size} color={color || 'white'} darkColor={darkColor} />}
        <Text className="text-lg font-semibold text-slate-700 dark:text-slate-400">
          {label}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ expanded: open }}
        onPress={() => {
          selectionHaptic();
          setOpen((prev) => !prev);
        }}
        className="h-14 flex-row items-center justify-between rounded-xl border border-slate-300 bg-slate-50 px-4 dark:border-slate-700 dark:bg-slate-700/50"
      >
        <Text
          className={
            value
              ? 'text-lg text-slate-900 dark:text-white'
              : 'text-lg text-slate-500 dark:text-slate-500'
          }
        >
          {selectedOption?.label || placeholder}
        </Text>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={size} color="#64748b" />
      </Pressable>

      {open && (
        <View className="mt-2 overflow-hidden rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-700/50">
          {normalizedOptions.map((option, index) => {
            const selected = option.value === value;

            return (
              <Pressable
                key={option.value}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => {
                  selectionHaptic();
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`px-4 py-3 ${
                  index > 0 ? 'border-t border-slate-200 dark:border-slate-700' : ''
                }`}
              >
                <Text
                  className={
                    selected
                      ? 'text-lg font-semibold text-red-600'
                      : 'text-lg text-slate-900 dark:text-white'
                  }
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}
