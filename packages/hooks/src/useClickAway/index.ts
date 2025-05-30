import { read } from 'fs';
import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import getDocumentOrShadow from '../utils/getDocumentOrShadow';
import useEffectWithTarget from '../utils/useEffectWithTarget';

type DocumentEventKey = keyof DocumentEventMap;

export default function useClickAway<T extends Event = Event>(
    onClickAway: (event: T) => void,
    target: BasicTarget | BasicTarget[],
    eventName: DocumentEventKey | DocumentEventKey[] = 'click',
) {
    const onClickAwayRef = useLatest(onClickAway);

    useEffectWithTarget(
        () => {
            const handler = (event: T) => {
                const targets = Array.isArray(target) ? target : [target];
                if (targets.some((item) => {
                    const targetElement = getTargetElement(item);
                    // @ts-ignore
                    return !targetElement || targetElement.contains(event.target);
                })) {
                    return;
                }
                onClickAwayRef.current(event);
            }

            const documentOrShadow = getDocumentOrShadow(target);
            const eventNames = Array.isArray(eventName) ? eventName : [eventName];
            eventNames.forEach((eventName) => {
                documentOrShadow.addEventListener(eventName, handler);
            })

            return () => {
                eventNames.forEach((event) => {
                    documentOrShadow.removeEventListener(event, handler);
                })
            }
        },
        Array.isArray(eventName) ? eventName : [eventName],
        target
    );
}