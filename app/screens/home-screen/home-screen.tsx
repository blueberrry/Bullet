import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import moment from "moment"
import React, { FC, useEffect, useState } from "react"
import { ScrollView, TouchableOpacity, FlatList, View } from "react-native"
import ProgressCircle from "react-native-progress-circle"
import { useStores } from "../../models"
import { DailyEntries, Day } from "../../models/all-days-day/all-days-day"
import { BulletEntriesStore } from "../../models/bullet-entries-store/bullet-entries-store"
import { NavigatorParamList } from "../../navigators/app-navigator"
import { Text } from "../../components/text/text"
import { spacing } from "../../theme/spacing"

interface ScrollMenuPreviewProps {
  children?: React.ReactNode
  hasProgress?: boolean
  progressPercentage?: number
}

const ScrollMenuPreview = (props: ScrollMenuPreviewProps) => {
  const { children, hasProgress, progressPercentage = 50 } = props
  return (
    <View>
      {/* <ProgressCircle
        percent={hasProgress ? progressPercentage : 100}
        radius={50}
        borderWidth={8}
        color="#3399FF"
        shadowColor="#999"
        bgColor="#fff"
      >
        {children}
      </ProgressCircle> */}
    </View>
  )
}

const ScrollMenuPreviewContainer = (props) => {
  // TODO: prop type
  const { entries: allEntries } = props

  const allTodos = allEntries.filter((entry) => entry.status === "todo")
  const noAllTodos = allTodos.length

  const allCompleted = allEntries.filter((entry) => entry.status === "completed")
  const noAllCompleted = allCompleted.length

  const totalTodos = noAllTodos + noAllCompleted

  const percenttageCompleted = (noAllCompleted / totalTodos) * 100

  const allNotes = allEntries.filter((entry) => entry.status === "notes")
  const noAllNotes = allNotes.length

  const allInspirationalIdeas = allEntries.filter((entry) => entry.status === "inspirationalIdeas")
  const noAllInspirationalIdeas = allInspirationalIdeas.length
  return (
    <View>
      <ScrollMenuPreview
        hasProgress={true}
        progressPercentage={percenttageCompleted}
      ></ScrollMenuPreview>
      <ScrollMenuPreview></ScrollMenuPreview>
      <ScrollMenuPreview></ScrollMenuPreview>
      <ScrollMenuPreview></ScrollMenuPreview>

      {/* <Text>{date}</Text>
      <Text>{`no of entries ${entries.length}`}</Text> */}
    </View>
  )
}

const getEntriesForSelectedDateSpan = (allBulletEntries, entriesForThisDate) => {
  debugger
  if (allBulletEntries.length > 0 && entriesForThisDate.length > 0) {
    return entriesForThisDate.map((entryForThisDate) => {
      const matchedEntry = allBulletEntries.find((entry) => entry.id === entryForThisDate.entryId)
      if (matchedEntry) {
        return { ...matchedEntry, ...entryForThisDate }
      }
      return entryForThisDate
    })
  }
  console.tron.warn("no bullet entries or no daily entries")
  return []
}

// TODO: union off all days/weeks/months types
export interface ScrollMenuBtnProps {
  id: string
  date: Day["date"]
  entries: any // DailyEntries[] & BulletEntriesStore[] //TODO: This
  allEntries?: any[] // TODO
  onMenuBtnPress: () => void
}

/**
 *
 * * ScrollMenuBtn
 *
 **/

const SCROLL_MENU_BTN_STYLES = {
  width: 200,
  height: 300,
  margin: 10,
  backgroundColor: "green",
  borderWidth: 2,
  borderColor: "blue",
  borderRadius: 20,
  padding: spacing[3],
}

const ScrollMenuBtnDate = ({ date }) => {
  console.tron.log("🚀 ~ file: home-screen.tsx ~ line 77 ~ ScrollMenuBtnDate ~ date", date)
  const day = moment(date).format("dddd")
  const dateText = moment().format("Do MMMM YYYY")
  return (
    <View>
      <Text preset="header">{day}</Text>
      <Text>{dateText}</Text>
    </View>
  )
}

