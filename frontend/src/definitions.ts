export type Quiz = {
  id: string;
  title: string;
  description: string;
  background: string;
  author: {
    name: string;
  };
  submissions?: [];
};

export type Invite = {
  id: string;
  isUsed: boolean;
  quiz: Quiz;
};

export type Submission = {
  id: string;
  user: {
    id: string;
    name: string;
  };
  answers: {
    id: string;
    submissionId: string;
    answerId: string;
  }[];
};

export type QuizDetails = {
  id: string;
  title: string;
  description: string;
  background: string;
  authorId: string;
  author: {
    name: string;
  };
  submissions?: any[];
};

export type QuizStartData = {
  id: string;
  title: string;
  description: string;
  background: string;
  questions: Question[];
};

export type Question = {
  id: string;
  text: string;
  answers: Answer[];
};

export type Answer = {
  id: string;
  text: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};
