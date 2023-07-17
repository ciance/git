import { useCallback, useMemo, useReducer, useRef } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
//import TestReactPlayer from "./TestReactPlayer";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};
const App = () => {
  //const [data, setData] = useState([]);

  const [data, dispatchTest] = useReducer(reducer, []);

  const dataId = useRef(0);

  const onCreate = useCallback((author, content, emotion) => {
    dispatchTest({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatchTest({
      type: "REMOVE",
      targetId,
    });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatchTest({ type: "EDIT", targetId, newContent });
  }, []);

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
