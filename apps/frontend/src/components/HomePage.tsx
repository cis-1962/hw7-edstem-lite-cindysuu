import React, { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import '../homepage.css'
import QuestionItem from './QuestionItem';
import AnswerSection from './AnswerSection';
import Modal from './Modal';

const fetcher = url => axios.get(url, { withCredentials: true }).then(res => res.data);

const HomePage = () => {
    const { data: questions } = useSWR('http://localhost:8000/api/questions', fetcher, { refreshInterval: 2000 });
    const [loggedIn, setLoggedIn] = useState(true);
    const [username, setUsername] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newQuestionText, setNewQuestionText] = useState('');
    // const [questions, setQuestions] = useState([]);

    useEffect(() => {
        /* setQuestions([
            { id: 1, questionText: 'What is the capital of France?', author: 'John Doe', answer: 'Paris' },
            { id: 2, questionText: 'What is the capital of Italy?', author: 'Jane Doe', answer: 'Rome' },
            { id: 3, questionText: 'What is the capital of Spain?', author: 'John Smith', answer: 'Madrid' }
        ]); */
        setSelectedQuestion({ id: 1, questionText: 'is canada a country?', author: 'alice', answer: '' });
        setUsername('Alice');

        axios.get('http://localhost:8000/api/account/status', { withCredentials: true })
            .then(response => {
                if (response.data.loggedIn) {   // If axios returns status = logged in
                    setLoggedIn(true);
                    setUsername(response.data.username);
                } else {    // If not logged in
                    // setLoggedIn(false);
                }
            })
            .catch(error => alert(error));

        // axios.get('/api/questions')
        //     .then(response => {
        //         setQuestions(response.data);
        //     })
        //     .catch(error => alert(error));
    }, []);

    const handleQuestionSelect = (question) => {
        setSelectedQuestion(question);
    };

    const handleAddQuestionClick = () => {
        setIsModalOpen(true);
    };

    const handleQuestionSubmit = async (event) => {
        event.preventDefault(); 
        try {
            await axios.post('http://localhost:8000/api/questions/add', { questionText: newQuestionText }, { withCredentials: true });
            mutate('http://localhost:8000/api/questions'); // Re-fetch questions
            setIsModalOpen(false); 
            setNewQuestionText('');
        } catch (error) {
            console.error('Error submitting question:', error);
            alert('Failed to submit question.');
        }
    };

    const handleAnswerSubmit = async (questionId, answerText) => {
        try {
            await axios.post('http://localhost:8000/api/questions/answer', { _id: questionId, answer: answerText }, { withCredentials: true });
            mutate('http://localhost:8000/api/questions'); // Re-fetch questions to update the answers
        } catch (error) {
            console.error('Error submitting answer:', error);
            alert('Failed to submit answer.');
        }
    };

    // const handleQuestionSubmit = (event) => {
    //     event.preventDefault(); 
    //     const newQuestion = {
    //         id: questions.length + 1, 
    //         questionText: newQuestionText,
    //         author: username, 
    //         answer: '' 
    //     };
    //     setQuestions([...questions, newQuestion]); 
    //     setIsModalOpen(false); 
    //     setNewQuestionText('');
    // };

    // const handleAnswerSubmit = (questionId) => {
    //     // Placeholder for submitting answer logic
    //     axios.post('http://localhost:8000/api/questions/answer', { _id: questionId, answer: '' }, { withCredentials: true })
    //     console.log('Submitting answer for question id:', questionId);
    // };

    const handleLogout = () => {
        axios.post('http://localhost:8000/api/account/logout', {}, { withCredentials: true })
          .then(() => {
            setLoggedIn(false);
            setUsername('');
        })
        .catch(error => alert(error));
    };

    return (
        <div>
            <header className="header">
                <h1>EdStem Lite</h1>
            </header>
            <main className="main-content">
                <aside className="sidebar">
                    {loggedIn && (
                        <div>
                            <span>Hi, {username}!</span>
                            <button onClick={handleLogout}>Log out</button>
                            <button onClick={handleAddQuestionClick}>Add new Question +</button>
                        </div>
                    )}
                    
                    <span>Questions:</span>
                    {questions.map((question) => (
                        <QuestionItem key={question.id} question={question} onSelect={handleQuestionSelect} />
                    ))}
                </aside>
                <section className="main-section">
                    {selectedQuestion && (
                        <AnswerSection question={selectedQuestion} onAnswerSubmit={handleAnswerSubmit} />
                    )}
                </section>
            </main>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleQuestionSubmit}>
                    <h2>Add a New Question</h2>
                    <textarea
                        value={newQuestionText}
                        onChange={(e) => setNewQuestionText(e.target.value)}
                        placeholder="Enter your question here"
                        required
                    />
                    <button type="submit">Submit Question</button>
                </form>
            </Modal>
        </div>

        // <div>
        //   {loggedIn ? (
        //     <div>
        //       {/* <h2>Logged in Page</h2> */}
        //       <p>Welcome, {username}</p>
        //       {/* <button onClick={handleLogout}>Log Out</button> */}
        //       {/* Add Question Button and Modal Component Here */}
        //     </div>
        //   ) : (
        //     <div>
        //       {/* <h2>Not Logged in Page</h2> */}
        //       <h2>Please log in <a href="/login">here.</a></h2>
        //     </div>
        //   )}
        //   {questions.map((question) => (
        //     <div key={question.id}>
        //         <h3>{question.questionText}</h3>
        //         <p>Author: {question.author}</p>
        //         <p>Answer: {question.answer}</p>
        //         {/* Answer Submission Form Placeholder Here */}
        //     </div>
        //   ))}
        // </div>
    );
}

export default HomePage;



