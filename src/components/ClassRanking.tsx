import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon } from './Icon';

export type RankingAluno = {
  id: number;
  nome: string;
  nivel: number;
  xp: number;
};

type ClassRankingProps = {
  alunos: RankingAluno[];
  instituicaoNome: string;
};

const AVATAR_CORES = [
  { avatar: 'bg-violet-700', text: 'text-white' },
  { avatar: 'bg-violet-300', text: 'text-violet-950' },
  { avatar: 'bg-blue-400', text: 'text-blue-950' },
];

function obterIniciais(nome: string) {
  const partes = nome.trim().split(/\s+/).filter(Boolean);

  if (partes.length === 0) {
    return '?';
  }

  if (partes.length === 1) {
    return partes[0].slice(0, 2).toUpperCase();
  }

  return `${partes[0][0]}${partes[partes.length - 1][0]}`.toUpperCase();
}

export function ClassRanking({ alunos, instituicaoNome }: ClassRankingProps) {
  return (
    <View className="gap-4 rounded-xl border border-slate-300 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800">
      <View className="flex-row flex-wrap items-center justify-between gap-2">
        <Text className="text-base font-extrabold text-slate-900 dark:text-slate-100">
          Top Alunos da Instituição
        </Text>
        <Text className="text-xs font-bold text-violet-700 dark:text-violet-300">
          {instituicaoNome}
        </Text>
      </View>

      {alunos.length === 0 ? (
        <Text className="text-xs font-semibold text-slate-600 dark:text-slate-400">
          Nenhum aluno cadastrado.
        </Text>
      ) : (
        <View className="gap-2">
          {alunos.map((aluno, index) => {
            const cores = AVATAR_CORES[index % AVATAR_CORES.length];

            return (
              <View
                key={aluno.id}
                className="flex-row flex-wrap items-center gap-3 rounded-lg border border-slate-300 p-2 dark:border-slate-700"
              >
                <View className={`h-7 w-7 items-center justify-center rounded-full ${index === 0 ? 'bg-red-100 dark:bg-red-500/20' : 'bg-slate-200 dark:bg-slate-700'}`}>
                  <Text className={`text-xs font-extrabold ${index === 0 ? 'text-red-600 dark:text-[#ff535b]' : 'text-slate-700 dark:text-slate-300'}`}>
                    {index + 1}º
                  </Text>
                </View>
                <View className={`h-9 w-9 items-center justify-center rounded-full ${cores.avatar}`}>
                  <Text className={`text-base font-bold ${cores.text}`}>
                    {obterIniciais(aluno.nome)}
                  </Text>
                </View>
                <View className="min-w-0 flex-1 gap-0.5">
                  <Text className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {aluno.nome}
                  </Text>
                  <Text className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Nível {aluno.nivel}
                  </Text>
                </View>
                <View className="items-end gap-0.5">
                  <Text className="text-base font-extrabold text-red-600 dark:text-[#ff535b]">
                    {aluno.xp.toLocaleString('pt-BR')}
                  </Text>
                  <Text className="text-xs text-slate-600 dark:text-slate-400">XP acumulado</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      <Link href="/rank" asChild>
        <Pressable
          accessibilityRole="link"
          className="min-h-11 flex-row items-center justify-between gap-2 rounded-lg px-1 active:bg-violet-100 dark:active:bg-slate-700"
        >
          <Text className="flex-1 text-xs font-bold text-violet-700 dark:text-violet-300">
            Ver ranking
          </Text>
          <Icon name="chevron-right" size={20} color="#6d28d9" darkColor="#cabeff" />
        </Pressable>
      </Link>
    </View>
  );
}
