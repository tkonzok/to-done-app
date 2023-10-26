import {
  formatDateDue,
  formatDaysLeft,
  formatTimeAgo,
} from "../utils/formatTime";
import { Button } from "./Button";
import { CheckSquare, PenSquare } from "lucide-react";

type TaskProps = {
  id: string;
  title: string;
  room: string;
  lastDone: Date;
  interval: number;
  selected: boolean;
};

export function Task({
  id,
  title,
  room,
  lastDone,
  interval,
  selected,
}: TaskProps) {
  const dueDate = formatDateDue(lastDone, interval);
  const daysLeft = formatDaysLeft(lastDone, interval);
  function textColor(days) {
    if (days < 0) return "text-red-700";
    if (days < 4) return "text-blue-900";
  }

  return (
    <div className="flex justify-between gap-2 border-b">
      <div
        className={`grid grid-rows-[1fr,auto,1fr] p-1 ${textColor(daysLeft)}`}
      >
        <div className="text-sm">{room}</div>
        <div className="flex items-center text-lg font-bold">{title}</div>
        <div className="text-sm">
          {dueDate} | zuletzt {lastDone.getDate()}.{lastDone.getMonth() + 1}.
          {lastDone.getFullYear()}
        </div>
      </div>
      <div className="flex justify-around items-center">
        <Button size="icon" variant="ghost">
          <PenSquare size={36} color="#888" />
        </Button>
        <Button size="icon" variant="ghost">
          <CheckSquare size={36} color="#75957B" />
        </Button>
      </div>
    </div>
  );
}
