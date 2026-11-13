import { Text, View } from 'react-native';
import { Button } from '@/components/Button';

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <View className="mt-4 flex-row items-center justify-between gap-2">
      <Button
        typeButton="default"
        title="Anterior"
        className="h-12 flex-1 items-center justify-center rounded-xl bg-[#593CBE] active:bg-[#3A2681] disabled:opacity-40"
        disabled={page <= 1}
        accessibilityState={{ disabled: page <= 1 }}
        onPress={() => onPageChange(page - 1)}
      />
      <Text
        accessibilityLiveRegion="polite"
        className="text-sm font-semibold text-slate-600 dark:text-slate-300"
      >
        {page} de {totalPages}
      </Text>
      <Button
        typeButton="default"
        title="Próxima"
        className="h-12 flex-1 items-center justify-center rounded-xl bg-[#593CBE] active:bg-[#3A2681] disabled:opacity-40"
        disabled={page >= totalPages}
        accessibilityState={{ disabled: page >= totalPages }}
        onPress={() => onPageChange(page + 1)}
      />
    </View>
  );
}
