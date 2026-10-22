import type { JSX as ReactJSX } from "react";

/* React 19 no longer exposes a global JSX namespace; keep `JSX.Element` annotations working. */
declare global {
    namespace JSX {
        type Element = ReactJSX.Element;
        type ElementClass = ReactJSX.ElementClass;
        type IntrinsicElements = ReactJSX.IntrinsicElements;
    }
}
