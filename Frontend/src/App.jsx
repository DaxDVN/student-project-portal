import {BrowserRouter, Route, Routes} from 'react-router-dom'

import React from 'react'
import Layout from './layout/Layout.jsx';
import {Blank, Dashboard, Password, Profile} from './screens/common/index.js';
import {UserManager} from './screens/user/index.js';
import {SubjectManager} from './screens/subject/index.js';
import {ProjectDetail, ProjectList} from './screens/project/index.js';
import { AssignmentList, NewAssignment} from './screens/assignment/index.js';
import {
  NewSystemSetting,
  SystemSettingDetail,
  SystemSettingEdit,
  SystemSettingManager,
} from './screens/system-setting/index.js';
import Auth from './screens/common/Auth.jsx';
import {ClassDetail, ClassManager} from './screens/class/index.js';
import ProtectedRouteCommon from './security/ProtectedRouteCommon.jsx';
import ProtectedRouteAdmin from './security/ProtectedRouteAdmin.jsx';
import ProtectedRouteSubjectManager from './security/ProtectedRouteSubjectManager.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRouteCommon>
            <Layout/>
          </ProtectedRouteCommon>
        }>
          <Route index element={ <Dashboard/> }/>
          <Route element={<ProtectedRouteAdmin/>}>
            <Route path={ '/user-manager' } element={ <UserManager/> }/>
            <Route path={ '/subject-manager' } element={ <SubjectManager/> }/>
            <Route path={ '/setting-manager' } element={ <SystemSettingManager/> }/>
            <Route path={ '/setting-detail' } element={ <SystemSettingDetail/> }/>
            <Route path={ '/setting-edit/:id' } element={ <SystemSettingEdit/> }/>
          </Route>
          <Route element={<ProtectedRouteSubjectManager/>}>
            <Route path={ '/subject-manager' } element={ <SubjectManager/> }/>
          </Route>
          
          <Route path={ '/class-manager' } element={ <ClassManager/> }/>
          <Route path={ '/class-detail' } element={ <ClassDetail/> }/>
          
          <Route path={ '/project-detail' } element={ <ProjectDetail/> }/>
          <Route path={ '/project' } element={ <ProjectList/> }/>
          <Route path={ '/profile' } element={ <Profile/> }/>
          
          <Route path={ '/assignments' } element={ <AssignmentList/> }/>
          <Route path={ '/new-assignment' } element={ <NewAssignment/> }/>
          
          <Route path={ '/blank' } element={ <Blank/> }/>
          
          <Route path={ '/new-setting' } element={ <NewSystemSetting/> }/>

        </Route>
        <Route path='auth' element={ <Auth/> }/>
        <Route path='auth/:id/:token' element={ <Password/> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
