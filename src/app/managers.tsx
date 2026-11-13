import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { PageCard } from '@/components/PageCard';
import { Input } from '@/components/Input';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { RoleGate } from '@/components/RoleGate';
import { useManagersController } from '@/controllers/managersController';

export default function ManagersScreen() {
  return (
    <RoleGate permitidos={['admin']}>
      <ManagersContent />
    </RoleGate>
  );
}

function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/).filter(Boolean);

  if (partes.length === 0) {
    return '?';
  }

  if (partes.length === 1) {
    return partes[0].slice(0, 2).toUpperCase();
  }

  return `${partes[0][0]}${partes[partes.length - 1][0]}`.toUpperCase();
}

function ManagersContent() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id?: string;
    nome?: string;
    tipo?: string;
  }>();

  const idParam = params.id ? Number(params.id) : null;
  const instituicaoId =
    idParam !== null && !Number.isNaN(idParam) ? idParam : null;

  const { gestores, carregando, erro, carregarGestores } =
    useManagersController(instituicaoId);

  useEffect(() => {
    carregarGestores();
  }, [carregarGestores]);

  const [search, setSearch] = useState('');

  const gestoresFiltrados = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return gestores;

    return gestores.filter(
      (gestor) =>
        gestor.nome.toLowerCase().includes(query) ||
        gestor.email.toLowerCase().includes(query)
    );
  }, [gestores, search]);

  const nomeInstituicao = params.nome || 'Instituição';
  const tipoInstituicao = params.tipo || 'Tipo não informado';

  if (!instituicaoId) {
    return (
      <View className="flex-1 items-center justify-center gap-3 bg-white px-6 dark:bg-slate-900">
        <Icon name="bank-off-outline" size={40} color="#94a3b8" />
        <Text className="text-center text-base font-semibold text-slate-600 dark:text-slate-300">
          Selecione uma instituição para visualizar os gestores.
        </Text>
        <Link href="/institutions" asChild>
          <Pressable accessibilityRole="link" className="min-h-11 justify-center">
            <Text className="text-sm font-bold text-red-600 dark:text-[#ff535b]">
              Ir para instituições
            </Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white dark:bg-slate-900"
      contentContainerStyle={{ padding: 24, paddingBottom: 100, gap: 20 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View className="gap-1">
        <Text className="text-2xl font-extrabold dark:text-slate-100">
          Gestores
        </Text>
        <Text className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          #{instituicaoId}
        </Text>
      </View>

      <PageCard contentClassName="flex-row items-center gap-4">
        <View className="h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 dark:bg-red-500/20">
          <Icon name="bank" size={24} color="#ef4444" darkColor="#ef4444" />
        </View>
        <View className="flex-1">
          <Text
            className="text-lg font-extrabold dark:text-slate-100"
            numberOfLines={1}
          >
            {nomeInstituicao}
          </Text>
          <View className="flex-row items-center gap-1 mt-0.5">
            <Icon name="domain" size={14} color="#94a3b8" />
            <Text
              className="text-xs font-semibold text-slate-500 dark:text-slate-400"
              numberOfLines={1}
            >
              {tipoInstituicao}
            </Text>
          </View>
        </View>
      </PageCard>

      <View className="gap-3">
        <Input
          icon="magnify"
          size={22}
          color="#94a3b8"
          placeholder="Buscar por nome ou e-mail..."
          value={search}
          onChangeText={setSearch}
        />
        <View className="flex-row justify-between items-center">
          <Text className="text-sm font-extrabold dark:text-slate-100">
            Exibindo {gestoresFiltrados.length} de {gestores.length} Gestores
          </Text>
          {search.length > 0 && (
            <Pressable
              accessibilityRole="button"
              onPress={() => setSearch('')}
              className="min-h-11 justify-center"
            >
              <Text className="text-xs font-bold text-red-500">
                Limpar busca
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      <View className="gap-3">
        {carregando ? (
          <View className="items-center py-10">
            <ActivityIndicator
              size="large"
              color="#dc2626"
              accessibilityLabel="Carregando gestores"
            />
          </View>
        ) : erro ? (
          <PageCard className="py-8 items-center justify-center gap-3">
            <Icon name="alert-circle-outline" size={32} color="#94a3b8" />
            <Text className="text-slate-500 dark:text-slate-400 text-center font-medium">
              Não foi possível carregar os gestores.
            </Text>
            <Button
              typeButton="default"
              title="Tentar novamente"
              icon="refresh"
              size={20}
              onPress={carregarGestores}
            />
          </PageCard>
        ) : gestores.length === 0 ? (
          <PageCard className="py-8 items-center justify-center">
            <Icon name="account-off-outline" size={32} color="#94a3b8" />
            <Text className="text-slate-500 dark:text-slate-400 text-center font-medium mt-2">
              Nenhum gestor vinculado a esta instituição.
            </Text>
          </PageCard>
        ) : gestoresFiltrados.length === 0 ? (
          <PageCard className="py-8 items-center justify-center">
            <Icon name="account-search-outline" size={32} color="#94a3b8" />
            <Text className="text-slate-500 dark:text-slate-400 text-center font-medium mt-2">
              Nenhum gestor encontrado para &quot;{search}&quot;.
            </Text>
          </PageCard>
        ) : (
          gestoresFiltrados.map((gestor) => (
            <PageCard key={gestor.id} contentClassName="gap-3">
              <View className="flex-row gap-3">
                <View className="h-12 w-12 items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-700">
                  <Text className="text-lg font-bold text-slate-700 dark:text-slate-200">
                    {iniciais(gestor.nome)}
                  </Text>
                </View>

                <View className="flex-1 justify-center gap-1">
                  <Text
                    className="text-base font-bold dark:text-slate-100"
                    numberOfLines={1}
                  >
                    {gestor.nome}
                  </Text>
                  <View className="flex-row items-center gap-1">
                    <Icon name="email-outline" size={13} color="#94a3b8" />
                    <Text
                      className="text-xs font-medium text-slate-500 dark:text-slate-400"
                      numberOfLines={1}
                    >
                      {gestor.email}
                    </Text>
                  </View>
                </View>
              </View>
            </PageCard>
          ))
        )}
      </View>

      <Button
        typeButton="default"
        title="Vincular Novo Gestor (RF06)"
        icon="account-plus"
        size={20}
        onPress={() => router.navigate('/register')}
      />
    </ScrollView>
  );
}
