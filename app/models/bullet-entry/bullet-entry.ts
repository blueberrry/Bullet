import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Bullet Entry Model.
 */
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
      debugger
      self.status = newStatus
    },
    changeText: (newText) => {
      // TODO: Status types
      // could do if (id === props.id)
      self.text = newText
    },
  }))

export interface BulletEntry extends Instance<typeof BulletEntryModel> {}
export interface BulletEntrySnapshotOut extends SnapshotOut<typeof BulletEntryModel> {}
export interface BulletEntrySnapshotIn extends SnapshotIn<typeof BulletEntryModel> {}
export const createBulletEntryDefaultModel = () => types.optional(BulletEntryModel, {})
