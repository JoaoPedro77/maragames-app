import { Button } from '@/components/Button';
import { GradientText } from '@/components/GradientText';
import { useRouter } from 'expo-router';
import { useReducer } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const mockProfile = {
  name: 'João da Silva',
  username: '@joaodasilva',
  sequency: '15 dias em sequência!',
  avatar: 'https://ui-avatars.com/api/?name=João+da+Silva&background=7a2bcd&color=fff&size=200',
  xp: 12450,
  level: 8,
  rank: 42,
  completedTracks: 12,
  inProgressTracks: [
    { id: 1, title: 'Game Design', progress: 65, restante: 6 },
    { id: 2, title: 'Curiosidade dos Games', progress: 30, restante: 23 },
    { id: 3, title: 'Godot Engine', progress: 10, restante: 26 },
  ],
};

export default function Profile() {
  const stats = [
    { label: 'XP', value: mockProfile.xp.toLocaleString('pt-BR') },
    { label: 'Nível', value: mockProfile.level.toString() },
    { label: 'Rank', value: `#${mockProfile.rank}` },
    { label: 'Concluídas', value: mockProfile.completedTracks.toString() },
  ];

  const router = useRouter()

  function returnLogin() {
    router.replace('/login');
  }

  return (
    <ScrollView
      className="flex-1 bg-white dark:bg-slate-900 gap-3 pt-20 pb-20 px-6"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex flex-row gap-4">
        <Image
          source={{ uri: mockProfile.avatar }}
          style={styles.avatar}
        />
        <View className="flex flex-col">
          <GradientText className="text-xl font-bold">
            {mockProfile.sequency}
          </GradientText>
          <View>
            <Text className="text-3xl text-slate-600 dark:text-slate-400 font-extrabold">
              {mockProfile.name}
            </Text>
            <Text className="font-nunito text-slate-400 dark:text-slate-500 text-base mt-1" >
              {mockProfile.username}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex flex-row rounded-2xl border-black mt-8 bg-slate-50 shadow-md dark:shadow-xl shadow-slate-600 dark:shadow-red-700 dark:bg-slate-800">
        {stats.map((stat, index) => (
          <View key={index} className="flex-1 basis-1/2 p-3">
            <Text className="font-nunito text-slate-600 dark:text-slate-400 text-md font-medium mb-1">
              {stat.label}
            </Text>
            <Text className="font-nunito text-red-500 text-2xl font-bold">
              {stat.value}
            </Text>
          </View>
        ))}
      </View>

      <View className='mt-6'>
        <View className='flex w-full items-center justify-center'>
          <GradientText className="text-3xl font-extrabold mb-4">
            Trilhas em Andamento
          </GradientText>
        </View>
        {mockProfile.inProgressTracks.map((track) => (
          <View key={track.id} className='flex w-full gap-2'>
            <View className='bg-slate-50 shadow-md dark:shadow-md shadow-slate-600
             dark:shadow-purple-700 dark:bg-slate-800 rounded-2xl p-4'>
              <Text className="text-slate-600 dark:text-slate-400 text-lg font-semibold">
                {track.title}
              </Text>
              <Text className="font-nunito text-red-500 text-md font-bold">
                {track.progress}%
              </Text>
              <Text className="font bold text-slate-400 dark:text-slate-500">
                Quizzes restantes: {track.restante}
              </Text>
            </View>
            <View>
              <View
                style={[
                  {
                    width: `${track.progress}%`,
                  }
                ]}
              />
            </View>
          </View>
        ))}
      </View>
      <Button title='Voltar' onPress={returnLogin}></Button>
    </ScrollView >
  );
}



const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  }
})