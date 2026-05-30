import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { MarketingDirectorCard } from "./MarketingDirectorCard";
import { ProductionDirectorCard } from "./ProductionDirectorCard";
import { PublishingDirectorCard } from "./PublishingDirectorCard";
import { PsychologyDirectorCard } from "./PsychologyDirectorCard";
import { GrowthDirectorCard } from "./GrowthDirectorCard";
import { BrandGuardianCard } from "./BrandGuardianCard";
import { LearningEngineCard } from "./LearningEngineCard";

export interface DirectorsGridProps extends HTMLAttributes<HTMLDivElement> {
  labels?: {
    marketingDirector: string;
    creativeDirector: string;
    productionDirector: string;
    publishingDirector: string;
    learningDirector: string;
  };
  directorCards?: {
    thinking: string;
  };
}

export function DirectorsGrid({ labels, directorCards, className, ...props }: DirectorsGridProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", className)} {...props}>
      <MarketingDirectorCard labels={directorCards} />
      <ProductionDirectorCard labels={directorCards} />
      <PublishingDirectorCard labels={directorCards} />
      <PsychologyDirectorCard labels={directorCards} />
      <GrowthDirectorCard labels={directorCards} />
      <BrandGuardianCard labels={directorCards} />
      <LearningEngineCard labels={directorCards} />
    </div>
  );
}
