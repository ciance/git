import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
//import TestReactPlayer from "./TestReactPlayer";

const App = () => {
  //const [isWindow, setIsWindow] = useState(false);

  // useEffect(() => {
  //   setIsWindow(true);
  // }, []);

  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = useCallback(
    (author, content, emotion) => {
      const created_date = new Date().getTime();
      const newItem = {
        author,
        content,
        emotion,
        created_date,
        id: dataId.current,
      };
      dataId.current += 1;
      setData([newItem, ...data]);
    },
    [data]
  );

  const onDelete = (targetId) => {
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div height={"700px"}>
      <DiaryEditor onCreate={onCreate} />
      <div> 전체 일기 : {data.length} </div>
      <div> 기분 좋은 일기 개수 : {goodCount}</div>
      <div> 기분 나쁜 일기 개수 : {badCount} </div>
      <div> 기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onDelete={onDelete} diaryList={data} onEdit={onEdit} />
      {/* {isWindow && (
        <div height={"700px"}>
          <TestReactPlayer url="https://www.youtube.com/watch?v=AJsvGtGgI6M" />
        </div>
      )} */}
    </div>
  );
};

export default App;
