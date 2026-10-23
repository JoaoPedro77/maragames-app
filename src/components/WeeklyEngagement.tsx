import { Text, View } from 'react-native';
import { Icon } from './Icon';

const engagement = [
  { day: 'Seg', value: 65 },
  { day: 'Ter', value: 80 },
  { day: 'Qua', value: 72 },
  { day: 'Qui', value: 96 },
  { day: 'Sex', value: 88 },
  { day: 'Sáb', value: 45 },
  { day: 'Dom', value: 38 },
];

const peak = Math.max(...engagement.map(({ value }) => value));

export function WeeklyEngagement() {
  return (
    <View className="gap-4 rounded-xl border border-slate-300 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800">
      <View className="flex-row flex-wrap items-center justify-between gap-2">
        <View className="flex-row items-center gap-2">
          <Icon name="chart-timeline-variant" size={22} color="#6d28d9" darkColor="#cabeff" />
          <Text className="text-base font-extrabold text-slate-900 dark:text-slate-100">
            Engajamento Semanal
          </Text>
        </View>
        <Text className="text-xs font-bold text-slate-600 dark:text-slate-400">
          Últimos 7 dias
        </Text>
      </View>

      <View className="flex-row items-end gap-2">
        {engagement.map(({ day, value }, index) => (
          <View
            key={day}
            accessible
            accessibilityLabel={`${day}: ${value}% de engajamento`}
            className="min-w-0 flex-1 items-center gap-1"
          >
            <View className="h-28 w-full justify-end gap-1">
              <Text
                className={`text-center text-xs font-bold ${value === peak ? 'text-red-600 dark:text-[#ff535b]' : 'text-slate-600 dark:text-slate-400'}`}
              >
                {value}%
              </Text>
              <View
                className={`w-full rounded-t-md ${value === peak ? 'bg-red-500 dark:bg-[#ff535b]' : index >= 5 ? 'bg-violet-300 dark:bg-violet-300/30' : 'bg-violet-400 dark:bg-violet-300/70'}`}
                style={{ height: value * 0.8 }}
              />
            </View>
            <Text className="text-xs font-bold text-slate-600 dark:text-slate-400">
              {day}
            </Text>
          </View>
        ))}
      </View>

      <View className="flex-row flex-wrap justify-between gap-2 border-t border-slate-300 pt-3 dark:border-slate-700">
        <Text className="text-xs text-slate-600 dark:text-slate-400">
          Retenção Curricular
        </Text>
        <Text className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          86.2% dos tópicos fixados
        </Text>
      </View>
    </View>
  );
}
