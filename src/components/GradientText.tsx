import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import { Text } from 'react-native';

type GradientTextProps = {
  children: string;
  className?: string;
  colors?: LinearGradientProps['colors'];
};

export function GradientText({
  children,
  className = 'text-4xl font-bold',
  colors = ['#5049e3', '#a855f7', '#ec5e48'],
}: GradientTextProps) {
  return (
    <MaskedView
      accessibilityLabel={children}
      accessibilityRole="text"
      accessible
      maskElement={
        <Text accessible={false} className={`${className} text-black`}>
          {children}
        </Text>
      }
    >
      <LinearGradient
        colors={colors}
        end={{ x: 1, y: 0 }}
        start={{ x: 0, y: 0 }}
      >
        <Text accessible={false} className={`${className} opacity-0`}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
}
