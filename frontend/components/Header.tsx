import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";


export default function Header(){
  return (
    <div className=" w-full flex justify-between items-center space-x-4 ">
        { /* Search bar */}
      <div className="flex w-full md:max-w-sm max-w-xs justify-center items-center space-x-4">
        <Input type="search" placeholder="Search..." className="rounded-xs"/>
        <Button type="submit" size="icon" className="rounded-xs">
          GO
        </Button>
      </div>
      
    { /* Button group */}
      <div className="flex h-10 items-center mx-auto  text-sm border">
        <Button
          className="rounded-xs bg-transparent text-foreground hover:bg-white hover:text-background"
          size="icon"
        >
          "C
        </Button>
        <Separator orientation="vertical" />
        <Button
          className="rounded-xs bg-transparent text-foreground hover:bg-white hover:text-background"
          size="icon"
        >
          "F
        </Button>
      </div>
    </div>
  )
}