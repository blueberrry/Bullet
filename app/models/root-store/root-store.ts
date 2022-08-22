import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { BulletEntriesStoreModel } from "../bullet-entries-store/bullet-entries-store"
import { AllDaysStoreModel } from "../all-days-store/all-days-store"
/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  bulletEntriesStore: types.optional(BulletEntriesStoreModel, {} as any),
  allDaysStore: types.optional(AllDaysStoreModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
