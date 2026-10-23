import { ScrollView, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';

export default function InstitutionScreen() {
  return (
    <ScrollView
      className="flex-1 bg-white dark:bg-slate-900"
      contentContainerStyle={{ padding: 20, paddingBottom: 32, gap: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <Text className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
        Visão do Gestor
      </Text>

      <View className="rounded-xl border border-slate-300 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800">
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#4918c8]">
            <Icon name="bank-outline" size={24} color="#cabeff" />
          </View>

          <View className="flex-1 gap-1">
            <Text className="text-xs font-bold uppercase text-violet-700 dark:text-violet-300">
              Instituição de ensino
            </Text>
            <Text className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
              Escola Alpha - Polo Central
            </Text>
          </View>

          <View className="flex-row items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 dark:bg-emerald-950">
            <View className="h-1.5 w-1.5 rounded-full bg-emerald-700 dark:bg-emerald-400" />
            <Text className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Ativa</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
