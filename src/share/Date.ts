import { format } from "date-fns";
export default {
  now: () => format(new Date(), "MM/dd/yyyy hh:mm:ss.s"),
};
