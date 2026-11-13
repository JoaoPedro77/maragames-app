import { Pressable, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { useEffect } from 'react';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { MetricCard } from '@/components/MetricCard';
import { WeeklyEngagement } from '@/components/WeeklyEngagement';
import { OngoingTracks } from '@/components/OngoingTracks';
import { ClassRanking } from '@/components/ClassRanking';
import { RoleGate } from '@/components/RoleGate';
import { useAuth } from '@/contexts/AuthContext';
import { useInstitutionDashboardController } from '@/controllers/institutionController';

export default function InstitutionScreen() {
  return (
    <RoleGate permitidos={['gestor', 'admin']}>
      <InstitutionContent />
    </RoleGate>
  );
}

function InstitutionContent() {
  const params = useLocalSearchParams<{
    id?: string;
    nome?: string;
    tipo?: string;
  }>();
  const { usuario } = useAuth();
  const ehGestor = usuario?.perfil === 'gestor';
  const idParam = params.id ? Number(params.id) : null;
  const instituicaoId = ehGestor
    ? usuario?.instituicaoId ?? null
    : idParam !== null && !Number.isNaN(idParam)
      ? idParam
      : null;

  const {
    instituicao,
    metricas,
    topAlunos,
    dificuldades,
    carregando,
    erro,
    carregarDashboard,
  } = useInstitutionDashboardController(instituicaoId);

  useEffect(() => {
    carregarDashboard();
  }, [carregarDashboard]);

  if (!instituicaoId) {
    return (
      <View className="flex-1 items-center justify-center gap-3 bg-white px-6 dark:bg-slate-900">
        <Icon name="bank-off-outline" size={40} color="#94a3b8" />
        <Text className="text-center text-base font-semibold text-slate-600 dark:text-slate-300">
          {ehGestor
            ? 'Sua conta não está vinculada a uma instituição.'
            : 'Selecione uma instituição para visualizar o dashboard.'}
        </Text>
        {!ehGestor && (
          <Link href="/institutions" asChild>
            <Pressable accessibilityRole="link" className="min-h-11 justify-center">
              <Text className="text-sm font-bold text-red-600 dark:text-[#ff535b]">
                Ir para instituições
              </Text>
            </Pressable>
          </Link>
        )}
      </View>
    );
  }

  if (carregando) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
        <ActivityIndicator
          size="large"
          color="#dc2626"
          accessibilityLabel="Carregando dashboard"
        />
      </View>
    );
  }

  if (erro || !instituicao) {
    return (
      <View className="flex-1 items-center justify-center gap-3 bg-white px-6 dark:bg-slate-900">
        <Icon name="alert-circle-outline" size={40} color="#94a3b8" />
        <Text className="text-center text-base font-semibold text-slate-600 dark:text-slate-300">
          Não foi possível carregar o dashboard desta instituição.
        </Text>
        <Button
          typeButton="default"
          title="Tentar novamente"
          icon="refresh"
          size={20}
          onPress={carregarDashboard}
        />
      </View>
    );
  }

  const nome = instituicao.nome;
  const tipo = instituicao.tipo;

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
              {tipo}
            </Text>
            <Text className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
              {nome}
            </Text>
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
                params: { id: String(instituicaoId), nome, tipo },
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
            Métricas Gerais da Instituição
          </Text>
          <Text className="text-xs font-bold text-violet-700 dark:text-violet-300">
            Dados reais
          </Text>
        </View>

        <View className="flex-row items-stretch gap-3">
          <MetricCard
            title="Alunos"
            value={String(metricas.totalAlunos)}
            icon="account-group-outline"
          />
          <MetricCard
            title="Trilhas Concluídas"
            value={String(metricas.trilhasConcluidas)}
            icon="check-circle-outline"
            highlighted
          />
        </View>
        <View className="flex-row items-stretch gap-3">
          <MetricCard
            title="Nível Médio"
            value={`Nvl ${metricas.nivelMedio.toLocaleString('pt-BR', {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}`}
            icon="medal-outline"
          />
          <MetricCard
            title="XP Médio"
            value={metricas.xpMedio.toLocaleString('pt-BR')}
            icon="star-outline"
          />
        </View>
      </View>

      <View className="gap-3 rounded-xl border border-slate-300 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800">
        <View className="flex-row flex-wrap items-center justify-between gap-2">
          <Text className="text-base font-extrabold text-slate-900 dark:text-slate-100">
            Dificuldades Registradas
          </Text>
          <Text className="text-xs font-bold text-slate-600 dark:text-slate-400">
            {metricas.alunosComDuvidas} aluno(s)
          </Text>
        </View>
        {dificuldades.length === 0 ? (
          <Text className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Nenhuma dificuldade registrada.
          </Text>
        ) : (
          dificuldades.map((aluno) => (
            <View
              key={aluno.id}
              className="gap-1 rounded-lg border border-slate-300 p-2 dark:border-slate-700"
            >
              <Text className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {aluno.nome}
              </Text>
              <Text
                className="text-xs text-slate-600 dark:text-slate-400"
                numberOfLines={3}
              >
                {aluno.duvidas}
              </Text>
            </View>
          ))
        )}
      </View>

      <ClassRanking alunos={topAlunos} instituicaoNome={nome} />

      <Text className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400">
        As seções abaixo usam dados simulados neste protótipo.
      </Text>
      <WeeklyEngagement />
      <OngoingTracks />
    </ScrollView>
  );
}
