import type {DependencyList} from 'react';

const depsAreSame = (oldDeps: DependencyList, deps: DependencyList) => {
  if (oldDeps === deps) return true;
  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], deps[i])) return false;
  }
  return true;
};

export default depsAreSame;