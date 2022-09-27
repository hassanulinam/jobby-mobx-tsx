import AuthStore from "./AuthStore";
import JobDetailStore from "./JobDetailStore";
import JobStore from "./JobStore";

const authStore = new AuthStore();

const jobStore = new JobStore();

const jobDetailStore = new JobDetailStore();

export { authStore, jobStore, jobDetailStore };
