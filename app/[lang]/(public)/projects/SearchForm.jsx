import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

function SearchForm() {
  return (
    <form action="" className="flex-1 flex justify-end h-[40px]">
      <Input
        className={cn("max-w-60 rounded-none border shadow-none h-full")}
      />
      <Button
        variant={"primary"}
        size={"icon"}
        className={"border rounded-none border-l-transparent"}
      >
        <SearchIcon size={24} />
      </Button>
    </form>
  );
}

export default SearchForm;
