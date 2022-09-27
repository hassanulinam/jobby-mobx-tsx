import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import AuthStore from "../stores/AuthStore";
import JobDetailStore from "../stores/JobDetailStore";
import JobStore from "../stores/JobStore";

export interface UserStoreType {
  authStore: AuthStore;
  jobStore: JobStore;
  jobDetailStore: JobDetailStore;
}

export const useStores = (): UserStoreType => {
  const stores = useContext(MobXProviderContext);
  const { authStore, jobStore, jobDetailStore } = stores;
  return { authStore, jobStore, jobDetailStore };
};
