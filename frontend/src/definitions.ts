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

export type SubmissionPageData = {
  quiz: QuizStartData;
  submission: {
    user: {
      name: string;
    };
    quiz: {
      authorId: string;
    };
    answers: {
      answerId: string;
    }[];
  };
};

export type Question = {
  id: string;
  text: string;
  answers: Answer[];
};

export type Answer = {
  id: string;
  text: string;
  isCorrect?: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type BG =
  | "RED"
  | "BLUE"
  | "GREEN"
  | "YELLOW"
  | "PURPLE"
  | "ORANGE"
  | "PINK"
  | "GREY";
