import MaterialDesignIcons, { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';
import { useColorScheme } from 'nativewind';

type IconProps = {
  name: MaterialDesignIconsIconName;
  size?: number;
  color?: string;
  darkColor?: string;
  className?: string;
};

export function Icon({ name, size = 24, color = 'currentColor', darkColor, className }: IconProps) {
  const { colorScheme } = useColorScheme();
  const resolvedColor = colorScheme === 'dark' ? (darkColor ?? color) : color;

  return <MaterialDesignIcons name={name} size={size} color={resolvedColor} className={className} />;
}
