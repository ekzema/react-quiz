import React, {Component} from "react"
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                answers: [
                    {
                        text: 'Черный',
                        id: 1
                    },
                    {
                        text: 'Синий',
                        id: 2
                    },
                    {
                        text: 'Красный',
                        id: 3
                    },
                    {
                        text: 'Зелёный',
                        id: 4
                    }
                ]
            },
            {
                id: 2,
                question: 'В каком году основале Санкт-Петербург?',
                rightAnswerId: 2,
                answers: [
                    {
                        text: '1700',
                        id: 1
                    },
                    {
                        text: '1702',
                        id: 2
                    },
                    {
                        text: '1703',
                        id: 3
                    },
                    {
                        text: '1803',
                        id: 4
                    }
                ]
            }
        ]
    }
    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
        if (question.rightAnswerId === answerId.id) {
            if (!results[answerId.id]) {
                results[answerId.id] = 'success'
            }

            this.setState({
                answerState: {[answerId.id]: 'success'},
                results
            })
            const timeout = window.setTimeout(() => {
                if (this.QuizFinished()) {
                    this.setState({isFinished: true})
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[answerId.id] = 'error'
            this.setState({
                answerState: {[answerId.id]: 'error'},
                results
            })
        }
    }
    QuizFinished () {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }
    render() {
        return(
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопрсы</h1>
                    {
                        this.state.isFinished
                        ? <FinishedQuiz
                            reuslt={this.state.results}
                            quiz={this.state.quiz}
                            />
                        : <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz[this.state.activeQuestion].answers.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                        />
                    }
                    </div>
            </div>
        )
    }
}

export default Quiz