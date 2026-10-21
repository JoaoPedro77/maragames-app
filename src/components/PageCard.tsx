import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import type { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';
import { Icon } from './Icon';

type PageCardProps = {
  title?: string;
  icon?: MaterialDesignIconsIconName;
  iconSize?: number;
  iconColor?: string;
  iconDarkColor?: string;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  children?: ReactNode;
};

export function PageCard({
  title,
  icon,
  iconSize = 22,
  iconColor = '#647082',
  iconDarkColor = '#b5bcc7',
  header,
  footer,
  className = '',
  contentClassName = '',
  headerClassName = '',
  footerClassName = 'mt-4',
  children,
}: PageCardProps) {
  const defaultHeader =
    title || icon ? (
      <View className={`mb-4 flex-row items-center gap-2 ${headerClassName}`}>
        {icon && (
          <Icon
            name={icon}
            size={iconSize}
            color={iconColor}
            darkColor={iconDarkColor}
          />
        )}
        {title && (
          <Text className="text-xl font-bold dark:text-slate-100">{title}</Text>
        )}
      </View>
    ) : null;

  return (
    <View
      className={`rounded-xl border border-slate-300 bg-slate-100 p-3 dark:border-slate-700 dark:bg-slate-800 ${className}`}
    >
      {header !== undefined ? header : defaultHeader}
      {children != null && (
        <View className={contentClassName}>{children}</View>
      )}
      {footer != null && <View className={footerClassName}>{footer}</View>}
    </View>
  );
}
