import { LuInbox } from "react-icons/lu";

export function NoData({ message = "No data to display." }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-neutral-500 max-w-md mx-auto">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-neutral-800/50 mb-4">
        <LuInbox className="w-8 h-8 text-neutral-400" />
      </div>
      <p className="text-center text-sm">{message}</p>
    </div>
  );
}
