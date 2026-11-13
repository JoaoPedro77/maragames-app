import type { ReactNode } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useRequireRole } from '@/hooks/useRequireRole'
import type { Perfil } from '../../types/User'

type RoleGateProps = {
  permitidos: Perfil[]
  rota?: string
  children: ReactNode
}

export function RoleGate({ permitidos, rota, children }: RoleGateProps) {
  const { carregando, autorizado } = useRequireRole(permitidos, rota)

  if (carregando || !autorizado) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
        <ActivityIndicator size="large" color="#dc2626" accessibilityLabel="Carregando" />
      </View>
    )
  }

  return <>{children}</>
}
