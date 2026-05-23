import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { quizQuestions, grants } from "../data/grants";
import QuizStep from "../components/QuizStep";
import LoadingScreen from "../components/LoadingScreen";
import Background from "../components/Background";
import { storage, normalizeMatchScores } from "../utils/helpers";
import { STORAGE_KEYS } from "../config/constants";
import { useGrantMatcher } from "../hooks/useGrantMatcher";

export default function QuizPage() {
  const navigate = useNavigate();
  const { match, loading: matching, results } = useGrantMatcher();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [pendingComplete, setPendingComplete] = useState(false);

  const totalSteps = quizQuestions.length;
  const currentQuestion = quizQuestions[currentStep - 1];

  const handleAnswer = useCallback((questionId, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }, []);

  const handleQuizComplete = useCallback(() => {
    setIsLoading(true);
    setPendingComplete(true);
    match(Object.values(selectedAnswers), grants);
  }, [selectedAnswers, match]);

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1);
    } else {
      handleQuizComplete();
    }
  }, [currentStep, totalSteps, handleQuizComplete]);

  const handlePrev = useCallback(() => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  }, [currentStep]);

  useEffect(() => {
    if (!pendingComplete || matching || results.length === 0) return;

    storage.set(STORAGE_KEYS.quizResults, {
      answers: selectedAnswers,
      grants: normalizeMatchScores(results),
      timestamp: new Date().toISOString(),
    });

    setPendingComplete(false);
    setIsLoading(false);
    navigate("/results");
  }, [pendingComplete, matching, results, selectedAnswers, navigate]);

  if (isLoading || matching) {
    return (
      <Background variant="light">
        <LoadingScreen message="Processing your answers..." fullScreen />
      </Background>
    );
  }

  return (
    <Background variant="light">
      <div className="container-page py-12">
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-bold text-brand-dark sm:text-4xl">
            Find your perfect EU grants
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Answer 5 quick questions for personalized recommendations.
          </p>
        </div>

        {currentQuestion && (
          <QuizStep
            question={currentQuestion}
            currentStep={currentStep}
            totalSteps={totalSteps}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onPrev={handlePrev}
            selectedAnswers={selectedAnswers}
          />
        )}

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-slate-500">
          <Shield className="h-4 w-4 text-brand" aria-hidden />
          Your responses stay private in your browser
        </p>
      </div>
    </Background>
  );
}
