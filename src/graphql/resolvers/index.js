import todoResolvers from "./Todo";
import userResolvers from "./User";
import Subscription from "./Subscription";
import { merge } from "lodash";

export default merge(todoResolvers, userResolvers, Subscription);
