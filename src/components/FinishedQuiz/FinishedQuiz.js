import React from "react"
import classes from './FinishedQuiz.css'

const FinishedQuiz = props => {
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {console.log(props.quiz, '---------------')}
                {props.quiz.map((quizItem, index) => {
                    console.log(quizItem.id, 'quizItem.id')
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]
                    return (
                        <ul>
                            <li key={index}>
                                <strong>{index + 1}</strong>. &nbsp;
                                {quizItem.question}
                                <i className={cls.join(' ')} />
                            </li>
                        </ul>
                    )
                })}

            </ul>
            <p>Правильно 4 из 10</p>
            <div>
                <button>Повторить</button>
            </div>
        </div>
    )
}

export default FinishedQuiz