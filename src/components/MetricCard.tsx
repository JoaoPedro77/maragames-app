import { Text, View } from 'react-native';
import type { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';
import { Icon } from './Icon';

type MetricCardProps = {
  title: string;
  value: string;
  icon: MaterialDesignIconsIconName;
  suffix?: string;
  highlighted?: boolean;
  progress?: number;
};

export function MetricCard({
  title,
  value,
  icon,
  suffix,
  highlighted = false,
  progress,
}: MetricCardProps) {
  return (
    <View className="min-w-0 flex-1 gap-3 rounded-xl border border-slate-300 bg-slate-100 p-3 dark:border-slate-700 dark:bg-slate-800">
      <View className="flex-row items-start justify-between gap-2">
        <Text className="flex-1 text-xs font-bold text-slate-600 dark:text-slate-400">
          {title}
        </Text>
        <Icon
          name={icon}
          size={18}
          color={highlighted ? '#dc2626' : '#6d28d9'}
          darkColor={highlighted ? '#ff535b' : '#cabeff'}
        />
      </View>

      <Text
        className={`text-2xl font-extrabold ${highlighted ? 'text-red-600 dark:text-[#ff535b]' : 'text-slate-900 dark:text-slate-100'}`}
      >
        {value}
        {suffix && (
          <Text className="text-xs font-bold text-red-600 dark:text-[#ff535b]">
            {' '}{suffix}
          </Text>
        )}
      </Text>

      {progress !== undefined && (
        <View
          accessibilityRole="progressbar"
          accessibilityLabel={title}
          accessibilityValue={{ min: 0, max: 100, now: progress }}
          className="h-1.5 overflow-hidden rounded-full bg-slate-300 dark:bg-slate-700"
        >
          <View
            className="h-full rounded-full bg-violet-600 dark:bg-violet-300"
            style={{ width: `${progress}%` }}
          />
        </View>
      )}
    </View>
  );
}
