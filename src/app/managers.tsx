// Arquivo: app/managers.tsx
import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { PageCard } from '@/components/PageCard'; //[cite: 15]
import { Input } from '@/components/Input'; //[cite: 14]
import { Icon } from '@/components/Icon'; //[cite: 13]
import { Button } from '@/components/Button'; //[cite: 8]

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
          
          {/* COMMIT 2 ENTRA AQUI */}
          {/* COMMIT 3 ENTRA AQUI */}
          {/* COMMIT 4 ENTRA AQUI */}
        </View>
      </ScrollView>
    </View>
  );
}