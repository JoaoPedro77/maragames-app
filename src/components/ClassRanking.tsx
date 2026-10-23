import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from './Icon';

const students = [
  { name: 'Lucas Silva', initials: 'LS', level: 28, xp: '14.850', avatar: 'bg-violet-700', text: 'text-white' },
  { name: 'Beatriz Lima', initials: 'BL', level: 25, xp: '13.200', avatar: 'bg-violet-300', text: 'text-violet-950' },
  { name: 'Gabriel Santos', initials: 'GS', level: 22, xp: '11.900', avatar: 'bg-blue-400', text: 'text-blue-950' },
];

export function ClassRanking() {
  return (
    <View className="gap-4 rounded-xl border border-slate-300 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800">
      <View className="flex-row flex-wrap items-center justify-between gap-2">
        <Text className="text-base font-extrabold text-slate-900 dark:text-slate-100">
          Top Alunos da Turma
        </Text>
        <Text className="text-xs font-bold text-violet-700 dark:text-violet-300">
          3º Ano B
        </Text>
      </View>

      <View className="gap-2">
        {students.map((student, index) => (
          <View
            key={student.name}
            className="flex-row flex-wrap items-center gap-3 rounded-lg border border-slate-300 p-2 dark:border-slate-700"
          >
            <View className={`h-7 w-7 items-center justify-center rounded-full ${index === 0 ? 'bg-red-100 dark:bg-red-500/20' : 'bg-slate-200 dark:bg-slate-700'}`}>
              <Text className={`text-xs font-extrabold ${index === 0 ? 'text-red-600 dark:text-[#ff535b]' : 'text-slate-700 dark:text-slate-300'}`}>
                {index + 1}º
              </Text>
            </View>
            <View className={`h-9 w-9 items-center justify-center rounded-full ${student.avatar}`}>
              <Text className={`text-base font-bold ${student.text}`}>{student.initials}</Text>
            </View>
            <View className="min-w-0 flex-1 gap-0.5">
              <Text className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {student.name}
              </Text>
              <Text className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Nível {student.level}
              </Text>
            </View>
            <View className="items-end gap-0.5">
              <Text className="text-base font-extrabold text-red-600 dark:text-[#ff535b]">
                {student.xp}
              </Text>
              <Text className="text-xs text-slate-600 dark:text-slate-400">XP acumulado</Text>
            </View>
          </View>
        ))}
      </View>

      <Link href="/rank" asChild>
        <Pressable
          accessibilityRole="link"
          className="min-h-11 flex-row items-center justify-between gap-2 rounded-lg px-1 active:bg-violet-100 dark:active:bg-slate-700"
        >
          <Text className="flex-1 text-xs font-bold text-violet-700 dark:text-violet-300">
            Ver ranking geral
          </Text>
          <Icon name="chevron-right" size={20} color="#6d28d9" darkColor="#cabeff" />
        </Pressable>
      </Link>
    </View>
  );
}
