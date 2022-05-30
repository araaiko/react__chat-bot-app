import React, {useState, useEffect, useCallback} from "react";
import './assets/styles/style.css';
import { AnswersList, Chats } from "./components";
import FormDialog from "./components/Forms/FormDialog";
import { db } from "./firebase";
import { collection, getDocs } from 'firebase/firestore/lite';

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataset, setDataset] = useState({}); //外部データベースと接続する場合は{}にしておこう
  const [open, setOpen] = useState(false);

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: 'question'
    });

    setAnswers(nextDataset.answers);
    setCurrentId(nextQuestionId);
  }

  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === 'contact'):
        handleClickOpen();
        break;
      case (/^https:.*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank'; //別タブで開く
        a.click();
        break;
      default: //nextQuestionIdが上記case以外だった場合
        addChats({
          text: selectedAnswer,
          type: 'answer'
        }); 

        setTimeout(() => {
          displayNextQuestion(nextQuestionId, dataset[nextQuestionId]);
        }, 1000);
        break;
    }
  }

  const addChats = (chat) => {
    setChats(prevChats => {
      return [...prevChats, chat];
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  
  useEffect(() => {
    (async () => {
      const initDataset = {}
      const questionsCol = collection(db, 'questions');
      const questionsSnapshot = await getDocs(questionsCol);
      questionsSnapshot.forEach(doc => {
        const id = doc.id;
        const data = doc.data();
        initDataset[id] = data;
      });

      setDataset(initDataset);
      displayNextQuestion(currentId, initDataset[currentId]);
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const scrollArea = document.querySelector('#js-scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });

  return (
    <section className="c-section">
      <div className="c-box">
        <Chats chats={chats} />
        <AnswersList answers={answers} select={selectAnswer} />
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>      
  )
  
}

export default App;