import { Pressable, PressableProps, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import type { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';
import { useRouter, type Href } from 'expo-router';

type ButtonDefaultProps = PressableProps & {
  title?: string;
  typeButton: 'default';
  icon?: MaterialDesignIconsIconName;
  size?: number;
  color?: string;
  darkColor?: string;
  route?: string;
};

type ButtonFooterProps = PressableProps & {
  title?: string;
  typeButton: 'footer';
  icon?: MaterialDesignIconsIconName;
  size?: number;
  color?: string;
  darkColor?: string;
  route: Href;
  ativo?: boolean;
};

type ButtonTabsProps = PressableProps & {
  title?: string;
  typeButton: 'tabs';
  icon?: MaterialDesignIconsIconName;
  size?: number;
  color?: string;
  darkColor?: string;
  route?: string;
  ativo?: boolean;
};


export function Button(props: ButtonDefaultProps | ButtonFooterProps | ButtonTabsProps) {
  switch (props.typeButton) {
    case 'default':
      return <ButtonDefault {...props} />
    case 'footer':
      return <ButtonFooter {...props} />
    case 'tabs':
      return <ButtonTabs {...props} />
  }
}

function ButtonDefault({ title, icon, size, color, darkColor, ...props }: ButtonDefaultProps) {
  return (
    <Pressable
      accessibilityRole="button"
      className="mt-3 h-14 items-center justify-center rounded-xl bg-red-600 active:bg-red-800"
      {...props}
    >
      <View className="flex-row items-center justify-center gap-2">
        {title && <Text className="text-lg font-bold text-white">{title}</Text>}
        {icon && <Icon name={icon} size={size} color={color ?? "white"} darkColor={darkColor} />}
      </View>
    </Pressable>
  );
}

function ButtonFooter({ title, icon, size, color, darkColor, route, ativo = false, ...props }: ButtonFooterProps) {
  const router = useRouter()

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.navigate(route)}
      className={
        !ativo
          ? "h-16 w-1/3 items-center p-3 justify-center rounded-xl bg-slate-100 active:bg-slate-300 dark:bg-slate-800 dark:active:bg-slate-700"
          : "h-16 w-1/3 items-center p-3 justify-center rounded-lg bg-red-600 dark:active:bg-red-800"
      }
      {...props}
    >
      <View className="flex-grow items-center justify-center gap-1.5">
        {icon && (!ativo ? <Icon name={icon} size={size} color={color ?? "white"} darkColor={darkColor} /> : <Icon name={icon} size={size} color="white" darkColor={darkColor ?? color} />)}
        {!ativo ? <Text className="text-md font-bold dark:text-white text-slate-700">{title}</Text> : <Text className="text-md font-bold text-white">{title}</Text>}
      </View>
    </Pressable>
  );
}

function ButtonTabs({ title, icon, size, color, darkColor, ativo = false, ...props }: ButtonTabsProps) {
  return (
    <Pressable
      accessibilityRole="button"
      className={
        !ativo
          ? "items-center w-full h-full justify-center rounded-xl bg-slate-100 active:bg-slate-300 dark:bg-slate-800 dark:active:bg-slate-700"
          : "items-center w-full h-full justify-center rounded-xl bg-red-600 active:bg-red-800"
      }
      {...props}
    >
      <View className="flex-row items-center justify-center gap-2">
        {icon && (!ativo ? <Icon name={icon} size={size} color={color ?? "white"} darkColor={darkColor} /> : <Icon name={icon} size={size} color="white" darkColor={darkColor ?? color} />)}
        {!ativo ? <Text className="text-md font-bold dark:text-white text-slate-700">{title}</Text> : <Text className="text-md font-bold text-white">{title}</Text>}
      </View>
    </Pressable>
  );
}
