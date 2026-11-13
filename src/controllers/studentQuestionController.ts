import { useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const QUESTION_MAX_LENGTH = 1000;

export function useStudentQuestionController() {
  const [question, setQuestion] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const sendingRef = useRef(false);

  function changeQuestion(value: string) {
    setQuestion(value);
    setError('');
    setSuccess(false);
  }

  async function submitQuestion() {
    if (sendingRef.current) return;

    setError('');
    setSuccess(false);
    const message = question.trim();

    if (!message) {
      setError('Descreva sua dúvida antes de enviar.');
      return;
    }

    if (message.length > QUESTION_MAX_LENGTH) {
      setError(`Sua dúvida deve ter no máximo ${QUESTION_MAX_LENGTH} caracteres.`);
      return;
    }

    sendingRef.current = true;
    setSending(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData.user?.email) {
        setError('Entre com sua conta de aluno para enviar uma dúvida.');
        return;
      }

      const { data: student, error: studentError } = await supabase
        .from('aluno_instituicao')
        .select('id, duvidas')
        .eq('email', authData.user.email)
        .maybeSingle();

      if (studentError) {
        setError('Não foi possível carregar seu cadastro. Tente novamente.');
        return;
      }

      if (!student) {
        setError('Nenhum cadastro de aluno foi encontrado para sua conta.');
        return;
      }

      const questions = student.duvidas
        ? `${student.duvidas}\n\n${message}`
        : message;

      let update = supabase
        .from('aluno_instituicao')
        .update({ duvidas: questions })
        .eq('id', student.id)
        .eq('email', authData.user.email);

      // Avoid overwriting a question submitted from another session in the meantime.
      update = student.duvidas === null
        ? update.is('duvidas', null)
        : update.eq('duvidas', student.duvidas);

      const { data, error: updateError } = await update.select('id').single();

      if (updateError || !data) {
        setError('Não foi possível enviar sua dúvida. Tente novamente.');
        return;
      }

      setQuestion('');
      setSuccess(true);
    } catch {
      setError('Não foi possível enviar sua dúvida. Verifique sua conexão e tente novamente.');
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  }

  return { question, changeQuestion, sending, error, success, submitQuestion };
}
