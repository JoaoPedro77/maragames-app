import { ScrollView, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';

export default function InstitutionScreen() {
  return (
    <ScrollView
      className="flex-1 bg-[#0d1321]"
      contentContainerStyle={{ padding: 20, paddingBottom: 32, gap: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <Text className="text-2xl font-extrabold text-[#dde2f6]">
        Visão do Gestor
      </Text>

      <View className="rounded-xl border border-[#2f3544] bg-[#191f2e] p-4">
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#4918c8]">
            <Icon name="bank-outline" size={24} color="#cabeff" />
          </View>

          <View className="flex-1 gap-1">
            <Text className="text-xs font-bold uppercase text-[#cabeff]">
              Instituição de ensino
            </Text>
            <Text className="text-lg font-extrabold text-[#dde2f6]">
              Escola Alpha - Polo Central
            </Text>
          </View>

          <View className="flex-row items-center gap-1 rounded-full bg-[#143d3b] px-2 py-1">
            <View className="h-1.5 w-1.5 rounded-full bg-[#00c9a0]" />
            <Text className="text-xs font-bold text-[#00c9a0]">Ativa</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
