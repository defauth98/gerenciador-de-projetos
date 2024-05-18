import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarNameProps {
  name: string;
  avatarUrl?: string;
  isAdvisor?: boolean;
  isCoAdvisor?: boolean;
}

export default function AvatarName({
  name,
  avatarUrl,
  isAdvisor,
  isCoAdvisor,
}: AvatarNameProps) {
  function handleAvatarFallback() {
    const splitedName = name.split(" ");

    const name1 = splitedName[0];
    const name2 = splitedName[1];

    if (!name2) {
      return [name1[0], name1[1]].join("");
    }

    return [name1[0], name2[0]].join("");
  }

  return (
    <div className="flex items-center mb-2 gap-2">
      <Avatar>
        <AvatarFallback className="bg-blue-400 text-white">
          {handleAvatarFallback()}
        </AvatarFallback>
        <AvatarImage src={avatarUrl} />
      </Avatar>
      <span className="text-sm">
        {name.concat(
          isAdvisor ? "(Orientador)" : isCoAdvisor ? "(Co-Orientador)" : ""
        )}
      </span>
    </div>
  );
}
