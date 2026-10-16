import { useRouter } from "expo-router"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Icon } from "@/components/Icon"
import { GradientText } from "@/components/GradientText"
import { View, Text, ScrollView } from "react-native"

export default function Cadastro() {
    const router = useRouter()

    function coco() {
        router.back()
    }

    return (
        <View className="flex-1 bg-white dark:bg-slate-900">
            <Header onPress={coco} icon="arrow-left" size={27} />
            <ScrollView
                className="flex-1 bg-white dark:bg-slate-900 gap-3 pt-4 px-6"
                showsVerticalScrollIndicator={false}
            >
                <Text className="mt-3 text-2xl font-bold text-slate-600 dark:text-slate-400">
                    Aba principal de instituição em desenvolvimento inicial.
                </Text>
            </ScrollView>
            <Footer />
        </View>
    )
}