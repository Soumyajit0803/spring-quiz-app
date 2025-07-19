import * as React from 'react';
import Typography from '@mui/material/Typography';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Link } from 'react-router-dom';

export default function HomePage() {
  

  return (    
    <PageContainer>
      <Typography variant='h5'>
        Welcome to Toolpad Core quiz app!
      </Typography>
      <Typography variant='body1'>
        This is a simple quiz application built with React and Toolpad Core.
        You can create, manage, delete questions and take quizzes. Use the navigation menu to explore different sections of the app. 
        <br /><br />
        Currently this app supports limited functionality- login, CRUD on questions, and taking quizzes. However it can be extended to include user role management(teacher, students), save student information, scores and more.
      </Typography>
      <Typography variant='body1'>
        <br />To get started, head to <Link to={"/quiz"}>Take Quiz</Link> tab.
      </Typography>
    </PageContainer>
  );
}
