import { useRouter } from "expo-router"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Icon } from "@/components/Icon"
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
            <View className="flex-row gap-2 justify-around">
                <View className="flex-grow p-3 w-32 rounded-2xl items-center justify-center bg-slate-800">
                    <Icon name='bank' size={22} color="white"/>
                    <Text className="text-xl font-extrabold dark:text-purple-100">
                        18
                    </Text>
                    <Text  className="text-lg font-extrabold dark:text-purple-100">
                        Instituições
                    </Text>
                </View>
                <View className="flex-grow p-3 w-32 rounded-2xl items-center justify-center bg-slate-800">
                    <Icon name='bank' size={22} color="white"/>
                    <Text className="text-xl font-extrabold dark:text-purple-100">
                        18
                    </Text>
                    <Text  className="text-lg font-extrabold dark:text-purple-100">
                        Gestores
                    </Text>
                </View>
                <View className="flex-grow p-3 w-32 rounded-2xl items-center justify-center bg-slate-800">
                    <Icon name='account-school' size={22} color="white"/>
                    <Text className="text-xl font-extrabold dark:text-purple-100">
                        2343
                    </Text>
                    <Text  className="text-lg font-extrabold dark:text-purple-100">
                        Alunos
                    </Text>
                </View>
            </View>
            </ScrollView>
            <Footer />
        </View>
    )
}