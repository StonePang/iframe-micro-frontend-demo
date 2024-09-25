'use client'

import { useEffect, useRef, useState } from "react";

type IDataToMainApp = {
  type: 'ready',
  data: null
} | {
  type: 'confirm',
  data: string
}

type IEventDataFromMainApp = {
  type: 'count',
  data: number
} | {
  type: 'config',
  data: {
    name: string;
    age: number
  }
}


const Home: React.FC = () => {

  const postMessageRef = useRef<(data: IDataToMainApp) => void>()

  const [count, setCount] = useState<number>()
  const [config, setConfig] = useState<{name: string; age: number}>()

  postMessageRef.current = (data: IDataToMainApp) => {
    window.parent?.postMessage?.(data, '*')
  }

  useEffect(() => {
    // 页面加载完成后，通知外部，便于外部postMessage
    postMessageRef.current?.({
      type: 'ready',
      data: null
    });

    const handler: (event: MessageEvent<IEventDataFromMainApp>) => void = (event) => {
      switch (event.data.type) {
        case 'count': {
          console.log('接收到来自主应用的count数据', event.data.data)
          setCount(event.data.data)
          return 
        }
        case 'config': {
          console.log('接收到来自主应用的config数据', event.data.data)
          setConfig(event.data.data)
          return
        }
        default: 
          return
      }
    };
    window.addEventListener('message', handler, false);
    return () => {
      window.removeEventListener('message', handler);
    };
  }, []);

  const handleInputChange = (v: string) => {
    postMessageRef.current?.({
      type: 'confirm',
      data: v
    })
  }

  return (
    <div>
      <div>子应用 child-app-next 的demo页面</div>
      <div>接收到的主应用的config数据：name - {config?.name || ''} ; age - {config?.age || ''}</div>
      <div>接收到的主应用的count数据：{count}</div>
      <input onChange={(e) => handleInputChange(e.target.value)}></input>
    </div>
  );
};
export default Home;

