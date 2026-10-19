import MaterialDesignIcons, { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';

type IconProps = {
  name: MaterialDesignIconsIconName;
  size?: number;
  color?: string;
  className?: string;
};

export function Icon({ name, size = 24, color = 'currentColor', className }: IconProps) {
  return <MaterialDesignIcons name={name} size={size} color={color} className={className} />;
}