# Experimental Naive Lenses

A naive implementation of functional lenses for educational purposes.

These experiments use https://github.com/kutyel/optics.js created by Flavio Corpa. The repo readme includes a very good overview and some accompanying videos.

I'm using https://github.com/apache/drill/blob/master/exec/java-exec/src/test/resources/donuts.json as a sample data set.

## Notes on Lenses

### WTF is a Lens
A Lens is a function which facilitates working with deeply nested data. It is generally part of a broader **Optics** package. These are functional design patterns originalting in Scala and Haskell. They can be found in most functional libraries such as Ramda or monocole.ts (which is part of the fp-ts ecosystem).

Like everything else in FP lenses can be **composed** with other lenses to effectively drill into even more complex data structures.

There are two main parts to a lens optic:
* The **Lens** itself which is a kind of **optic** that allows us to "focus" on a specific part (often called the *subpart*) of a deeply nested data object
* The **Operation** which we want to conduct on that particular Lens


### Lens Operations
Lenses have only three possible operations.
* View (Get) - get the value of a lense
* Set - set the value of a lense
* Over (Modify) - map over contents applying a function


---

# Build Scripts

- `yarn dev` to go into development mode with live reload
- `yarn clean` to clean the `/dist` directory
- `yarn prod` to create a distributable bundle in `/dist` (terses and removes logs)

# The Stack

- TypeScript
- Rollup
