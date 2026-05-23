import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function QuizStep({
  question,
  currentStep,
  totalSteps,
  onAnswer,
  onNext,
  onPrev,
  selectedAnswers,
}) {
  const [localAnswers, setLocalAnswers] = useState(
    selectedAnswers[question.id] || (question.type === "multiple" ? [] : null),
  );

  const handleSingleSelect = (value, grants) => {
    setLocalAnswers(value);
    onAnswer(question.id, { value, grants });
  };

  const handleMultipleSelect = (value) => {
    const newAnswers = localAnswers.includes(value)
      ? localAnswers.filter((item) => item !== value)
      : [...localAnswers, value];
    setLocalAnswers(newAnswers);

    let mergedGrants = [];
    newAnswers.forEach((answer) => {
      const option = question.options.find((o) => o.value === answer);
      if (option?.grants) {
        mergedGrants = [...new Set([...mergedGrants, ...option.grants])];
      }
    });

    onAnswer(question.id, { values: newAnswers, grants: mergedGrants });
  };

  const handleNext = () => {
    if (question.type === "multiple" && localAnswers.length === 0) {
      alert("Please select at least one option");
      return;
    }
    if (question.type === "single" && !localAnswers) {
      alert("Please select an option");
      return;
    }
    onNext();
  };

  const isAnswered =
    question.type === "multiple" ? localAnswers.length > 0 : !!localAnswers;
  const progress = (currentStep / totalSteps) * 100;

  const optionBase =
    "flex cursor-pointer items-center gap-3 rounded-xl border-2 border-slate-200 bg-white p-4 transition hover:border-brand/40 hover:bg-blue-50/50 has-[:checked]:border-brand has-[:checked]:bg-brand/5 has-[:checked]:ring-2 has-[:checked]:ring-brand/20";

  return (
    <div className="animate-slide-up card mx-auto max-w-2xl">
      <div className="mb-8">
        <h2 className="mb-4 font-display text-2xl font-bold text-brand-dark">
          {question.question}
        </h2>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand to-eu-blue transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm font-medium text-slate-500">
          Question {currentStep} of {totalSteps}
        </p>
      </div>

      <div className="mb-8 space-y-3">
        {question.options.map((option) => (
          <label key={option.value} className={optionBase}>
            <input
              type={question.type === "multiple" ? "checkbox" : "radio"}
              name={`question-${question.id}`}
              value={option.value}
              checked={
                question.type === "multiple"
                  ? localAnswers.includes(option.value)
                  : localAnswers === option.value
              }
              onChange={() =>
                question.type === "multiple"
                  ? handleMultipleSelect(option.value)
                  : handleSingleSelect(option.value, option.grants)
              }
              className="h-4 w-4 shrink-0 accent-brand"
            />
            <span className="text-sm font-medium text-slate-800">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          className="btn-secondary"
          onClick={onPrev}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={handleNext}
          disabled={!isAnswered}
        >
          {currentStep === totalSteps ? "See results" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
