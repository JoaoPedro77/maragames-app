import { Pressable, ScrollView, Text, View } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { Icon } from '@/components/Icon';
import { MetricCard } from '@/components/MetricCard';
import { WeeklyEngagement } from '@/components/WeeklyEngagement';
import { OngoingTracks } from '@/components/OngoingTracks';
import { ClassRanking } from '@/components/ClassRanking';

export default function InstitutionScreen() {
  const params = useLocalSearchParams<{
    nome?: string;
    tipo?: string;
    gestoresCount?: string;
  }>();
  const nome = params.nome || 'Escola Alpha - Polo Central';
  const tipo = params.tipo || 'Escola';

  return (
    <ScrollView
      className="flex-1 bg-white dark:bg-slate-900"
      contentContainerStyle={{ padding: 20, paddingBottom: 32, gap: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <Text className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
        Visão do Gestor
      </Text>

      <View className="gap-3 rounded-xl border border-slate-300 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800">
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#4918c8]">
            <Icon name="bank-outline" size={24} color="#cabeff" />
          </View>

          <View className="flex-1 gap-1">
            <Text className="text-xs font-bold uppercase text-violet-700 dark:text-violet-300">
              {params.tipo || 'Instituição de ensino'}
            </Text>
            <Text className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
              {nome}
            </Text>
          </View>

          <View className="flex-row items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 dark:bg-emerald-950">
            <View className="h-1.5 w-1.5 rounded-full bg-emerald-700 dark:bg-emerald-400" />
            <Text className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Ativa</Text>
          </View>
        </View>
        <View className="flex-row gap-2 border-t border-slate-300 pt-3 dark:border-slate-700">
          <Link href="/rank" asChild>
            <Pressable
              accessibilityRole="link"
              className="min-h-14 min-w-0 flex-1 flex-row items-center gap-2 rounded-lg border border-slate-300 p-2 active:bg-violet-100 dark:border-slate-700 dark:active:bg-slate-700"
            >
              <View className="h-8 w-8 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-300/10">
                <Icon name="school-outline" size={20} color="#6d28d9" darkColor="#cabeff" />
              </View>
              <Text className="flex-1 text-xs font-bold text-slate-700 dark:text-slate-300">
                Ver Alunos
              </Text>
            </Pressable>
          </Link>
          <Link
            href={{
              pathname: '/managers',
              params: { nome, tipo, gestoresCount: params.gestoresCount },
            }}
            asChild
          >
            <Pressable
              accessibilityRole="link"
              className="min-h-14 min-w-0 flex-1 flex-row items-center gap-2 rounded-lg border border-slate-300 p-2 active:bg-violet-100 dark:border-slate-700 dark:active:bg-slate-700"
            >
              <View className="h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-400/10">
                <Icon name="badge-account-horizontal-outline" size={20} color="#1d4ed8" darkColor="#adc6ff" />
              </View>
              <Text className="flex-1 text-xs font-bold text-slate-700 dark:text-slate-300">
                Ver Gestores
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
      <View className="gap-3">
        <View className="flex-row flex-wrap items-center justify-between gap-2">
          <Text className="text-base font-bold text-slate-700 dark:text-slate-300">
            Métricas Gerais da Turma
          </Text>
          <Text className="text-xs font-bold text-violet-700 dark:text-violet-300">
            Tempo Real
          </Text>
        </View>

        <View className="flex-row items-stretch gap-3">
          <MetricCard title="Alunos Ativos" value="142" suffix="/ 150" icon="account-group-outline" />
          <MetricCard title="Trilhas Concluídas" value="4" icon="check-circle-outline" highlighted />
        </View>
        <View className="flex-row items-stretch gap-3">
          <MetricCard title="Nível Médio" value="Nvl 7.4" icon="medal-outline" progress={74} />
          <MetricCard title="Taxa de Acerto" value="78.5%" icon="chart-pie" />
        </View>
      </View>
      <WeeklyEngagement />
      <OngoingTracks />
      <ClassRanking />
    </ScrollView>
  );
}
