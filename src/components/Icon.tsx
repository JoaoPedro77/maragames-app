import { Iconify } from 'react-native-iconify';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
};

export function Icon({ name, size = 24, color = 'currentColor' }: IconProps) {
  return <Iconify icon={name} width={size} height={size} color={color} />;
}