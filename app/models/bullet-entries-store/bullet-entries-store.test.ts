import { reaction } from "mobx"
import { getSnapshot, onPatch, onSnapshot } from "mobx-state-tree"
import { BulletEntriesStoreModel } from "./bullet-entries-store"

it("can create a bullet entries list", () => {
  const bulletEntriesList = BulletEntriesStoreModel.create({
    bulletEntries: [
      {
        id: "unique-id-string",
        status: "todo",
        text: "Bullet entry text",
        dateCreated: 1662047699328,
      },
    ],
  })

  expect(bulletEntriesList.bulletEntries.length).toBe(1)
  expect(bulletEntriesList.bulletEntries[0].id).toBe("unique-id-string")
  expect(bulletEntriesList.bulletEntries[0].status).toBe("todo")
  expect(bulletEntriesList.bulletEntries[0].text).toBe("Bullet entry text")
  expect(bulletEntriesList.bulletEntries[0].dateCreated).toBe(1662047699328)
})

it("can add new items", () => {
  const bulletEntriesList = BulletEntriesStoreModel.create()
  // Already defined in data model so we don't need to do BulletEntry.create()
  // mobxstatetree will create the model for us
  // Pass plain JSON invoke actions on the model instance

  const states = []

  onSnapshot(bulletEntriesList, (snapshot) => {
    states.push(snapshot)
  })

  bulletEntriesList.addBulletEntry({
    id: "unique-id-string-2",
    status: "inspirationalIdeas",
    text: "Build a plant wall",
    dateCreated: 123456,
  })

  expect(bulletEntriesList.bulletEntries.length).toBe(1)
  expect(bulletEntriesList.bulletEntries[0].id).toBe("unique-id-string-2")
  expect(bulletEntriesList.bulletEntries[0].status).toBe("inspirationalIdeas")
  expect(bulletEntriesList.bulletEntries[0].text).toBe("Build a plant wall")

  bulletEntriesList.bulletEntries[0].changeStatus("note")
  expect(bulletEntriesList.bulletEntries[0].status).toBe("note")

  // getSnapeshot is the inverserse process of what create does

  // expect(getSnapshot(bulletEntriesList)).toEqual({
  //   bulletEntries: [
  //     {
  //       id: "unique-id-string-2",
  //       status: "note",
  //       text: "Build a plant wall",
  //       dateCreated: 123456,
  //     },
  //   ],
  // })

  expect(getSnapshot(bulletEntriesList)).toMatchSnapshot()

  expect(states).toMatchSnapshot()
})

it("can change the text", () => {
  const bulletEntriesList = BulletEntriesStoreModel.create()
  const patches = [] // when tree changes, what a mutation looks like
  // very powerful for communication with backend
  onPatch(bulletEntriesList, (patch) => {
    patches.push(patch)
  })

  bulletEntriesList.addBulletEntry({
    id: "unique-id-string-3",
    status: "inspirationalIdeas",
    text: "Build a plant wall",
    dateCreated: 123456,
  })

  bulletEntriesList.bulletEntries[0].changeText("Visit low light polution area")

  expect(patches).toMatchSnapshot()
})

it("can change the status", () => {
  const bulletEntriesList = BulletEntriesStoreModel.create()
  const patches = [] // when tree changes, what a mutation looks like
  // very powerful for communication with backend
  onPatch(bulletEntriesList, (patch) => {
    patches.push(patch)
  })

  bulletEntriesList.addBulletEntry({
    id: "unique-id-string-3",
    status: "inspirationalIdeas",
    text: "Build a plant wall",
    dateCreated: 123456,
  })

  bulletEntriesList.bulletEntries[0].changeStatus("todo")

  expect(patches).toMatchSnapshot()
})

it("can calculate the total bullet entries", () => {
  const bulletEntriesList = BulletEntriesStoreModel.create({
    bulletEntries: [
      {
        id: "unique-id-string-3",
        status: "todo",
        text: "Mow the lawn",
        dateCreated: 123456,
      },
      {
        id: "unique-id-string-4",
        status: "todo",
        text: "Play tenis",
        dateCreated: 123456,
      },
    ],
  })

  expect(bulletEntriesList.totalBulletEntries).toBe(2)

  let changed = 0

  reaction(
    () => bulletEntriesList.bulletEntries.length,
    () => changed++,
  )

  const snapshots = []

  expect(changed).toBe(0)

  onSnapshot(bulletEntriesList, (snapshot) => {
    snapshots.push(snapshot)
  })

  bulletEntriesList.addBulletEntry({
    id: "unique-id-string-5",
    status: "todo",
    text: "Research Jarrariums",
    dateCreated: 123456,
  })

  expect(changed).toBe(1)
})

// TODO: Stub date.now() global https://codewithhugo.com/mocking-the-current-date-in-jest-tests/
