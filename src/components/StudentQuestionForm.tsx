import { Text, View } from 'react-native';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { PageCard } from '@/components/PageCard';
import {
  QUESTION_MAX_LENGTH,
  useStudentQuestionController,
} from '@/controllers/studentQuestionController';

export function StudentQuestionForm() {
  const { question, changeQuestion, sending, error, success, submitQuestion } =
    useStudentQuestionController();

  return (
    <PageCard
      className="mt-6 mb-6"
      title="Dúvidas?"
      icon="information-slab-circle-outline"
      contentClassName="gap-3"
    >
      <Text className="text-base text-slate-600 dark:text-slate-400">
        Descreva sua dúvida para que possamos ajudar.
      </Text>
      <View className="gap-1">
        <Input
          label="Sua dúvida"
          placeholder="Digite sua dúvida aqui..."
          value={question}
          onChangeText={changeQuestion}
          multiline
          textAlignVertical="top"
          style={{ height: 144, paddingTop: 12, paddingBottom: 12 }}
          maxLength={QUESTION_MAX_LENGTH}
          editable={!sending}
          selectionColor="#593CBE"
        />
        <Text className="text-right text-xs text-slate-500 dark:text-slate-400">
          {question.length}/{QUESTION_MAX_LENGTH}
        </Text>
      </View>
      {error ? (
        <Text accessibilityRole="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </Text>
      ) : null}
      {success ? (
        <Text accessibilityLiveRegion="polite" className="text-sm text-emerald-700 dark:text-emerald-400">
          Sua dúvida foi enviada com sucesso!
        </Text>
      ) : null}
      <Button
        typeButton="default"
        title={sending ? 'Enviando...' : 'Enviar dúvida'}
        icon="send"
        size={20}
        disabled={sending}
        accessibilityState={{ disabled: sending, busy: sending }}
        onPress={submitQuestion}
      />
    </PageCard>
  );
}
