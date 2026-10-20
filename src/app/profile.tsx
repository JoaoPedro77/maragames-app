import { GradientText } from '@/components/GradientText';
import { Card } from '@/components/Card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageCard } from '@/components/PageCard';
import { View, Text, Image, ScrollView } from 'react-native';

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

  return (
    <View className="flex h-full bg-white dark:bg-slate-900 mb-11">
      <Header/>

      <ScrollView
        className="flex-1 bg-white dark:bg-slate-900 gap-3 pt-4 px-6"
        showsVerticalScrollIndicator={false}
      >

        <View className="flex flex-row gap-4">
          <Image className='rounded-full h-20 w-20'
            source={{ uri: mockProfile.avatar }}
          />
          <View className="flex flex-col">
            <GradientText className="text-xl font-bold">
              {mockProfile.sequency}
            </GradientText>
            <View>
              <Text className="text-3xl text-slate-600 dark:text-slate-200 font-extrabold">
                {mockProfile.name}
              </Text>
              <Text className=" text-slate-400 dark:text-slate-500 text-base mt-1" >
                {mockProfile.username}
              </Text>
            </View>
          </View>
        </View>

        <PageCard className="mt-8" contentClassName="flex-row">
          {stats.map((stat, index) => (
            <View key={index} className="flex-grow p-3">
              <View className='flex-grow items-center'>
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

        <View className='mt-6'>
          <View className='flex w-full mx-3'>
            <Text className="text-2xl font-extrabold dark:text-purple-100 mb-2">
              Trilhas em Andamento
            </Text>
          </View>

          {mockProfile.inProgressTracks.map((track) => (
            <Card
              typeCard="discente"
              key={track.id}
              title={track.title}
              progress={track.restante + '%'}
              restante={track.progress}
            />
          ))}
        </View>
      </ScrollView >
      <Footer />
    </View>
  );
}