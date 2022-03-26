import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DispatchUserContext } from '../context/UserProvider'
import { DispatchQuestionContext } from '../context/QuestionProvider'
import Components from '../views/Components'
import ErrorHandler from './ErrorHandler'
import GiveFeedback from '../views/GiveFeedback'
import Home from '../views/Home'
import http from '../common/http'
import NotFound from '../views/NotFound'
import ReviewFeedback from '../views/ReviewFeedback'
import PrivateRoute from '../components/Routing/PrivateRoute'
import FeedBackQuestions from '../views/FeedbackQuestion'
import Successful from '../views/Successful'
import TeamFeedback from '../views/TeamFeedback'

const App = () => {
  const userDispatch = React.useContext(DispatchUserContext)
  const questionDispatch = React.useContext(DispatchQuestionContext)

  React.useEffect(() => {
    Promise.all([http.get('questions'), http.get('people')]).then(
      ([questions, people]) => {
        userDispatch({
          action: 'set',
          payload: people,
        })

        questionDispatch({
          action: 'set',
          payload: questions,
        })
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BrowserRouter>
      <ErrorHandler>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/my-feedback"
            element={
              <PrivateRoute>
                <ReviewFeedback />
              </PrivateRoute>
            }
          />
          <Route
            path="/team-feedback"
            element={
              <PrivateRoute>
                <TeamFeedback />
              </PrivateRoute>
            }
          />
          <Route
            path="/share-feedback"
            element={
              <PrivateRoute>
                <GiveFeedback />
              </PrivateRoute>
            }
          />
          <Route
            path="/share-feedback/:employeeId/questions"
            element={
              <PrivateRoute>
                <FeedBackQuestions />
              </PrivateRoute>
            }
          />
          <Route
            path="/share-feedback/successful"
            element={
              <PrivateRoute>
                <Successful />
              </PrivateRoute>
            }
          />
          <Route
            path="/components"
            element={
              <PrivateRoute>
                <Components />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </ErrorHandler>
    </BrowserRouter>
  )
}

export default App
