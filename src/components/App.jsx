import { useState } from 'react';
import Statistics from 'components/Statistics';
import Section from 'components/Section';
import Notification from 'components/Notification';
import FeedbackOptions from 'components/FeedbackOptions';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = ['good', 'neutral', 'bad'];

  const countTotalFeedback = () => good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return ((good / total) * 100).toFixed(0);
  };

  const onLeaveFeedback = name => {
    switch (name) {
      case options[0]:
        setGood(prevState => prevState + 1);
        break;
      case options[1]:
        setNeutral(prevState => prevState + 1);
        break;
      case options[2]:
        setBad(prevState => prevState + 1);
        break;
      default:
        return;
    }
  };

  const totalFeedback = countTotalFeedback();
  const positiveFeedbackPercentage = Number(countPositiveFeedbackPercentage());

  return (
    <div className="container">
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys({ good, neutral, bad })}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {totalFeedback ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={positiveFeedbackPercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
