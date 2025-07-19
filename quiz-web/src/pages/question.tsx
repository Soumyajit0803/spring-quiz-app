import * as React from 'react';
import { Crud } from '@toolpad/core/Crud';
import { questionDataSource, Question, questionCache } from '../data/question';

export default function QuestionCrudPage() {
  return (
    <Crud<Question>
      dataSource={questionDataSource}
      dataSourceCache={questionCache}
      rootPath="/question"
      initialPageSize={10}
    />
  );
}
