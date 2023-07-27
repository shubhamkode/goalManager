import { Page } from "@/features/ui/components";
import GoalForm from "@/features/ui/components/GoalForm";
import { Goal } from "@/features/models/Goal";
import GoalTile from "../../components/GoalTile";

interface IDashBoardPageTemplateProps {
  goals: Goal[];
  username: string;
}

export default function DashBoardPageTemplate({
  goals,
  username,
}: IDashBoardPageTemplateProps) {
  return (
    <Page>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-semibold leading-5 opacity-70">Welcome,</p>
          <h2 className="text-3xl capitalize">{username} </h2>
        </div>
        <div>
          <h3 className="text-sm">Goals Dashboard</h3>
        </div>
      </div>

      <GoalForm />

      <div className="p-2 mt-10">
        {goals.length != 0 ? (
          <>
            <h3 className="mb-5 text-2xl font-semibold leading-10 text-center">
              My Goals
            </h3>
            <div className="px-6 py-4 space-y-3 overflow-y-scroll max-h-[400px] shadow-lg rounded-lg bg-neutral-200">
              {goals.map((goal, index) => (
                <GoalTile goal={goal} key={index} />
              ))}
            </div>
          </>
        ) : (
          <h3 className="mb-5 text-2xl font-semibold leading-10 text-center">
            No Goals Yet..
          </h3>
        )}
      </div>
    </Page>
  );
}
