import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { EmployeeList } from '.'
import { UserT } from '../../context/types'
import customRender from '../../tests/index'

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
const account = {
  avatarUrl: 'https://i.pravatar.cc/150?img=68',
  id: 'p0',
  name: 'John Smith',
}
describe('Give Feedback', () => {
  it('Should display all users', () => {
    customRender(
      <BrowserRouter>
        <EmployeeList />
      </BrowserRouter>,
      {
        accountValue: null,
        userValue: users,
        questionValue: null,
        feedbackValue: [],
      },
    )
    expect(screen.getByText('Martha Liberty')).toBeInTheDocument()
    expect(screen.queryByText('View Submission')).not.toBeInTheDocument()
    customRender(
      <BrowserRouter>
        <EmployeeList />
      </BrowserRouter>,
      {
        accountValue: account,
        userValue: users,
        questionValue: null,
        feedbackValue: feedback,
      },
    )
    expect(screen.getByText('View Submission')).toBeInTheDocument()
  })
  it('Should display all users view submission button', () => {
    customRender(
      <BrowserRouter>
        <EmployeeList />
      </BrowserRouter>,
      {
        accountValue: account,
        userValue: users,
        questionValue: null,
        feedbackValue: feedback,
      },
    )
    expect(screen.getByText('View Submission')).toBeInTheDocument()
  })
})
