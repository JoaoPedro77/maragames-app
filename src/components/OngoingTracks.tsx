import { Text, View } from 'react-native';

const tracks = [
  { title: 'Desenvolvimento de Jogos 2D', quizzes: 32, participants: 138, progress: 68 },
  { title: 'Game Design & Mecânicas', quizzes: 24, participants: 112, progress: 54 },
  { title: 'Godot Engine Básico', quizzes: 18, participants: 95, progress: 41 },
];

export function OngoingTracks() {
  return (
    <View className="gap-3">
      <View className="flex-row flex-wrap items-center justify-between gap-2">
        <Text className="text-base font-extrabold text-slate-900 dark:text-slate-100">
          Trilhas em Andamento
        </Text>
        <Text className="text-xs font-bold text-slate-600 dark:text-slate-400">
          Progresso Coletivo
        </Text>
      </View>

      {tracks.map(({ title, quizzes, participants, progress }) => (
        <View
          key={title}
          className="gap-3 rounded-xl border border-slate-300 bg-slate-100 p-3 dark:border-slate-700 dark:bg-slate-800"
        >
          <View className="flex-row items-start justify-between gap-3">
            <View className="min-w-0 flex-1 gap-1">
              <Text className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                {title}
              </Text>
              <Text className="text-xs text-slate-600 dark:text-slate-400">
                {quizzes} quizzes ativos • {participants} participantes
              </Text>
            </View>
            <Text className="text-xl font-extrabold text-red-600 dark:text-[#ff535b]">
              {progress}%
            </Text>
          </View>

          <View
            accessibilityRole="progressbar"
            accessibilityLabel={`Progresso coletivo: ${title}`}
            accessibilityValue={{ min: 0, max: 100, now: progress }}
            className="h-2 overflow-hidden rounded-full bg-slate-300 dark:bg-slate-700"
          >
            <View
              className="h-full rounded-full bg-red-500 dark:bg-[#ff535b]"
              style={{ width: `${progress}%` }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}
