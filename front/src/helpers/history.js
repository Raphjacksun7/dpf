// import shallowCompare from "react-addons-shallow-compare";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

// const originalHistoryPush = history.push;

// history.push = function (path, state = {}) {
//   if (!this.location) {
//     originalHistoryPush(path, state);
//     return;
//   }

//   const oldPath =
//     this.location.pathname + this.location.search + this.location.hash;
//   if (oldPath !== path || !shallowCompare(state, this.location.state)) {
//     originalHistoryPush(path, state);
//   } else {
//     this.replace(path, state);
//   }
// };
