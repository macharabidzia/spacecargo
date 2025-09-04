import { create } from "zustand";
import { CategorySlice, createCategorySlice } from "./slices/categorySlice";
import { AuthSlice, createAuthSlice } from "./slices/auth.slice";
import {
  CourierOrderSlice,
  createCourierOrderSlice,
} from "./slices/courier-order.slice";
import { createGendersSlice, GenderSlice } from "./slices/genders.slice";
import { createUserSlice, UserSlice } from "./slices/user.slice";
import {
  createDeclarationSlice,
  DeclarationCreateSlice,
} from "./slices/declaration.slice";
import { CalculatorSlice, createCalculatorSlice } from "./slices/calculator.slice";
import { createSingleNewsSlice, SingleNewsSlice } from "./slices/singleNews.slice";
import { createLoaderSlice, LoaderSlice } from "./slices/loader.slice";
export interface GlobalDataState
  extends CategorySlice,
  AuthSlice,
  DeclarationCreateSlice,
  CourierOrderSlice,
  GenderSlice,
  UserSlice, CalculatorSlice, SingleNewsSlice, LoaderSlice {
}

export const useGlobalDataStore = create<GlobalDataState>(
  (set, get, store) => ({
    ...createCategorySlice(set, get, store),
    ...createAuthSlice(set, get, store),
    ...createDeclarationSlice(set, get, store),
    ...createCourierOrderSlice(set, get, store),
    ...createGendersSlice(set, get, store),
    ...createUserSlice(set, get, store),
    ...createLoaderSlice(set, get, store),
    ...createCalculatorSlice(set, get, store),
    ...createSingleNewsSlice(set, get, store)
  })
);
