import { GradientText } from '@/components/GradientText';
import { Card } from '@/components/Card';
import { PageCard } from '@/components/PageCard';
import { View, Text, Image, ScrollView } from 'react-native';
import { Icon } from '@/components/Icon';

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
    <View className="flex h-full bg-white dark:bg-slate-900">
      <ScrollView
        className="flex-1 bg-white dark:bg-slate-900 gap-3 px-6"
        showsVerticalScrollIndicator={false}
      >

        <View className="flex flex-row gap-4 pt-5 items-center">
          <Image className='rounded-full h-20 w-20'
            source={{ uri: mockProfile.avatar }}
          />
            <View>
              <Text className="text-3xl text-slate-600 dark:text-slate-200 font-extrabold">
                {mockProfile.name}
              </Text>
              <Text className=" text-slate-400 dark:text-slate-500 text-lg" >
                {mockProfile.username}
              </Text>
          </View>
        </View>
        
        <View className="mt-8 flex flex-col gap-2 items-center justify-center">
          <View className="flex flex-row items-center justify-center">
            <Icon name="fire" size={20} color="#5049e3" darkColor="#5049e3" />
            <GradientText className="text-xl font-bold">
              {mockProfile.sequency}
            </GradientText>
          </View>
          <PageCard contentClassName="flex-row w-full">
            {stats.map((stat, index) => (
              <View key={index} className="flex-grow p-1">
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
        </View>

        <View className='mt-6 w-full gap-2'>
          <View className=''>
            <Text className="text-2xl font-extrabold dark:text-slate-100 mb-2">
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

        <PageCard
        className="mt-6"
        title='Dúvidas?'
        icon='information-slab-circle-outline'
        >
          <Text className="text-slate-600 dark:text-slate-400 text-md mb-1">
            Caso tenha alguma dúvida, Descreva-nos:
          </Text>
          <Text className="dark:text-white font-bold text-md mb-1">
            ALGUM AMIGO COLOCA O FORMULARIO AQUI :)
          </Text>
        </PageCard>
      </ScrollView >
    </View>
  );
}