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

    const { bulletEntriesStore, allDaysStore } = useStores()
    // const { bulletEntries } = bulletEntriesStore
    const { allDays } = allDaysStore

    console.tron.log(
      "🚀 ~ file: daily-list.tsx ~ line 15 ~ allDaysStore",
      JSON.stringify(allDaysStore, null, 2),
    )

    async function fetchData() {
      await allDaysStore.getAllDays()
      // await allDaysStore.getAllDays()
    }

    const saveDays = () => {
      allDaysStore.getAllDaysStore()
    }

    const addNewDay = (newEntry = undefined) => {
      const newAllDays = [
        ...allDays,
        {
          id: "osefeop-sfesef-ef-sfe-f",
          date: "day",
          dailyEntries: [{ entryId: "fsiodjfidsf", dayPriorityRanking: null, migrated: true }],
        },
      ]
      allDaysStore.saveAllDays(newAllDays)
    }

    return (
      <ScrollView>
        <Button text="console.tron save days" onPress={saveDays} />
        <Text>{JSON.stringify(allDaysStore, null, 2)}</Text>
        <Button text="Get all days" onPress={fetchData} />
        <Button text="Add new days" onPress={addNewDay} />
      </ScrollView>
    )
  },
)

// .actions((self) => ({
//   getAllDaysStore: () => {
//     console.tron.log("🚀 ~ file: all-days-store.ts ~ line 33 ~ .actions ~ self", self)
//   },
// }))
