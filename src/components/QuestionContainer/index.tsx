import React from 'react'
import { QuestionT } from '../../context/QuestionProvider'
import { TextChoice } from '../Text/index'
import { MultiChoice } from '../Multichoice/index'
import { Scale } from '../Scale/index'
import { IAnswer } from '../../views/FeedbackQuestion'

export interface IQuestionContainer {
  question: QuestionT
  update: (value: string | number) => void
  answer: IAnswer
}

export const QuestionContainer = ({
  question,
  update,
  answer,
}: IQuestionContainer) => {
  switch (question.type) {
    case 'text':
      return <TextChoice question={question} update={update} answer={answer} />
    case 'multipleChoice':
      return <MultiChoice question={question} update={update} answer={answer} />
    case 'scale':
      return <Scale question={question} update={update} answer={answer} />
    default:
      return <div>Question Coming Soon</div>
  }
}
