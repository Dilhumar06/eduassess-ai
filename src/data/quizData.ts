export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  topic: string;
}

export const QUIZ_PROMPT = `You are a mathematics teacher and assessment designer. Create an 8-question multiple-choice quiz on Probability and Statistics for university students. Use mixed difficulty levels, from beginner to intermediate. Include questions about basic probability, sample spaces, independent events, conditional probability, mean, median, and binomial distribution. Each question must have four answer options (A, B, C, D), only one correct answer, and clear mathematical wording. Avoid ambiguous questions. Provide a separate answer key with short explanations for each correct answer.`;

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "A fair six-sided die is rolled once. What is the probability of getting an odd number?",
    options: [
      { label: 'A', text: "1/6" },
      { label: 'B', text: "1/3" },
      { label: 'C', text: "1/2" },
      { label: 'D', text: "2/3" }
    ],
    correctAnswer: 'C',
    explanation: "The odd outcomes are 1, 3, and 5. There are 3 favorable outcomes out of 6 possible outcomes. Therefore, P = 3/6 = 1/2.",
    topic: "Basic Probability"
  },
  {
    id: 2,
    question: "A fair coin is tossed twice. What is the probability of getting exactly one head?",
    options: [
      { label: 'A', text: "1/4" },
      { label: 'B', text: "1/2" },
      { label: 'C', text: "3/4" },
      { label: 'D', text: "1" }
    ],
    correctAnswer: 'B',
    explanation: "The possible outcomes are HH, HT, TH, and TT. Exactly one head occurs in HT and TH. Therefore, P = 2/4 = 1/2.",
    topic: "Sample Spaces & Combinations"
  },
  {
    id: 3,
    question: "One card is randomly selected from a standard 52-card deck. What is the probability that it is NOT an ace?",
    options: [
      { label: 'A', text: "1/13" },
      { label: 'B', text: "4/13" },
      { label: 'C', text: "12/13" },
      { label: 'D', text: "1/4" }
    ],
    correctAnswer: 'C',
    explanation: "There are 4 aces and 48 non-ace cards. Therefore, P = 48/52 = 12/13.",
    topic: "Complementary Probability"
  },
  {
    id: 4,
    question: "A fair coin is tossed and a fair six-sided die is rolled. What is the probability of getting heads AND a number greater than 4?",
    options: [
      { label: 'A', text: "1/12" },
      { label: 'B', text: "1/6" },
      { label: 'C', text: "1/3" },
      { label: 'D', text: "1/2" }
    ],
    correctAnswer: 'B',
    explanation: "The probability of heads is 1/2. The probability of rolling 5 or 6 is 2/6 = 1/3. The events are independent, so P = 1/2 × 1/3 = 1/6.",
    topic: "Independent Events"
  },
  {
    id: 5,
    question: "A bag contains 3 red balls and 2 blue balls. One ball is selected without replacement. Given that the first ball is red, what is the probability that the second ball is also red?",
    options: [
      { label: 'A', text: "1/5" },
      { label: 'B', text: "1/3" },
      { label: 'C', text: "1/2" },
      { label: 'D', text: "2/3" }
    ],
    correctAnswer: 'C',
    explanation: "After the first red ball is selected, 2 red balls remain out of 4 total balls. Therefore, P = 2/4 = 1/2.",
    topic: "Conditional Probability"
  },
  {
    id: 6,
    question: "Find the mean of the following data: 2, 4, 6, 8.",
    options: [
      { label: 'A', text: "4" },
      { label: 'B', text: "5" },
      { label: 'C', text: "6" },
      { label: 'D', text: "8" }
    ],
    correctAnswer: 'B',
    explanation: "The mean is the sum of all values divided by the number of values: (2 + 4 + 6 + 8)/4 = 20/4 = 5.",
    topic: "Descriptive Statistics: Mean"
  },
  {
    id: 7,
    question: "Find the median of the following data: 3, 5, 7, 9.",
    options: [
      { label: 'A', text: "5" },
      { label: 'B', text: "6" },
      { label: 'C', text: "7" },
      { label: 'D', text: "9" }
    ],
    correctAnswer: 'B',
    explanation: "There are four ordered values. The median is the average of the two middle values: (5 + 7)/2 = 6.",
    topic: "Descriptive Statistics: Median"
  },
  {
    id: 8,
    question: "A fair coin is tossed three times. What is the probability of getting exactly two heads?",
    options: [
      { label: 'A', text: "1/8" },
      { label: 'B', text: "2/8" },
      { label: 'C', text: "3/8" },
      { label: 'D', text: "4/8" }
    ],
    correctAnswer: 'C',
    explanation: "There are 8 equally likely outcomes. Exactly two heads occur in HHT, HTH, and THH. Therefore, P = 3/8.",
    topic: "Binomial Distribution"
  }
];
