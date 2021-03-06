import React, { useEffect } from 'react'
import AuthContextProvider from './contexts/AuthContext'
import UserContextProvider from './contexts/UserContext'
import UsersContextProvider from './contexts/UsersContext'
import { Switch, Route } from 'react-router-dom'
import { LandingPage } from 'components/LandingPage/LandingPage'
import LogInPage from 'components/LogIn'
import SignUpPage from 'components/SignUp/SignUp'
import CreateProfilePage from 'components/SignUp/CreateProfile'
import ApprovedClientsPage from 'components/ApprovedClients'
import ConversationsPage from 'components/Conversations'
import ClientDetailPage from 'components/ClientDetails'
import OnboardingClientsPage from 'components/OnboardingClients'
import EditProfileAdminPage from 'components/EditProfileAdmin'
import EditProfileClientPage from 'components/EditProfileClient'
import { theme, MuiThemeProvider } from 'uiKit/Theme'
import UIKit from 'components/UIKit'
import NavBar from 'uiKit/navbars/AppNav'
import { Footer } from 'uiKit/Footer'
import SubmitDocuments from './components/DocumentsUpload/SubmitDocuments'
import ProtectedRoute from './ProtectedRoute'
import ProtectedRouteAdmin from './ProtectedRouteAdmin'

const App = () => {
  return (
    // wrapping components in custom MuiThemeProvider to match Hatchstone style guide
    <MuiThemeProvider theme={theme}>
      <AuthContextProvider>
        <UserContextProvider>
          <NavBar />
          <Switch>
            <Route path="/ui-kit">
              <UIKit />
            </Route>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/log-in" component={LogInPage} />
            <Route path="/sign-up" component={SignUpPage} />
            <UsersContextProvider>
              <ProtectedRoute
                path="/submit-documents/:id"
                component={SubmitDocuments}
              />
              <ProtectedRouteAdmin
                path="/edit-profile-admin/:id"
                component={EditProfileAdminPage}
              />
              <ProtectedRoute
                path="/edit-profile-client/:id"
                component={EditProfileClientPage}
              />
              <ProtectedRouteAdmin
                path="/approved-clients"
                component={ApprovedClientsPage}
              />
              <ProtectedRouteAdmin
                path="/onboarding-clients"
                component={OnboardingClientsPage}
              />
              <ProtectedRoute
                path="/conversations/:id"
                component={ConversationsPage}
              />
              <ProtectedRouteAdmin
                path="/client-details/:userId"
                component={ClientDetailPage}
              />
              <ProtectedRoute
                exact
                path="/create-profile"
                component={CreateProfilePage}
              />
            </UsersContextProvider>
          </Switch>
          <Footer />
        </UserContextProvider>
      </AuthContextProvider>
    </MuiThemeProvider>
  )
}

export default App
