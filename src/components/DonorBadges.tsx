
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Star } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DonorBadge {
  id: string;
  name: string;
  description: string;
  icon: 'donation' | 'review';
  color: string;
}

interface DonorBadgesProps {
  donationCount: number;
  reviewScore: number;
}

const DonorBadges = ({ donationCount, reviewScore }: DonorBadgesProps) => {
  const getBadges = (donations: number, rating: number): DonorBadge[] => {
    const badges: DonorBadge[] = [];
    
    // Donation badges
    if (donations >= 5) {
      badges.push({
        id: 'bronze',
        name: 'Bronze Donor',
        description: 'Made 5+ donations',
        icon: 'donation',
        color: 'text-orange-400'
      });
    }
    if (donations >= 10) {
      badges.push({
        id: 'silver',
        name: 'Silver Donor',
        description: 'Made 10+ donations',
        icon: 'donation',
        color: 'text-gray-400'
      });
    }
    if (donations >= 20) {
      badges.push({
        id: 'gold',
        name: 'Gold Donor',
        description: 'Made 20+ donations',
        icon: 'donation',
        color: 'text-yellow-400'
      });
    }
    
    // Review badges
    if (rating >= 4.0) {
      badges.push({
        id: 'trusted',
        name: 'Trusted Donor',
        description: '4.0+ average rating',
        icon: 'review',
        color: 'text-brand-green'
      });
    }
    if (rating >= 4.5) {
      badges.push({
        id: 'exceptional',
        name: 'Exceptional Donor',
        description: '4.5+ average rating',
        icon: 'review',
        color: 'text-purple-500'
      });
    }
    
    return badges;
  };

  const badges = getBadges(donationCount, reviewScore);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Badges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {badges.map((badge) => (
            <TooltipProvider key={badge.id}>
              <Tooltip>
                <TooltipTrigger>
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 ${badge.color}`}>
                    {badge.icon === 'donation' ? (
                      <BadgeCheck className="w-6 h-6" />
                    ) : (
                      <Star className="w-6 h-6" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">{badge.name}</p>
                  <p className="text-xs text-gray-500">{badge.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DonorBadges;
