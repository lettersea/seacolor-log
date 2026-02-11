import $ from "./core/basic-styles.js";
import { isColorEnabled } from "./core/utils.js";


const enabled = isColorEnabled();

function pipe(fns) {
  return (value) => fns.reduce((acc, fnName) => $[fnName](acc), value);
}

/**
 * seacolor.red
 * seacolor.red.underline
 * red
 */
function init(styles = new Set()) {

  const seacolor = new Proxy(() => {}, {
    get(target, property, receiver) {
      if(property === "enabled") return enabled;
      if(property in $) {
        const proxy = init(new Set(styles).add(property));
        return proxy;
      }
      return undefined;
    },
    apply(target, thisArg, args) {
      // const styles = cacheStyles.get(thisArg);
      if(!styles.size) throw new Error("Invalid styles");
      const text = args[0];
      if(typeof text !== "string") throw new Error("Invalid text");
      return pipe(styles.values())(text);
    }
  });

  return seacolor;
}

const seacolor = init();

export default seacolor;