const ScrollMenuBtn = (props: ScrollMenuBtnProps) => {
  const { id, date, entries, allEntries, onMenuBtnPress } = props

  const entriesForThisDateSpan = getEntriesForSelectedDateSpan(allEntries, entries) // TODO: usememo
  console.tron.log(
    "🚀 ~ file: home-screen.tsx ~ line 78 ~ ScrollMenuBtn ~ entriesForThisDateSpan",
    entriesForThisDateSpan,
  )

  // TODO: Nice date header
  // TODO: Previews/Progress indicators for all 4 status:    todo, done, migrated, notes, inspirationalIdeas  -- add DONE
  // TODO: Remaining items move to backlog/monthly at midnight, user should be notified of impending auto-migrate
  // TODO: Highlight current day with <TODAY> badge/pill on top

  return (
    <TouchableOpacity onPress={onMenuBtnPress} style={SCROLL_MENU_BTN_STYLES}>
      <ScrollMenuBtnDate date={date} />
      <ScrollMenuPreviewContainer entries={entriesForThisDateSpan} />
      {/* <Text>{date}</Text> */}
      {/* <Text>{`entries merged ${JSON.stringify(entriesForThisDateSpan, null, 2)}`}</Text> */}
    </TouchableOpacity>
  )
  // }
  // return <Text>No entries</Text>
}

/**
 *
 * * ScrollMenuList
 *
 **/

const HORIZONTAL_SCROLL_MENU_STYLES = { width: "100%", backgroundColor: "sienna" }

export interface HorizontalScrollMenuProps {
  data: Array<object>
  allBulletEntries?: BulletEntriesStore[]
  navigateToScreen: (id: string) => void
}

export const HorizontalScrollMenu = (props: HorizontalScrollMenuProps) => {
  const { allBulletEntries } = props

  const renderItem = ({ item }) => {
    return (
      <ScrollMenuBtn
        onMenuBtnPress={() => {
          debugger
          props.navigateToScreen(item.id)
        }}
        id={item.id}
        date={item.date}
        entries={item.dailyEntries}
        allEntries={allBulletEntries}
      />
    )
  }

  //  if (props.data.length > 0) {
  return (
    <FlatList
      data={[...props.data]}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal={true}
      style={HORIZONTAL_SCROLL_MENU_STYLES}
      contentContainerStyle={{}}
      extraData={allBulletEntries}
    />
  )
  // }
  // return <></>
}

/**
 *
 * * Home Screen
 *
 **/

// TODO: Create function to merge dailyEntries with their respective entry data from bulletEntries

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "homeScreen">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

    const { bulletEntriesStore, allDaysStore } = useStores()
    const { bulletEntries } = bulletEntriesStore
    const { allDays } = allDaysStore

    // Get all days on mount
    useEffect(() => {
      async function fetchData() {
        await allDaysStore.getAllDays()
        await bulletEntriesStore.getBulletEntries()
      }

      fetchData()
    }, [])

    // useEffect(() => {
    //   console.tron.log("🚀 ~ file: home-screen.tsx ~ line 77 ~ allDays", allDays)
    // }, [allDays])

    useEffect(() => {
      console.tron.log("🚀 ~ file: home-screen.tsx ~ line 155 ~ bulletEntries", bulletEntries)
    }, [bulletEntries])

    const navigateToDay = (id) => {
      navigation.navigate("dailyList", { id })
    }

    return (
      <ScrollView>
        <View>
          <Text>Daily Entries</Text>

          <HorizontalScrollMenu
            data={[...allDays]}
            allBulletEntries={bulletEntries}
            navigateToScreen={navigateToDay}
          />
        </View>
      </ScrollView>
    )
  },
)

/**
 *
 * * Utils
 *
 */

/**
 *
 * * Psuedo
 * *  When we create a new day we assign it a unique id as a random guid
 * *  We also assign it the date selected in this format yymmdd (with moment)
 * *  This will be the add day button
 *
 */
