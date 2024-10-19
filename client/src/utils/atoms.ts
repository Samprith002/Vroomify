import { Material, Model } from '@/types'
import { atom } from 'jotai'
import { type KeyedMutator } from 'swr'

export const mutator = atom<KeyedMutator<Material[]> | null>(null);
export const modelMutate = atom<KeyedMutator<Model[]> | null>(null);