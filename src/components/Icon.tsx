import MaterialDesignIcons, { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';

type IconProps = {
  name: MaterialDesignIconsIconName;
  size?: number;
  color?: string;
};

export function Icon({ name, size = 24, color = 'currentColor' }: IconProps) {
  return <MaterialDesignIcons name={name} size={size} color={color} />;
}