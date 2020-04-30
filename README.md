# react-pipviewer

**react-pipviewer** 零依赖实现自定义视频画中画

## Installation

```bash
# with NPM
npm install react-pipviewer --save-dev

# with Yarn
yarn add react-pipviewer
```

## Usage

```jsx
import pipviewer from "react-pipviewer";

const APP = () => {
  const videoRef = useRef(null);
  useEffect(() => {
    pipviewer({ ref: videoRef });
  }, []);
  return (
    <div>
      <video
        width="600"
        height="400"
        ref={videoRef}
        src="https://download.blender.org/durian/trailer/sintel_trailer-720p.mp4"
        poster="https://static.veer.com/veer/static/resources/keyword/2020-02-19/533ed30de651499da1c463bca44b6d60.jpg"
        controls
      ></video>
      <div style={{ height: "1000px" }}></div>
    </div>
  );
};
```

## APIs

pipviewer(Object)

|  属性   | 是否可选 | 默认值 |         备注         |
| :-----: | :------: | :----: | :------------------: |
|   ref   |    否    |        | 需要画中画 video ref |
| options |    是    |   {}   |      自定义属性      |

## TODO

- [ ] 如何优雅实现两个 video 之间属性互相继承？
