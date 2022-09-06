import { getParent, hasParent, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Bullet Entry Model.
 */

// !important - actions can only define the object they belong to or any of their children

export const BulletEntryModel = types
  .model("BulletEntry")
  .props({
    id: types.identifier,
    // status: types.union(
    //   types.literal("todo"),
    //   types.literal("done"),
    //   types.literal("note"),
    //   types.literal("inspirationalIdeas"),
    // ),
    status: types.enumeration("status", ["todo", "done", "note", "inspirationalIdeas"]),
    text: types.optional(types.string, ""),
    dateCreated: types.optional(types.number, Date.now()), // Is this the correct type for timestamp?
  })
  .actions((self) => ({
    changeStatus: (newStatus) => {
      // TODO: Status types
      self.status = newStatus
    },
    changeText: (newText) => {
      // TODO: Status types
      // could do if (id === props.id)
      self.text = newText
    },
    remove: () => {
      // TODO: Add to test
      // delegate to owner of wishlist item since we are changing the collection itself
      if (hasParent(self)) {
        // @ts-ignore
        getParent(self, 2).removeBulletEntry(self) // TODO: TS not infering properties on parent?
      }
    },
  }))

export interface BulletEntry extends Instance<typeof BulletEntryModel> {}
export interface BulletEntrySnapshotOut extends SnapshotOut<typeof BulletEntryModel> {}
export interface BulletEntrySnapshotIn extends SnapshotIn<typeof BulletEntryModel> {}
export const createBulletEntryDefaultModel = () => types.optional(BulletEntryModel, {})
