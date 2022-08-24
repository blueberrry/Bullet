import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import moment from "moment"
import React, { FC } from "react"
import { ScrollView, View } from "react-native"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators/app-navigator"
import { Text } from "../../components/text/text"
import { Button } from "../../components/button/button"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollMenu } from "../../components/scroll-menu/scroll-menu"
import { getHighestDate } from "../../utils/getHighestDate"

/**
 *
 * * Home Screen
 *
 **/

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "homeScreen">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

    const { bulletEntriesStore, allDaysStore } = useStores()
    const { bulletEntries } = bulletEntriesStore
    const { allDays } = allDaysStore

    // TODO: Every time this screen mounts we're going to wipe out new data with hardcoded data just the same as the api call
    // useEffect(() => {
    //   function fetchTempInitialData() {
    //     allDaysStore.getInitialAllDaysForTesting()
    //     bulletEntriesStore.getInitialBulletEntriesForTesting()
    //   }

    //   fetchTempInitialData()
    // }, [])

    const fetchTempInitialData = () => {
      allDaysStore.getInitialAllDaysForTesting()
      bulletEntriesStore.getInitialBulletEntriesForTesting()
    }

    const navigateToDay = (id) => {
      navigation.navigate("dailyList", { id })
    }

    // TODO: Migrate days entries to backlog if date is older than today
    //       or it could be greyed out with user prompt to migrate days manually/migrate all to backlog/monthly
    //       any dates older than yesterday should auto migrate to backlog/monthlies

    // TODO: Data is not persisting in async storage - looks like it's overwritten when we fetch the dummy data

    // TODO: Add day btn should open menu with + day or + date

    // TODO: Sould this be an action in store?
    const addNextDay = () => {
      const highestDateString = getHighestDate(allDays)
      const nextDate = moment(highestDateString).add(1, "days").format("YYYYMMDD")

      const newDaysData = [
        ...allDays,
        {
          id: uuidv4(),
          date: nextDate, // increment after highest date in allDays
          dailyEntries: [
            // {
            //   entryId: "d3946066-b08a-4e02-b2e0-56ec737cbbf4", // currently no items with these ids in allBulletEntries
            //   dayPriorityRanking: null,
            //   migrated: false,
            // },
          ],
        },
      ]
      allDaysStore.saveAllDays(newDaysData)
    }

    const removeSpecificDay = (date) => {
      const newDaysData = allDays.filter((day) => day.date !== date)
      allDaysStore.saveAllDays(newDaysData)
    }

    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <Text>Daily Entries</Text>
            <ScrollMenu
              entries={[...allDays]}
              allBulletEntries={bulletEntries}
              navigateToScreen={navigateToDay}
              addDate={addNextDay}
              removeDate={removeSpecificDay}
            />
            <Button text="Get/reset initial testing state" onPress={fetchTempInitialData} />
            <Button text="Add next day" onPress={addNextDay} />
          </View>
          <View>
            <Text>Weeklies</Text>
            {/* <ScrollMenu
              entries={[...allDays]}
              allBulletEntries={bulletEntries}
              navigateToScreen={navigateToDay}
              addDate={addNextDay}
              removeDate={removeSpecificDay}
            />
            <Button text="Get/reset initial testing state" onPress={fetchTempInitialData} />
            <Button text="Add next day" onPress={addNextDay} /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
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
 * *  We also assign it the date selected in this format yyyymmdd (with moment)
 * *  This will be the add day button
 *
 */
