'use client'

import React, { useEffect, useRef, useState } from "react";

type IEventDataFromIframe = {
  type: 'ready',
  data: null
} | {
  type: 'confirm',
  data: string
}

type IDataToIframe = {
  type: 'count',
  data: number
} | {
  type: 'config',
  data: {
    name: string;
    age: number
  }
}


const SRC = 'http://localhost:3011'

const IFrameComponent: React.FC = () => {

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const postMessageRef = useRef<(data: IDataToIframe) => void>()

  const [count, setCount] = useState<number>(0)
  const [input, setInput] = useState<string>()

  postMessageRef.current = (data) => {
    iframeRef.current?.contentWindow?.postMessage(data, '*')
  }


  useEffect(() => {
    const handler: (event: MessageEvent<IEventDataFromIframe>) => void = (event) => {
      if(!iframeRef) {
        return
      }
      if(event.source !== iframeRef.current?.contentWindow) {
        return 
      }
      const {type, data} = event.data
      switch(type) {
        case 'ready': {
          // ready后可以向iframe中传递配置数据
          console.log('iframe已经ready, 可以向iframe传入message')
          // ready后传入iframe的数据能被接受,通常传入iframe的初始化数据
          postMessageRef.current?.({
            type: 'config',
            data: {
              name: 'demo',
              age: 18
            }
          })
          return
        };
        case 'confirm': {
          console.log('接收到iframe发出的confirm数据', data)
          setInput(data)
        }
      }
    }
    // 绑定事件
    window.addEventListener('message', handler, false)
    return () => {
      window.removeEventListener('message', handler)
    }
  }, [])

  const handleButtonClick = (v: number) => {
    setCount(v)
    postMessageRef?.current?.({
      type: 'count',
      data: v
    })
  }

  return (
    <div>
      <div>count: {count}</div>
      <button onClick={() => handleButtonClick(count + 1)}>点击 + 1</button>
      <div>接收到iframe的数据: {input}</div>
      <iframe
        src={SRC}
        style={{ width: "50vw", height: "90vh" }}
        ref={iframeRef}
      />
    </div>
  );
};
export default IFrameComponent;
