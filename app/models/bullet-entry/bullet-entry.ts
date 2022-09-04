import { getParent, hasParent, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Bullet Entry Model.
 */

// !important - actions can only define the object they belong to or any of their children

export const BulletEntryModel = types
  .model("BulletEntry")
  .props({
    id: types.identifier,
    status: types.string, // types.maybe(type) makes a type optional and nullable, types.string should be todo|completed|note|inspirationalIdeas|deleted
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
      const parent = getParent(self, 2)
      console.tron.log("🚀 ~ file: bullet-entry.ts ~ line 30 ~ .actions ~ parent", parent)
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
