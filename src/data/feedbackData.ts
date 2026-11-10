export interface StudentFeedbackProfile {
  id: string;
  name: string;
  performanceTier: 'Excellent' | 'Good' | 'Needs Improvement' | 'Incorrect';
  studentAnswer: string;
  aiFeedback: string;
  humanReview: string;
  verdict: 'Correct' | 'Needs Clarification' | 'Incorrect';
  evaluationSummary: string;
  keyLearningPoint: string;
}

export const FEEDBACK_QUESTION = {
  text: "A bag contains 3 red balls and 2 blue balls. One ball is selected without replacement. Given that the first ball is red, what is the probability that the second ball is also red?",
  correctAnswer: "1/2",
  mathematicalBreakdown: "Initial state: 3 red, 2 blue (total 5). Event A occurs: 1 red ball is removed without replacement. Remaining sample space: 2 red, 2 blue (total 4). Probability of second red = 2/4 = 1/2."
};

export const FEEDBACK_AI_PROMPT = `You are an experienced mathematics teacher. Evaluate the following four student answers to a conditional probability question. The correct answer is 1/2. For each student:
1. Identify whether the answer is correct or incorrect.
2. Explain what the student understood correctly.
3. Identify any mathematical mistakes.
4. Give specific, supportive feedback.
5. Suggest how the student can improve.
Use simple and encouraging language. Do not give the same feedback to every student. Make sure all mathematical explanations are accurate.`;

export const STUDENT_PROFILES: StudentFeedbackProfile[] = [
  {
    id: "student-1",
    name: "Student 1",
    performanceTier: "Excellent",
    studentAnswer: "After the first red ball is selected, 2 red balls remain out of 4 total balls. Therefore, the probability is 2/4 = 1/2.",
    aiFeedback: "Correct! You correctly identified that one red ball was removed. Your calculation and explanation are clear and mathematically accurate.",
    humanReview: "Approved. No changes needed.",
    verdict: "Correct",
    evaluationSummary: "Full conceptual mastery. Accurately accounted for reduced sample space and favorable outcomes.",
    keyLearningPoint: "Explicitly documenting the state change (3-1=2 red, 5-1=4 total) ensures crystal-clear reasoning."
  },
  {
    id: "student-2",
    name: "Student 2",
    performanceTier: "Good",
    studentAnswer: "The probability is 2/4 because there are 2 red balls left and 4 balls in total.",
    aiFeedback: "Correct. You identified the remaining red balls and the total number of balls. To improve your answer, explain that the first red ball was removed because the selection is without replacement.",
    humanReview: "Approved with a small improvement: add an explanation of why the total number of balls decreases.",
    verdict: "Correct",
    evaluationSummary: "Accurate arithmetic and correct final answer, but lacks full formal justification of the condition.",
    keyLearningPoint: "Highlighting the phrase 'without replacement' explains why the denominator decreases from 5 to 4."
  },
  {
    id: "student-3",
    name: "Student 3",
    performanceTier: "Needs Improvement",
    studentAnswer: "The probability is 3/5 because there were 3 red balls and 5 balls in total.",
    aiFeedback: "Your answer uses the original numbers of red and total balls. However, the question states that the first ball was red. One red ball has already been removed, so only 2 red balls remain out of 4 total balls. The correct probability is 2/4 = 1/2.",
    humanReview: "Improved. The feedback now explains why the original ratio cannot be used after the first selection.",
    verdict: "Incorrect",
    evaluationSummary: "Failed to update prior probabilities based on given conditional information.",
    keyLearningPoint: "Conditional probability P(B|A) restricts the sample space to outcomes where event A has already occurred."
  },
  {
    id: "student-4",
    name: "Student 4",
    performanceTier: "Incorrect",
    studentAnswer: "The probability is 2/5 because there are 2 blue balls in the bag.",
    aiFeedback: "You correctly noticed that there are 2 blue balls, but the question asks for the probability of selecting another red ball. After the first red ball is removed, 2 red balls remain out of 4 total balls. The correct probability is 1/2.",
    humanReview: "Approved with clarification: the feedback distinguishes favorable outcomes from irrelevant information about blue balls.",
    verdict: "Incorrect",
    evaluationSummary: "Conflated non-target balls (blue) with target outcome (red) while also ignoring non-replacement.",
    keyLearningPoint: "Always match the numerator to the requested event (red balls) rather than distracting values (blue balls)."
  }
];
