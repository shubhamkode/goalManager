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
      {/* info section */}
      <p className="px-3 font-semibold leading-5">
        <span className="text-sm opacity-50">Welcome back,</span>
        <br />
        <span className="text-3xl font-bold capitalize opacity-100">
          {username}{" "}
        </span>
      </p>

      {/* create a New Goal Section */}
      <div className="w-full mt-10">
        <h3 className="mb-2 text-2xl font-semibold leading-10 text-center">
          Create a New Goal...
        </h3>
        <GoalForm />
      </div>

      {/* My Goals Section*/}
      <div className="p-2 mt-10">
        {goals.length != 0 ? (
          <>
            <h3 className="mb-2 text-2xl font-semibold leading-10 text-center">
              My Goals...
            </h3>
            <div className="p-2  space-y-3 overflow-y-scroll max-h-[400px] shadow-lg rounded-lg bg-neutral-200">
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
