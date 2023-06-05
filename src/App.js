import "./App.css";
import { Route, Routes} from "react-router-dom";
import QuizApp from "./layouts/QuizApp";
import QuestionScreen from "./layouts/QuestionScreen";
import ResultScreen from "./layouts/ResultScreen";

function App() {
  return (
    <div className="container__start">
      <Routes>
        <Route path="/" element={<QuizApp/>}/>
        <Route path="/question" element={<QuestionScreen/>}/>
        <Route path="/result" element={<ResultScreen/>}/>
      </Routes>
    </div>
  );
}

export default App;
