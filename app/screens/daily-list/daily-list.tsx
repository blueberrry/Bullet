import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { View, Text, ScrollView, ViewStyle, TextStyle } from "react-native"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"

import { Button } from "../../components/button/button"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"
import { AppText, GradientBackground, Header, Screen } from "../../components"
import { color, spacing } from "../../theme"
import { DayModel } from "../../models/day/day"
import DraggableBulletList from "../../components/draggable-bullet-list/draggable-bullet-list"
import { Accordian } from "../../components/accordian/accordian"
import { Footer } from "../../components/footer/footer"
import { GestureModal } from "../../components/gesture-modal/gesture-modal"
import { EntryForm } from "../../components/entry-form/entry-form"

export const DailyList: FC<StackScreenProps<NavigatorParamList, "dailyList">> = observer(
  ({ navigation, route }) => {
    const goBack = () => navigation.goBack()
    const dayId = route.params.id

    // TODO: Parent screen not rerendering when updating data - maybe flatlist needs extraData?

    const { bulletEntriesStore, daysStore } = useStores()

    const day = daysStore.getDayById(dayId)
    const { entriesDetails } = day

    const [entryFormVisible, setEntryFormVisible] = useState(false)
    const [animateEntryForm, setAnimateEntryForm] = useState(false)

    const saveNewEntry = ({ text, status }) => {
      const id = uuidv4()
      day.addEntryDetails({
        id,
        priorityRanking: null,
        migrated: false,
      })
      bulletEntriesStore.addBulletEntry({
        id,
        text,
        status,
      })
    }

    // bulletEntriesStore.entryById(entriesDetails[0].id)

    // TODO: Migrated fields should be inactive

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
          <AppText>{`Total entries for day: ${day.totalEntries}`}</AppText>
          {/* <DraggableBulletList
            entriesDetails={entriesDetails}
            dateInfo={day.date}
            addNewEntry={saveNewEntry}
          /> */}
          <Accordian title={`Todos (${day.totalTodos})`}>
            <DraggableBulletList
              entriesDetails={day.allTodosDetails}
              dateInfo={day.date}
              addNewEntry={saveNewEntry}
            />
          </Accordian>
          <Accordian title={`Notes (${day.totalNotes})`}>
            <DraggableBulletList
              entriesDetails={day.allNotesDetails}
              dateInfo={day.date}
              addNewEntry={saveNewEntry}
            />
          </Accordian>
          <Accordian title={`Inspirational Ideas (${day.totalInspirationalIdeas})`}>
            <DraggableBulletList
              entriesDetails={day.allInspirationalIdeasDetails}
              dateInfo={day.date}
              addNewEntry={saveNewEntry}
            />
          </Accordian>
          <Accordian title={`Done (${day.totalDone})`}>
            <DraggableBulletList
              entriesDetails={day.allDoneDetails}
              dateInfo={day.date}
              addNewEntry={saveNewEntry}
            />
          </Accordian>
          <Accordian title={`Migrated (${day.totalMigrated})`}>
            <DraggableBulletList
              entriesDetails={day.allMigratedDetails}
              dateInfo={day.date}
              addNewEntry={saveNewEntry}
            />
          </Accordian>
        </Screen>

        <Footer>
          <Button
            text="Add new bullet entry"
            preset="secondary"
            onPress={() => setEntryFormVisible(true)}
          />
        </Footer>

        <GestureModal
          modalVisible={entryFormVisible}
          setModalVisible={setEntryFormVisible}
          animateModal={animateEntryForm}
          setAnimateModal={setAnimateEntryForm}
          fillViewport={true}
          title="Add Entry"
        >
          <EntryForm onSaveEntry={saveNewEntry} />
        </GestureModal>
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
