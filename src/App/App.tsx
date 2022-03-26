import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Components from '../views/Components'
import ErrorHandler from './ErrorHandler'
import GiveFeedback from '../views/GiveFeedback'
import Home from '../views/Home'
import NotFound from '../views/NotFound'
import ReviewFeedback from '../views/ReviewFeedback'
import PrivateRoute from '../components/Routing/PrivateRoute'
import FeedBackQuestions from '../views/FeedbackQuestion'
import Successful from '../views/Successful'
import TeamFeedback from '../views/TeamFeedback'
import { useAppDispatch } from '../store/hooks'
import { getUsers } from '../store/UsersSlice/index'
import { getQuestions } from '../store/QuestionsSlice/index'

const App = () => {
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(getUsers())
    dispatch(getQuestions())
  }, [dispatch])

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
