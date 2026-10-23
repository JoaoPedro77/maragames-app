import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from './Icon';

type ManagerHeaderProps = {
  onBack: () => void;
  onLogout: () => void;
};

export function ManagerHeader({ onBack, onLogout }: ManagerHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row items-center gap-2 bg-white px-4 pb-2 dark:bg-slate-900"
      style={{ paddingTop: insets.top + 8 }}
    >
      <Pressable
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Voltar para instituições"
        className="h-11 w-11 items-center justify-center rounded-full active:bg-slate-100 dark:active:bg-slate-800"
      >
        <Icon name="arrow-left" size={22} color="#475569" darkColor="#cbd5e1" />
      </Pressable>

      <View className="h-9 w-9 items-center justify-center rounded-full bg-violet-700">
        <Text className="text-base font-extrabold text-white">AG</Text>
      </View>
      <View className="min-w-0 flex-1 gap-0.5">
        <Text className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
          Administração
        </Text>
        <Text className="text-base font-extrabold text-slate-900 dark:text-slate-100">
          Central Maragames
        </Text>
      </View>

      <Pressable
        onPress={onLogout}
        accessibilityRole="button"
        accessibilityLabel="Sair da conta"
        className="h-11 w-11 items-center justify-center rounded-full bg-slate-100 active:bg-slate-200 dark:bg-slate-800 dark:active:bg-slate-700"
      >
        <Icon name="logout" size={22} color="#475569" darkColor="#cbd5e1" />
      </Pressable>
      <Pressable
        disabled
        accessibilityRole="button"
        accessibilityState={{ disabled: true }}
        accessibilityLabel="Notificações, indisponível"
        className="h-11 w-11 items-center justify-center rounded-full bg-slate-100 opacity-50 dark:bg-slate-800"
      >
        <Icon name="bell-outline" size={22} color="#475569" darkColor="#cbd5e1" />
      </Pressable>
    </View>
  );
}
