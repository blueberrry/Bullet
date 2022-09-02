import { BulletEntryModel } from "./bullet-entry"

it("can create an instance of a model", () => {
  const bulletEntry = BulletEntryModel.create({
    id: "unique-id-string",
    status: "todo",
    text: "Bullet entry text",
    dateCreated: 1662047699328,
  })

  expect(bulletEntry.id).toBe("unique-id-string")
  expect(bulletEntry.status).toBe("todo")
  expect(bulletEntry.text).toBe("Bullet entry text")
  expect(bulletEntry.dateCreated).toBe(1662047699328)

  bulletEntry.changeStatus("done")
  expect(bulletEntry.status).toBe("done")

  bulletEntry.changeText("Wash the car")
  expect(bulletEntry.text).toBe("Wash the car")
})
