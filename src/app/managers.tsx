import { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { PageCard } from '@/components/PageCard';
import { Input } from '@/components/Input';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';

const mockGestores = [
  {
    id: '1',
    nome: 'Prof. Carlos Eduardo Souza',
    iniciais: 'CS',
    cargo: 'Coordenador Pedagógico Geral',
    email: 'carlos.souza@escolaalpha.edu.br',
    chave: '#RF06-ALPHA-01',
    status: 'Ativo',
  },
  {
    id: '2',
    nome: 'Profa. Mariana Vasconcellos',
    iniciais: 'MV',
    cargo: 'Gestora de Gamificação & Projetos',
    email: 'mariana.v@escolaalpha.edu.br',
    chave: '#RF06-ALPHA-02',
    status: 'Ativo',
  },
  {
    id: '3',
    nome: 'Prof. Marcos Oliveira',
    iniciais: 'MO',
    cargo: 'Docente Líder - Ensino Médio',
    email: 'marcos.oliveira@escolaalpha.edu.br',
    chave: '#RF06-ALPHA-03',
    status: 'Pendente',
  },
  {
    id: '4',
    nome: 'Prof. Roberto Mendes',
    iniciais: 'RM',
    cargo: 'Coordenador de Tecnologia',
    email: 'roberto.mendes@escolaalpha.edu.br',
    chave: '#RF06-ALPHA-04',
    status: 'Pendente',
  },
];

export default function ManagersScreen() {
  const router = useRouter();
  
  const params = useLocalSearchParams<{
    nome?: string;
    tipo?: string;
    gestoresCount?: string;
  }>();

  const [search, setSearch] = useState('');

  const currentInstitution = {
    id: 'INS-001',
    nome: params.nome || 'Escola Alpha - Campus Centro',
    tipo: params.tipo || 'Escola',
    local: 'Florianópolis/SC • Unidade Matriz',
  };

  const gestoresFiltrados = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return mockGestores;

    return mockGestores.filter(
      (gestor) =>
        gestor.nome.toLowerCase().includes(query) ||
        gestor.email.toLowerCase().includes(query) ||
        gestor.cargo.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <View className="flex-1 bg-white dark:bg-slate-900">
      <ScrollView
        className="flex-1 px-6 pt-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="gap-5">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <View>
                <Text className="text-2xl font-extrabold dark:text-slate-100">
                  Gestores
                </Text>
                <Text className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  #{currentInstitution.id}
                </Text>
              </View>
            </View>
          </View>

          <PageCard contentClassName="flex-row items-center gap-4">
            <View className="h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 dark:bg-red-500/20">
              <Icon name="bank" size={24} color="#ef4444" darkColor="#ef4444" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-extrabold dark:text-slate-100" numberOfLines={1}>
                {currentInstitution.nome}
              </Text>
              <View className="flex-row items-center gap-1 mt-0.5">
                <Icon name="map-marker-outline" size={14} color="#94a3b8" />
                <Text className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {currentInstitution.tipo} • {currentInstitution.local}
                </Text>
              </View>
            </View>
          </PageCard>

          <View className="gap-3">
            <Input
              icon="magnify"
              size={22}
              color="#94a3b8"
              placeholder="Buscar por nome, e-mail ou cargo..."
              value={search}
              onChangeText={setSearch}
            />
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-extrabold dark:text-slate-100">
                Exibindo {gestoresFiltrados.length} de {mockGestores.length} Gestores
              </Text>
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <Text className="text-xs font-bold text-red-500">Limpar busca</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View className="gap-3">
            {gestoresFiltrados.length === 0 ? (
              <PageCard className="py-8 items-center justify-center">
                <Icon name="account-search-outline" size={32} color="#94a3b8" />
                <Text className="text-slate-500 dark:text-slate-400 text-center font-medium mt-2">
                  Nenhum gestor encontrado para "{search}".
                </Text>
              </PageCard>
            ) : (
              gestoresFiltrados.map((gestor) => (
                <PageCard key={gestor.id} contentClassName="gap-3">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-row gap-3 flex-1">
                      <View className="relative">
                        <View className="h-12 w-12 items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-700">
                          <Text className="text-lg font-bold text-slate-700 dark:text-slate-200">
                            {gestor.iniciais}
                          </Text>
                        </View>
                        <View
                          className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-800 ${
                            gestor.status === 'Ativo'
                              ? 'bg-emerald-500'
                              : 'bg-amber-500'
                          }`}
                        />
                      </View>

                      <View className="flex-1 justify-center">
                        <View className="flex-row items-center justify-between">
                          <Text
                            className="text-base font-bold dark:text-slate-100"
                            numberOfLines={1}
                          >
                            {gestor.nome}
                          </Text>
                        </View>
                        <Text className="text-xs font-semibold text-red-500 mt-0.5">
                          {gestor.cargo}
                        </Text>
                        <View className="flex-row items-center gap-1 mt-1">
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
                  </View>

                  <View className="mt-1 pt-2 border-t border-slate-200 dark:border-slate-700 flex-row justify-between items-center">
                    <View className="flex-row items-center gap-1">
                      <Icon name="key-outline" size={14} color="#94a3b8" />
                      <Text className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {gestor.chave}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => router.push('/profile')}
                      className="flex-row items-center gap-1 rounded-lg bg-slate-200 dark:bg-slate-700 px-2.5 py-1 active:opacity-80"
                    >
                      <Text className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Acessos
                      </Text>
                      <Icon
                        name="chevron-right"
                        size={14}
                        color="#64748b"
                        darkColor="#cbd5e1"
                      />
                    </TouchableOpacity>
                  </View>
                </PageCard>
              ))
            )}
          </View>

          <View className="mt-2">
            <Button
              typeButton="default"
              title="Vincular Novo Gestor (RF06)"
              icon="account-plus"
              size={20}
              onPress={() => router.navigate('/register')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}