import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Router, Routes } from 'react-router-dom'
import FeedBackQuestions from '.'
import customRender from '../../tests/index'
import { createMemoryHistory } from 'history'
import { QuestionT } from '../../store/QuestionsSlice'
import { UserT } from '../../store/UsersSlice'

const users = [
  {
    avatarUrl: 'https://i.pravatar.cc/150?img=68',
    id: 'p0',
    name: 'John Smith',
  },
  {
    avatarUrl: 'https://i.pravatar.cc/150?img=48',
    id: 'p1',
    name: 'Martha Liberty',
  },
  {
    avatarUrl: 'https://i.pravatar.cc/100?u=p2',
    id: 'p2',
    name: 'Persephone Woodley',
  },
  {
    avatarUrl: 'https://i.pravatar.cc/100?u=p3',
    id: 'p3',
    name: 'Gertrude Boyle',
  },
  {
    avatarUrl: 'https://i.pravatar.cc/150?img=53',
    id: 'p4',
    name: 'Bertram Patton',
  },
  {
    avatarUrl: 'https://i.pravatar.cc/100?u=p5',
    id: 'p5',
    name: 'Camron Devlin',
  },
  {
    avatarUrl: 'https://i.pravatar.cc/100?u=p6',
    id: 'p6',
    name: 'Jai Malone',
  },
  {
    avatarUrl: 'https://i.pravatar.cc/100?u=p7',
    id: 'p7',
    name: 'Ember Mcmillan',
  },
  {
    avatarUrl: 'https://i.pravatar.cc/100?u=p8',
    id: 'p8',
    name: 'Jeanette Hume',
  },
  {
    id: 'p9',
    name: 'Harold Hays',
  },
  {
    avatarUrl: 'https://i.pravatar.cc/100?u=p11',
    id: 'p11',
    name: 'Anna-Marie Orr',
  },
] as UserT[]
const feedback = [
  {
    from: 'p0',
    questions: {
      q1: 10,
      q2: 2,
      q3: 8,
      q4: 'sadasd',
      q5: 3,
      q6: 'asdasd',
      q7: 3,
      q8: 7,
      q9: 'asdasd',
    },
    to: 'p1',
  },
]
const questions = [
  {
    id: 'q1',
    type: 'scale',
    required: true,
    label: 'How much do you trust this person to deliver high quality work?',
  },
  {
    id: 'q2',
    type: 'multipleChoice',
    required: true,
    label: 'Is this person up to date with the latest accounting regulations?',
    options: [
      {
        value: 1,
        label:
          'Not fully. You should work on trying to stay more up to date with regulations',
      },
      {
        value: 2,
        label: 'Yes, you are reasonably up to date with new regulations.',
      },
      {
        value: 3,
        label:
          'Yes, you are the one I look up to when I need information about new regulations',
      },
    ],
  },
  {
    id: 'q3',
    type: 'scale',
    required: true,
    label:
      'How well does this person understand the technical domain of our product?',
  },
  {
    id: 'q4',
    type: 'text',
    required: false,
    label:
      'Have there been any situations where this person could have managed their emotions better? What happened?',
  },
  {
    id: 'q5',
    type: 'multipleChoice',
    required: true,
    label:
      'Does this person care about our users and treats customer support as a high priority?',
    options: [
      { value: 1, label: 'Not always - you should work on this aspect' },
      {
        value: 2,
        label:
          'Yes, you go out of our way to help our users and improve their experience',
      },
      {
        value: 3,
        label:
          'Yes, your understanding of our users and the empathy you demonstrate is second to none',
      },
    ],
  },
  {
    id: 'q6',
    type: 'text',
    required: true,
    label:
      'What would you like this person to work on the most during the next month, to enable their continued growth?',
  },
  {
    id: 'q7',
    type: 'multipleChoice',
    required: true,
    label: "How transparent and clear are this person's plans and work tasks?",
    options: [
      {
        value: 1,
        label:
          'I frequently not know what you are working on, please work with me to raise visibility',
      },
      {
        value: 2,
        label:
          'I almost always know what you are working on, but not always the details or next steps, only the outcomes you are after.',
      },
      {
        value: 3,
        label:
          'Your plans are clear and readily available to those around you, and I always know what the next step is.',
      },
    ],
  },
  {
    id: 'q8',
    type: 'scale',
    required: true,
    label:
      'How well does this person understand our business goals and roadmap?',
  },
  {
    id: 'q9',
    type: 'text',
    required: false,
    label: "Is there anything else you'd like to share with this person?",
  },
] as QuestionT[]

describe('Feedback Question', () => {
  it('Should Question and check if it goes to next when required Question is not filled', () => {
    const history = createMemoryHistory({
      initialEntries: ['/share-feedback/p1/questions'],
    })

    customRender(
      <MemoryRouter initialEntries={['/share-feedback/p1/questions']}>
        <Routes>
          <Route
            path="share-feedback/*"
            element={
              <Routes>
                <Route
                  path=":employeeId/questions"
                  element={<FeedBackQuestions />}
                />
              </Routes>
            }
          />
        </Routes>
      </MemoryRouter>,
      {
        accountValue: users[0],
        userValue: users,
        questionValue: questions,
        feedbackValue: [],
      },
    )
    expect(
      screen.getByText('share your feedback for Martha Liberty'),
    ).toBeInTheDocument()
    expect(screen.getByText('Previous')).toBeDisabled()
    expect(screen.getByText('Next')).not.toBeDisabled()
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Error')).toBeInTheDocument()
  })
})
