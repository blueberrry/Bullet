import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Bullet Entry Model.
 */
export const BulletEntryModel = types.model("BulletEntry").props({
  id: types.identifier,
  status: types.maybe(types.string), // types.maybe(type) makes a type optional and nullable, types.string should be todo|completed|note|inspirationIdeas|deleted
  text: types.maybe(types.string),
  dateCreated: types.maybe(types.number), // Is this the correct type for timestamp?
})

export interface BulletEntry extends Instance<typeof BulletEntryModel> {}
export interface BulletEntrySnapshotOut extends SnapshotOut<typeof BulletEntryModel> {}
export interface BulletEntrySnapshotIn extends SnapshotIn<typeof BulletEntryModel> {}
export const createBulletEntryDefaultModel = () => types.optional(BulletEntryModel, {})
