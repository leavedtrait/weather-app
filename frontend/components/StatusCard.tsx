import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JSX } from "react/jsx-dev-runtime";
import type {StatusCardProps} from "@/lib/utils"

export default function StatusCard({ title, icon, value }: StatusCardProps) {
  return (
    <Card className="max-w-sm md:max-w-lg space-y-3 text-center">
      <CardHeader className="flex flex-col items-center justify-center">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {icon}
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <CardDescription className="text-2xl font-bold">{value}</CardDescription>
      </CardFooter>
    </Card>
  );
}
