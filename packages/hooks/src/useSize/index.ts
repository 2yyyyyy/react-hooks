import ResizeObserver from 'resize-observer-polyfill';
import useRafState from '../useRafState';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useIsomorphicLayoutEffectWithTarget from '../utils/useIsomorphicLayoutEffectWithTarget';

type Size = { width: number; height: number };

function useSize(target: BasicTarget): Size | undefined {
    const [state, setState] = useRafState<Size | undefined>(() => {
        const el = getTargetElement(target);
        //@ts-ignore
        return el ? { width: el.offsetWidth, height: el.offsetHeight } : undefined;
    });

    useIsomorphicLayoutEffectWithTarget(
        () => {
            const el = getTargetElement(target);

            if (!el) {
                return;
            }

            const resizeObserver = new ResizeObserver((entries) => {
                entries.forEach((entry) => {
                    const {clientWidth, clientHeight} = entry.target;
                    setState({ width: clientWidth, height: clientHeight });
                });
            });

            //@ts-ignore
            resizeObserver.observe(el);
            return () => {
                resizeObserver.disconnect();
            }
        },
        [],
        target)

        return state;
}

export default useSize;