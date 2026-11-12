import { useEffect, useMemo } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { GradientText } from '@/components/GradientText';
import { Card } from '@/components/Card';
import { PageCard } from '@/components/PageCard';
import { Icon } from '@/components/Icon';
import { RoleGate } from '@/components/RoleGate';
import { useAuth } from '@/contexts/AuthContext';
import { homePorPerfil } from '@/hooks/useRequireRole';
import { useAlunoDetalheController } from '@/controllers/alunoDetalheController';

const mockSequency = '15 dias em sequência!';
const mockInProgressTracks = [
  { id: 1, title: 'Game Design', progress: 65, restante: 6 },
  { id: 2, title: 'Curiosidade dos Games', progress: 30, restante: 23 },
  { id: 3, title: 'Godot Engine', progress: 10, restante: 26 },
];

export default function ProfileScreen() {
  return (
    <RoleGate permitidos={['aluno', 'gestor', 'admin']}>
      <ProfileContent />
    </RoleGate>
  );
}

function ProfileContent() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { usuario } = useAuth();

  const idAlvo = useMemo(() => {
    if (!usuario) {
      return undefined;
    }

    if (usuario.perfil === 'aluno') {
      if (!id) {
        return String(usuario.id);
      }

      return Number(id) === usuario.id ? id : undefined;
    }

    return id;
  }, [usuario, id]);

  const { aluno, carregando, erro, carregarAluno } = useAlunoDetalheController(idAlvo);

  useEffect(() => {
    if (idAlvo) {
      carregarAluno();
    }
  }, [idAlvo, carregarAluno]);

  useEffect(() => {
    if (!usuario) {
      return;
    }

    if (usuario.perfil === 'aluno') {
      if (id && Number(id) !== usuario.id) {
        router.replace('/profile');
      }
      return;
    }

    if (!id) {
      router.replace(homePorPerfil(usuario.perfil));
    }
  }, [usuario, id, router]);

  const ehDono =
    !!usuario &&
    usuario.perfil === 'aluno' &&
    !!aluno &&
    (aluno.id === usuario.id ||
      aluno.email.trim().toLowerCase() === usuario.email.trim().toLowerCase());

  if (!idAlvo || carregando) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
        <ActivityIndicator
          size="large"
          color="#dc2626"
          accessibilityLabel="Carregando perfil"
        />
      </View>
    );
  }

  if (erro || !aluno) {
    return (
      <View className="flex-1 items-center justify-center gap-3 bg-white px-6 dark:bg-slate-900">
        <Icon name="account-alert-outline" size={40} color="#94a3b8" />
        <Text className="text-center text-base font-semibold text-slate-600 dark:text-slate-300">
          Não foi possível carregar as informações deste perfil.
        </Text>
      </View>
    );
  }

  const username = `@${aluno.email.split('@')[0]}`;
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    aluno.nome
  )}&background=7a2bcd&color=fff&size=200`;

  const stats = [
    { label: 'XP', value: aluno.xp.toLocaleString('pt-BR') },
    { label: 'Nível', value: aluno.nivel.toString() },
    { label: 'Rank', value: aluno.rank ? `#${aluno.rank}` : '—' },
    { label: 'Concluídas', value: aluno.trilhas_completas.toString() },
  ];

  return (
    <View className="flex h-full bg-white dark:bg-slate-900">
      <ScrollView
        className="flex-1 bg-white dark:bg-slate-900 gap-3 px-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex flex-row gap-4 pt-5 items-center">
          <Image className="rounded-full h-20 w-20" source={{ uri: avatar }} />
          <View>
            <Text className="text-3xl text-slate-600 dark:text-slate-200 font-extrabold">
              {aluno.nome}
            </Text>
            <Text className="text-slate-400 dark:text-slate-500 text-lg">
              {username}
            </Text>
          </View>
        </View>

        <View className="mt-8 flex flex-col gap-2 items-center justify-center">
          <View className="flex flex-row items-center justify-center">
            <Icon name="fire" size={20} color="#5049e3" darkColor="#5049e3" />
            <GradientText className="text-xl font-bold">
              {mockSequency}
            </GradientText>
          </View>
          <PageCard contentClassName="flex-row w-full">
            {stats.map((stat) => (
              <View key={stat.label} className="flex-grow p-1">
                <View className="flex-grow items-center">
                  <Text className="text-slate-600 dark:text-slate-400 text-md font-medium mb-1">
                    {stat.label}
                  </Text>
                  <Text className="text-red-500 text-2xl font-bold">
                    {stat.value}
                  </Text>
                </View>
              </View>
            ))}
          </PageCard>
        </View>

        <View className="mt-6 w-full gap-2">
          <View>
            <Text className="text-2xl font-extrabold dark:text-slate-100 mb-2">
              Trilhas em Andamento
            </Text>
          </View>

          {mockInProgressTracks.map((track) => (
            <Card
              typeCard="discente"
              key={track.id}
              title={track.title}
              progress={track.restante + '%'}
              restante={track.progress}
            />
          ))}
        </View>

        <PageCard
          className="mt-6"
          title="Dúvidas?"
          icon="information-slab-circle-outline"
        >
          {ehDono ? (
            <>
              <Text className="text-slate-600 dark:text-slate-400 text-md mb-1">
                Caso tenha alguma dúvida, Descreva-nos:
              </Text>
              <Text className="dark:text-white font-bold text-md mb-1">
                ALGUM AMIGO COLOCA O FORMULARIO AQUI :)
              </Text>
            </>
          ) : (
            <Text className="text-slate-600 dark:text-slate-400 text-md leading-5">
              {aluno.duvidas?.trim()
                ? aluno.duvidas
                : 'Nenhuma dificuldade registrada.'}
            </Text>
          )}
        </PageCard>

        <Text className="mb-10 text-xs leading-5 text-slate-500 dark:text-slate-400">
          A sequência e os detalhes das trilhas em andamento são dados simulados
          neste protótipo.
        </Text>
      </ScrollView>
    </View>
  );
}
