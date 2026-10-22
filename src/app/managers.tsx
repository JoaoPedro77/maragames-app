// Arquivo: app/managers.tsx
import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { PageCard } from '@/components/PageCard';
import { Input } from '@/components/Input';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';

const institutionInfo = {
  nome: 'Escola Alpha - Campus Centro',
  local: 'Florianópolis/SC • Unidade Matriz',
  totalGestores: 12,
};

const mockGestores = [
  { id: '1', nome: 'Prof. Carlos Eduardo Souza', iniciais: 'CS', cargo: 'Coordenador Pedagógico Geral', email: 'carlos.souza@escolaalpha.edu.br', chave: '#RF06-ALPHA-01', status: 'Ativo' },
  { id: '2', nome: 'Profa. Mariana Vasconcellos', iniciais: 'MV', cargo: 'Gestora de Gamificação & Projetos', email: 'mariana.v@escolaalpha.edu.br', chave: '#RF06-ALPHA-02', status: 'Ativo' },
  { id: '3', nome: 'Prof. Marcos Oliveira', iniciais: 'MO', cargo: 'Docente Líder - Ensino Médio', email: 'marcos.oliveira@escolaalpha.edu.br', chave: '#RF06-ALPHA-03', status: 'Pendente' },
];

export default function ManagersScreen() {
  const [search, setSearch] = useState('');

  return (
    <View className="flex-1 bg-white dark:bg-slate-900">
      <ScrollView
        className="flex-1 px-6 pt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="gap-5">
          <View>
            <Text className="text-3xl font-extrabold dark:text-slate-100">Gestores</Text>
            <Text className="text-md text-slate-600 dark:text-slate-400">Gerencie a equipe da instituição</Text>
          </View>
          
          {/* Substituir o comentário "COMMIT 2 ENTRA AQUI" por: */}
          <PageCard contentClassName="flex-row items-center gap-4">
            <View className="h-14 w-14 items-center justify-center rounded-xl bg-indigo-500/20 dark:bg-indigo-500/30">
              <Icon name="school" size={28} color="#6366f1" darkColor="#818cf8" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-extrabold dark:text-slate-100">{institutionInfo.nome}</Text>
              <View className="flex-row items-center gap-1 mt-1">
                <Icon name="map-marker-outline" size={14} color="#94a3b8" />
                <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400">{institutionInfo.local}</Text>
              </View>
            </View>
          </PageCard>

          <View className="gap-3">
            <Input
              icon="magnify"
              size={22}
              color="#94a3b8"
              placeholder="Buscar por nome, e-mail ou cargo"
              value={search}
              onChangeText={setSearch}
            />
            <View className="flex-row">
              <View className="rounded-lg bg-indigo-600 px-3 py-1.5 flex-row items-center gap-2">
                <Text className="font-bold text-white">Todos</Text>
                <View className="bg-white/20 rounded-full px-2 py-0.5">
                  <Text className="text-xs font-bold text-white">{institutionInfo.totalGestores}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}