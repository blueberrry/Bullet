import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, Text, ScrollView, ViewStyle, TextStyle } from "react-native"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"

import { Button } from "../../components/button/button"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"
import { useEntriesForDate } from "../../hooks/use-entries-for-date"
import { AppText, GradientBackground, Header, Screen } from "../../components"
import { color, spacing } from "../../theme"
import { DayModel } from "../../models/day/day"

export const DailyList: FC<StackScreenProps<NavigatorParamList, "dailyList">> = observer(
  ({ navigation, route }) => {
    const goBack = () => navigation.goBack()
    const dayId = route.params.id 

    // TODO: Parent screen not rerendering when updating data - maybe flatlist needs extraData?

    const { bulletEntriesStore, daysStore } = useStores()
    const { bulletEntries } = bulletEntriesStore
    const { days } = daysStore

    const day = daysStore.getDayById(dayId)
    const { entriesDetails } = day
    console.tron.log("🚀 ~ file: daily-list.tsx ~ line 29 ~ entriesDetails", entriesDetails)

    const entryIds = day.entriesDetailsIds
    const daysEntries = bulletEntriesStore.getEntriesFromIds(entryIds)
    const {
      entriesForThisDateWithDetails,
      entriesNotMigrated,
      entriesMigrated,
      entriesMigratedTotal,
      todos,
      todosTotal,
      done,
      doneTotal,
      allTodosTotal,
      percentageTodosCompleted,
      notes,
      notesTotal,
      inspirationalIdeas,
      inspirationalIdeasTotal,
    } = useEntriesForDate(entriesDetails, daysEntries)

    // bulletEntriesStore.entryById(entriesDetails[0].id)

    return (
      <View testID="DailyListScreen" style={FULL}>
        <Header
          headerText="All Entries"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <GradientBackground colors={["#422443", "#000000"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <AppText>{JSON.stringify(day, null, 2)}</AppText>
          <Button
            onPress={() => {
              const id = uuidv4()
              day.add({
                id,
                priorityRanking: null,
                migrated: false,
              })
              bulletEntriesStore.addBulletEntry({
                id,
                text: "hello 2u",
                status: "todo",
              })
            }}
            text="Add hello"
          />
          <AppText>{JSON.stringify(entriesForThisDateWithDetails, null, 2)}</AppText>
          <Button
            onPress={() => {
              // entriesForThisDateWithDetails[0].changePriorityRanking(1)
              day.entriesDetails[0].changePriorityRanking(1)
              daysEntries[0].changeStatus("done")
            }}
            text="Change first"
          />
        </Screen>
      </View>
    )
  },
)

// TODO: Move to globals - dupes in other screens
const FULL: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
