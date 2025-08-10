import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
    const textColor =
        score > 70
            ? "text-green-600"
            : score > 49
            ? "text-yellow-600"
            : "text-red-600";

    return (
        <div className="resume-summary px-4 py-3 hover:bg-gray-50 transition-colors duration-200 rounded-xl">
            <div className="flex flex-row gap-2 items-center justify-between">
                <div className="flex flex-row gap-2 items-center">
                    <p className="text-lg font-medium">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-lg font-semibold">
                    <span className={textColor}>{score}</span>
                    <span className="text-gray-400">/100</span>
                </p>
            </div>
        </div>
    );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md w-full overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center p-6 gap-8 border-b border-gray-100">
                <ScoreGauge score={feedback.overallScore} />

                <div className="flex flex-col gap-2 text-center sm:text-left">
                    <h2 className="text-2xl font-bold">Your Resume Score</h2>
                    <p className="text-sm text-gray-500 max-w-sm">
                        This score is calculated based on the categories listed
                        below. Each section is rated from 0 to 100.
                    </p>
                </div>
            </div>

            <div className="flex flex-col divide-y divide-gray-100">
                <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                <Category title="Content" score={feedback.content.score} />
                <Category title="Structure" score={feedback.structure.score} />
                <Category title="Skills" score={feedback.skills.score} />
            </div>
        </div>
    );
};

export default Summary;
