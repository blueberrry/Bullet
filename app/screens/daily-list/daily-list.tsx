import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, Text, ScrollView } from "react-native"
import { Button } from "../../components/button/button"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"

export const DailyList: FC<StackScreenProps<NavigatorParamList, "dailyList">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

    const { bulletEntriesStore, daysStore } = useStores()
    const { days } = daysStore

    async function fetchData() {
      await daysStore.getDays()
    }

    return <ScrollView>{JSON.stringify(days, null, 2)}</ScrollView>
  },
)
