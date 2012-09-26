# Lost

A system for locating things by their name (and for binding things to names).

## Why?

While JS runtimes already have a name system - variables - they suffer from a number of limitations:

- Accessing a undefined property of an undefined name results in a ReferenceError
- Calling an undefined function results in a TypeError
- Scope rules are language-based, which is both a benefit and a disadvantage (can't have multiple items with the same name in global scope)

## API

`.set(name, object, [scope])`: sets a name to a value (in a optional scope)

`.remove(name, object, [scope])`: removes a name from (optionally from a specific scope)

`.get(name, [scope])`: returns undefined or the value (optionally from a specific scope)

`.resolver(scope)`: returns a resolver with the same API, using the `scope` parameter as the default scope

`.scope`: the object from which lookups are performed
