/**

 * title.zh-CN: 传入 DOM 元素
 * desc.zh-CN: useSize 可以接收 dom，在 SSR 场景可以传入函数 `() => dom`
 */

import React from 'react';
import { useSize } from 'reactHooks';

export default () => {
  const size = useSize(document.querySelector('body'));
  return (
    <div>
      <p>Try to resize the preview window </p>
      <p>
        width: {size?.width}px, height: {size?.height}px
      </p>
    </div>
  );
};